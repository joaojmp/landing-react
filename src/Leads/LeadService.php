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
     * Save a new model and return the instance.
     */
    public function create(array $attributes): mixed
    {
        $lead = $this->repository->get()->filter(function ($lead) use ($attributes) {
            if ($lead->email == $attributes["email"] && $lead->origin == $attributes["origin"]) {
                return $lead;
            }
        })->first();

        switch ($attributes["origin"]) {
            case "Contato":
                Mail::queue(new Contact($attributes));
                break;
        }

        if (!$lead) {
            $attributes["ip"] = $_SERVER["REMOTE_ADDR"];

            return parent::create($attributes);
        } else {
            return $lead;
        }
    }
}
