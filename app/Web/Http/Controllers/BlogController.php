<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Src\Posts\Services\PostService;
use Src\Posts\Services\SubjectService;
use App\Core\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class BlogController extends Controller
{
    /**
     * @var SubjectService
     */
    protected SubjectService $subjectService;

    /**
     * @var PostService
     */
    protected PostService $postService;

    /**
     * @param SubjectService $subjectService
     * @param PostService $postService
     */
    public function __construct(
        SubjectService $subjectService,
        PostService $postService
    ) {
        $this->subjectService = $subjectService;
        $this->postService = $postService;
    }

    /**
     * Display the blog index view.
     */
    public function index(Request $request, ?string $year = null, ?string $month = null, ?string $day = null): Response
    {
        $subjects = $this->subjectService->whereHas("posts", function ($query) {
            $query->whereDate("date", "<=", now());
        })->with(["posts" => function ($query) {
            $query->whereDate("date", "<=", now());
        }])->orderBy("order")->get();
        $builder = $this->postService->whereDate("date", "<=", now());
        $where = [["date", "<=", now()]];
        $builder = $this->postService->orderByDesc("date");

        if ($request->filled("pesquisa")) {
            $where[] = ["title", "LIKE", "%" . str_replace(" ", "%", $request->get("pesquisa")) . "%"];
        }

        if ($year) {
            $builder->whereYear("date", $year);
        }

        if ($month) {
            $builder->whereMonth("date", $month);
        }

        if ($day) {
            $builder->whereDay("date", $day);
        }

        $posts = $builder->where($where)->paginate(6)->onEachSide(1);
        $allPosts = $this->postService->whereDate("date", "<=", now())->orderByDesc("date")->get();

        return Inertia::render('Blog/Index/Index', [
            'subjects' => $subjects,
            'posts' => $posts,
            'allPosts' => $allPosts,
            'year' => $year,
            'month' => $month,
            'day' => $day,
        ]);
    }

    /**
     * Display the blog post view.
     */
    public function show(string $year, string $month, string $day, string $slug): Response|RedirectResponse
    {
        $post = $this->postService
            ->whereDate("date", "<=", now())
            ->where("slug", $slug)
            ->whereYear("date", $year)
            ->whereMonth("date", $month)
            ->whereDay("date", $day)
            ->with(["subject", "descriptions" => function ($query) {
                $query->orderBy("order");
            }, "images" => function ($query) {
                $query->orderBy("order");
            }])->first();

        if (!$post) {
            return redirect("/blog", 301);
        }

        $posts = $this->postService->whereDate("date", "<=", now())->where("id", "<>", $post->id)->orderByDesc("date")->get();

        return Inertia::render('Blog/Show/Index', [
            'post' => $post,
            'posts' => $posts,
        ]);
    }
}
