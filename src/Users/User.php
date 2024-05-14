<?php

namespace Src\Users;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'photo',
        'name',
        'email',
        'password',
        'api_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * Send the password reset notification.
     * 
     * @param mixed $token
     * 
     * @return void
     */
    public function sendPasswordResetNotification(mixed $token): void
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return route("cms.password.reset", [$token, "email" => $user->getEmailForPasswordReset()]);
        });

        $this->notify(new ResetPassword($token));
    }


    // Getters and Setters

    /**
     * Set the encrypted value for the "name" attribute.
     *
     * @param mixed $value The value of the "name" attribute to be encrypted.
     * 
     * @return void
     */
    public function setNameAttribute(mixed $value): void
    {
        $this->attributes["name"] = Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the "email" attribute.
     *
     * @param mixed $value The value of the "email" attribute to be encrypted.
     * 
     * @return void
     */
    public function setEmailAttribute(mixed $value): void
    {
        $this->attributes["email"] = Crypt::encrypt($value);
    }

    /**
     * Set the hashed value for the "password" attribute.
     *
     * @param mixed $value The value of the "password" attribute.
     * 
     * @return void
     */
    public function setPasswordAttribute(mixed $value): void
    {
        if (!is_null($value)) {
            $this->attributes["password"] = Hash::make($value);
        }
    }

    /**
     * Get the decrypted value for the "name" attribute.
     *
     * @param mixed $value The encrypted value of the "name" attribute.
     * 
     * @return string
     */
    public function getNameAttribute(mixed $value): string
    {
        return Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the "email" attribute.
     *
     * @param mixed $value The encrypted value of the "email" attribute.
     * 
     * @return string
     */
    public function getEmailAttribute(mixed $value): string
    {
        return Crypt::decrypt($value);
    }


    // Custom

    /**
     * Check if the email address belongs to the "agenciakombi.com.br" domain.
     *
     * @return bool True if the email domain is "agenciakombi.com.br," otherwise false.
     */
    public function isKombi(): bool
    {
        return explode('@', $this->email)[1] === "agenciakombi.com.br";
    }
}
