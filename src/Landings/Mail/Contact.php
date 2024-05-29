<?php

namespace Src\Landings\Mail;

use Src\Landings\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Contact extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * @var Lead
     */
    protected Lead $lead;

    /**
     * Create a new message instance.
     * 
     * @param Lead $lead
     *
     * @return void
     */
    public function __construct(Lead $lead)
    {
        $this->lead = $lead;

        foreach ($this->lead->landing->emails as $email) {
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
        return $this->from(config("mail.mailers.smtp.username"), $this->lead->landing->title)
            ->subject("Novo contato recebido - Página " . $this->lead->landing->title)
            ->markdown("web::mails.contact", ["lead" => $this->lead]);
    }
}
