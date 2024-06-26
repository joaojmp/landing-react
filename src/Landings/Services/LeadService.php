<?php

namespace Src\Landings\Services;

use Src\Service;
use Src\Landings\Mail\Contact;
use Illuminate\Support\Facades\Mail;
use Src\Landings\Repositories\LeadRepository;

class LeadService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return LeadRepository::class;
    }

    /**
     * Create a new record in the database along with any specified relationships and files.
     *
     * @param array $attributes
     * 
     * @return mixed
     */
    public function create(array $attributes): mixed
    {
        $lead = parent::create($attributes);

        if (count($lead->landing->emails)) {
            Mail::queue(new Contact($lead));
        }

        return $lead;
    }
}
