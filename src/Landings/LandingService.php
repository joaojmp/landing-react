<?php

namespace Src\Landings;

use Src\Service;
use Src\Leads\LeadService;
use Src\Landings\LandingRepository;

class LandingService extends Service
{
    /**
     * Array to store file configurations.
     *
     * @var array
     */
    protected array $files = [
        [
            "attribute" => "image",
            "oldAttribute" => "old_image",
            "baseNameAttribute" => "title",
            "blur" => true,
            "fit" => [
                [
                    "width" => 1200,
                    "height" => 630
                ]
            ]
        ],
        [
            "attribute" => "favicon",
            "oldAttribute" => "old_favicon",
            "baseNameAttribute" => "title",
            "blur" => true,
            "fit" => [
                [
                    "width" => 48,
                    "height" => 48
                ]
            ]
        ],
    ];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "landings";

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return LandingRepository::class;
    }

    /**
     * Delete a record from the database and associated files.
     *
     * @param int $id
     * 
     * @return void
     */
    public function delete(int $id): void
    {
        $landing = $this->repository->with("leads")->find($id);

        if ($landing->leads->count()) {
            $leadService = new LeadService();

            foreach ($landing->leads as $lead) {
                $leadService->delete($lead->id);
            }
        }

        parent::delete($id);
    }
}
