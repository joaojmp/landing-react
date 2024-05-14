<?php

namespace Src\Users\Notifications;

use Src\Users\User;
use Illuminate\Bus\Queueable;
use Illuminate\Support\HtmlString;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class RenewPassword extends Notification
{
    use Queueable;

    /**
     * @var User
     */
    protected User $user;

    /**
     * @var string
     */
    protected string $password;

    /**
     * Create a new notification instance.
     *
     * @param User $user
     * @param string $password
     * 
     * @return void
     */
    public function __construct(User $user, string $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * 
     * @return array
     */
    public function via(mixed $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * 
     * @return MailMessage
     */
    public function toMail(mixed $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Renovação de senha - Site " . config("app.name"))
            ->line(new HtmlString("{$this->user->name}, você solicitou uma nova senha."))
            ->line(new HtmlString("E-mail: {$this->user->email}"))
            ->line(new HtmlString("Senha: <b>{$this->password}</b>"))
            ->line(new HtmlString("Acesse o link abaixo para entrar."))
            ->action("Login CMS " . config("app.name"), route("cms.login"))
            ->line("Se você não solicitou uma nova senha, ignore este e-mail.");
    }
}
