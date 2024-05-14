<?php

namespace App\Cms\Http\Controllers;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Src\Users\UserService;
use Illuminate\Support\Str;
use Src\Configs\ConfigService;
use Illuminate\Support\Facades\Artisan;
use Google\Analytics\Data\V1beta\Metric;
use App\Core\Http\Controllers\Controller;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Illuminate\Http\Response as HttpResponse;
use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;

class IndexController extends Controller
{
    /**
     * The service instance for interacting with data.
     *
     * @var UserService
     */
    protected UserService $userService;

    /**
     * Controller constructor.
     *
     * @param UserService $service
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        if (config("app.env") === "local") {
            $report = [["name" => date("d/m/Y", strtotime("-6days")), "Sessões" => rand(5, 50), "Usuários" => rand(10, 70)]];
            $channelGrouping = [["name" => "Group A", "value" => rand(5, 50)]];
        } else {
            $analytics = self::initializeAnalytics();

            $report = self::getReport($analytics);
            $channelGrouping = self::getChannelGrouping($analytics);
        }

        return Inertia::render('Home/Home', [
            "report" => $report,
            "channelGrouping" => $channelGrouping,
        ]);
    }

    /**
     * Cache the application and return an HttpResponse.
     *
     * @return HttpResponse
     */
    public function cache(): HttpResponse
    {
        if (!$this->userService->find(auth()->guard("cms")->id())->isKombi()) {
            return $this->badRequest("Você não tem permissão para fazer isso!");
        }

        try {
            Artisan::call("optimize");

            return response("Cached successfully!");
        } catch (Exception $e) {
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * Clear application caches and return an HttpResponse.
     *
     * @return HttpResponse
     */
    public function cacheClear(): HttpResponse
    {
        if (!$this->userService->find(auth()->guard("cms")->id())->isKombi()) {
            return $this->badRequest("Você não tem permissão para fazer isso!");
        }

        try {
            Artisan::call("optimize:clear");

            return response("Caches cleared successfully!");
        } catch (Exception $e) {
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * Put the application into maintenance mode and return an HttpResponse.
     *
     * @return HttpResponse
     */
    public function down(): HttpResponse
    {
        if (!$this->userService->find(auth()->guard("cms")->id())->isKombi()) {
            return $this->badRequest("Você não tem permissão para fazer isso!");
        }

        try {
            $secret = Str::uuid();

            Artisan::call("down --secret='$secret' --render='web::pages.maintenance'");

            (new ConfigService)->update("maintenance_secret", $secret);

            return response("Maintenance mode on! Secret: $secret");
        } catch (Exception $e) {
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * Take the application out of maintenance mode and return an HttpResponse.
     *
     * @return HttpResponse
     */
    public function up(): HttpResponse
    {
        if (!$this->userService->find(auth()->guard("cms")->id())->isKombi()) {
            return $this->badRequest("Você não tem permissão para fazer isso!");
        }

        try {
            Artisan::call("up");

            (new ConfigService)->update("maintenance_secret", null);

            return response("Maintenance mode off!");
        } catch (Exception $e) {
            return $this->badRequest($e->getMessage());
        }
    }

    protected function initializeAnalytics()
    {
        return new BetaAnalyticsDataClient([
            'credentials' => __DIR__ . "/../../../../service-account.json"
        ]);
    }

    protected function getReport($analytics)
    {
        $response = $analytics->runReport([
            'property' => 'properties/' . config('services.google.analytics.property_id'),
            'dateRanges' => [
                new DateRange([
                    'start_date' => '7daysAgo',
                    'end_date' => 'today',
                ]),
            ],
            'dimensions' => [
                new Dimension(['name' => 'date']),
            ],
            'metrics' => [
                new Metric(['name' => 'sessions']),
                new Metric(['name' => 'activeUsers'])
            ]
        ]);

        return self::parseReportResponse($response);
    }

    protected function parseReportResponse($reports)
    {
        $parsed = [];

        foreach ($reports->getRows() as $row) {
            $data = [];

            $data += ["name" => date("d/m/Y", strtotime($row->getDimensionValues()[0]->getValue()))];
            $values = $row->getMetricValues();

            foreach ($values as $i => $value) {
                if ($i === 0) {
                    $data += ["Sessões" => (int) $value->getValue()];
                } else {
                    $data += ["Usuários" => (int) $value->getValue()];
                }
            }

            $parsed[] = $data;
        }

        return $parsed;
    }

    protected function getChannelGrouping($analytics)
    {
        $response = $analytics->runReport([
            'property' => 'properties/' . config('services.google.analytics.property_id'),
            'dateRanges' => [
                new DateRange([
                    'start_date' => '7daysAgo',
                    'end_date' => 'today',
                ]),
            ],
            'dimensions' => [
                new Dimension(['name' => 'sessionDefaultChannelGrouping']),
            ],
            'metrics' => [
                new Metric(['name' => 'activeUsers']),
            ]
        ]);

        return self::parseChannelGroupingResponse($response);
    }

    protected function parseChannelGroupingResponse($reports)
    {
        $parsed = [];

        foreach ($reports->getRows() as $row) {
            $channel = $row->getDimensionValues()[0]->getValue();
            $value = $row->getMetricValues()[0]->getValue();

            $parsed[] = ["name" => $channel, "value" => (int) $value];
        }

        return $parsed;
    }
}
