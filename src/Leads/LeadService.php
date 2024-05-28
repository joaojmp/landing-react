<?php

namespace Src\Leads;

use Src\Service;
use Src\Leads\Mail\Contact;
use Src\Leads\LeadRepository;
use Illuminate\Support\Facades\Mail;

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

        Mail::queue(new Contact($lead));

        return $lead;
    }
}
