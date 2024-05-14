<?php

namespace Src\Leads;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "name", "email", "phone", "subject", "message", "origin", "ip",
    ];


    // Getters and Setters

    /**
     * Get the decrypted value for the `name` attribute.
     *
     * @param string $value
     * 
     * @return string
     */
    public function getNameAttribute(string $value): string
    {
        return Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the `email` attribute.
     *
     * @param string $value
     * 
     * @return string
     */
    public function getEmailAttribute(string $value): string
    {
        return Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the `phone` attribute.
     *
     * @param string|null $value
     * 
     * @return string|null
     */
    public function getPhoneAttribute(string|null $value): string|null
    {
        return is_null($value) ? $value : Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the `subject` attribute.
     *
     * @param string|null $value
     * 
     * @return string|null
     */
    public function getSubjectAttribute(string|null $value): string|null
    {
        return is_null($value) ? $value : Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the `message` attribute.
     *
     * @param string|null $value
     * 
     * @return string|null
     */
    public function getMessageAttribute(string|null $value): string|null
    {
        return is_null($value) ? $value : Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the `origin` attribute.
     *
     * @param string $value
     * 
     * @return string
     */
    public function getOriginAttribute(string $value): string
    {
        return Crypt::decrypt($value);
    }

    /**
     * Get the decrypted value for the `ip` attribute.
     *
     * @param string $value
     * 
     * @return string
     */
    public function getIpAttribute(string $value): string
    {
        return Crypt::decrypt($value);
    }


    /**
     * Set the encrypted value for the `name` attribute.
     *
     * @param string $value
     * 
     * @return void
     */
    public function setNameAttribute(string $value): void
    {
        $this->attributes['name'] = Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the `email` attribute.
     *
     * @param string $value
     * 
     * @return void
     */
    public function setEmailAttribute(string $value): void
    {
        $this->attributes['email'] = Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the `phone` attribute.
     *
     * @param string|null $value
     * 
     * @return void
     */
    public function setPhoneAttribute(string|null $value): void
    {
        $this->attributes['phone'] = is_null($value) ? $value : Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the `subject` attribute.
     *
     * @param string|null $value
     * 
     * @return void
     */
    public function setSubjectAttribute(string|null $value): void
    {
        $this->attributes['subject'] = is_null($value) ? $value : Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the `message` attribute.
     *
     * @param string|null $value
     * 
     * @return void
     */
    public function setMessageAttribute(string|null $value): void
    {
        $this->attributes['message'] = is_null($value) ? $value : Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the `origin` attribute.
     *
     * @param string $value
     * 
     * @return void
     */
    public function setOriginAttribute(string $value): void
    {
        $this->attributes['origin'] = Crypt::encrypt($value);
    }

    /**
     * Set the encrypted value for the `ip` attribute.
     *
     * @param string $value
     * 
     * @return void
     */
    public function setIpAttribute(string $value): void
    {
        $this->attributes['ip'] = Crypt::encrypt($value);
    }
}
