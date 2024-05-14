<?php

namespace Src\Leads\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Src\Configs\ConfigService;
use Illuminate\Support\HtmlString;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class Contact extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Array with form data
     * 
     * @var array
     */
    protected array $input;

    /**
     * Create a new message instance.
     * 
     * @param array $input
     *
     * @return void
     */
    public function __construct(array $input)
    {
        $this->input = $input;

        $configs = (app()->make(ConfigService::class))->all();

        foreach (explode(",", $configs->contact_email) as $email) {
            $this->to($email);
        }
    }

    /**
     * Build the message.
     *
     * @return self
     */
    public function build(): self
    {
        return $this->from(config("mail.mailers.smtp.username"), $this->input["name"])
            ->replyTo($this->input["email"], $this->input["name"])
            ->subject("Contato recebido - Site " . config("app.name"))
            ->markdown(
                "notifications::email",
                (new MailMessage)
                    ->line("Segue abaixo a mensagem recebida através do site:")
                    ->line(new HtmlString("<b>Nome:</b> " . $this->input["name"] . " <br> <b>E-mail:</b> " . $this->input["email"] . " <br> <b>Telefone:</b> " . $this->input["phone"]))
                    ->line(new HtmlString("<b>" . $this->input["subject"] . "</b> <br> " . $this->input["message"]))
                    ->line(new HtmlString("<small><em>Este e-mail foi enviado em " . now()->format("d/m/Y") . " às " . now()->format("H:i") . " pelo IP: " . request()->ip() . ".</em></small>"))
                    ->salutation(" ")
                    ->data()
            );
    }
}
