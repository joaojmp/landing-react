<?php

namespace Src\Landings\Services;

use Src\Service;
use Src\Landings\Services\LeadService;
use Src\Landings\Services\PageService;
use Src\Landings\Repositories\LandingRepository;

class LandingService extends Service
{
    /**
     * Specify relations included in create and update.
     *
     * @var array
     */
    protected array $relations = [
        "pages" => [
            "type" => "oneToMany"
        ],
    ];

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
        $landing = $this->repository->with(["pages", "leads"])->find($id);

        if ($landing->pages->count()) {
            $pageService = new PageService();

            foreach ($landing->pages as $page) {
                $pageService->delete($page->id);
            }
        }

        if ($landing->leads->count()) {
            $leadService = new LeadService();

            foreach ($landing->leads as $lead) {
                $leadService->delete($lead->id);
            }
        }

        parent::delete($id);
    }
}
