<?php

namespace Src;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

/**
 * Class FileSystem
 *
 * A utility class for handling file uploads, storage, and deletion, with support for image manipulation.
 */
class FileSystem
{
    /**
     * Array of keys used to identify attributes in the input data.
     *
     * @var array
     */
    protected array $keys = [];

    /**
     * The folder where files will be stored.
     *
     * @var string
     */
    protected string $folder = '';

    /**
     * Constructor for the FileSystem class.
     *
     * @param array $keys Array of keys used to identify attributes in the input data.
     */
    public function __construct(array $keys = [])
    {
        $this->keys = $keys;
    }

    /**
     * Set the folder where files will be stored.
     *
     * @param string $folder The folder path.
     *
     * @return void
     */
    public function setFolder(string $folder): void
    {
        $this->folder = $folder;
    }

    /**
     * Automatically save files based on the provided keys and configurations.
     *
     * @param array $attributes Input data with attributes to be processed.
     *
     * @return array The processed input data.
     * @throws Exception If file saving fails.
     */
    public function saveAutomatically(array $attributes): array
    {
        if (array_key_exists('nested', $this->keys)) {
            foreach ($this->keys['nested'] as $key => $configs) {
                $this->saveInArray($attributes, $key, $configs);
            }
        }

        foreach ($this->keys as $key) {
            if (isset($key['attribute']) && !empty($attributes[$key['attribute']])) {
                $attributes[$key['attribute']] = $this->saveFile(
                    $attributes[$key['attribute']],
                    $attributes[$key['baseNameAttribute'] ?? null] ?? null,
                    $key['resize'] ?? [],
                    $key['fit'] ?? [],
                    $key['blur'] ?? false
                );

                if (isset($key['oldAttribute']) && !empty($attributes[$key['oldAttribute']])) {
                    $this->deleteFile(
                        $attributes[$key['oldAttribute']],
                        $key['resize'] ?? [],
                        $key['fit'] ?? []
                    );
                }
            } else if (isset($key['attribute']) && empty($attributes[$key['attribute']])) {
                unset($attributes[$key['attribute']]);
            }
        }

        return $attributes;
    }

    /**
     * Save files in nested arrays based on the provided key and configurations.
     *
     * @param array $inputs Reference to the input data.
     * @param string|array $key The key or array of keys to locate the nested array.
     * @param null|array $configs Optional configurations for file saving.
     *
     * @return bool True if the file was saved, false otherwise.
     */
    public function saveInArray(array &$inputs, string|array $key, null|array $configs = null): bool
    {
        $segments = is_array($key) ? $key : explode('.', $key);

        if (($segment = array_shift($segments)) === '*') {
            foreach ($inputs as &$inner) {
                $this->saveInArray($inner, $segments, $configs);
            }
        } elseif ($segments) {
            if (array_key_exists($segment, $inputs)) {
                if ($inputs[$segment]) {
                    $this->saveInArray($inputs[$segment], $segments, $configs);
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } elseif (!empty($inputs[$segment])) {
            $inputs[$segment] = $this->saveFile(
                $inputs[$segment],
                null,
                $configs['resize'] ?? [],
                $configs['fit'] ?? [],
                $configs['blur'] ?? false
            );

            if (isset($configs['oldAttribute']) && !empty($inputs[$configs['oldAttribute']])) {
                $this->deleteFile(
                    $inputs[$configs['oldAttribute']],
                    $configs['resize'] ?? [],
                    $configs['fit'] ?? []
                );
            }
        } else {
            unset($inputs[$segment]);
        }

        return true;
    }

    /**
     * Save a file based on a key and its configurations.
     *
     * @param UploadedFile $file The uploaded file.
     * @param string|null $baseName The base name for the file.
     * @param array $resize Array of resize configurations.
     * @param array $fit Array of fit configurations.
     * @param bool $blur Whether to apply blur effect.
     *
     * @return string The name of the saved file.
     * @throws Exception If file saving fails.
     */
    public function saveFile(UploadedFile $file, ?string $baseName = null, array $resize = [], array $fit = [], bool $blur = false): string
    {
        $name = $this->makeName($file, $baseName);

        if (substr($file->getMimeType(), 0, 5) == 'image') {
            $this->saveImage($file, $name, $resize, $fit, $blur);
        } else {
            $path = join('/', ['storage', $this->folder]);
            $saved = $file->move(public_path($path), $name);

            if (!$saved) {
                throw new Exception;
            }
        }

        return $name;
    }

    /**
     * Generate a unique name for the uploaded file.
     *
     * @param UploadedFile $file The uploaded file instance.
     * @param string|null $baseName An optional base name for the file.
     * 
     * @return string The generated unique file name.
     */
    protected function makeName(UploadedFile $file, ?string $baseName = null): string
    {
        if ($baseName) {
            $newBaseName = explode('.', $baseName);

            if (count($newBaseName) > 1) {
                array_pop($newBaseName);
            } else {
                $newBaseName = [$baseName];
            }
        }

        if (substr($file->getMimeType(), 0, 5) == 'image') {
            return (is_null($baseName) ?: Str::slug(implode('-', $newBaseName)) . '-') . $this->generateUniqueId() . '.webp';
        } else {
            return (is_null($baseName) ?: Str::slug(implode('-', $newBaseName)) . '-') . $this->generateUniqueId() . '.' . $file->getClientOriginalExtension();
        }
    }

    /**
     * Generate a unique identifier of a specified length.
     *
     * @param int|null $length The length of the unique identifier. Default is 15.
     * 
     * @return string The generated unique identifier.
     */
    function generateUniqueId(?int $length = 15): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        $char_length = strlen($characters);
        $unique_id = '';

        for ($i = 0; $i < $length; $i++) {
            $rand_index = rand(0, $char_length - 1);
            $unique_id .= $characters[$rand_index];
        }

        return $unique_id;
    }

    /**
     * Save an image file based on the provided configurations.
     *
     * @param UploadedFile $file The uploaded image file.
     * @param string $name The name of the file.
     * @param array $resize Array of resize configurations.
     * @param array $fit Array of fit configurations.
     * @param bool $blur Whether to apply blur effect.
     *
     * @return void
     */
    public function saveImage(UploadedFile $file, string $name, array $resize = [], array $fit = [], bool $blur = false): void
    {
        $pathname = $this->pathname($name);
        $this->makeDirectory($pathname);
        Image::make($file)->encode('webp')->orientate()->save($pathname);

        if ($blur) {
            $this->pixelateImage($pathname);
        }

        if (!empty($resize)) {
            $this->resizeImages($name, $resize, $blur);
        }

        if (!empty($fit)) {
            $this->fitImages($name, $fit, $blur);
        }
    }

    /**
     * Generate the full file pathname based on the provided name, folder, and optional prefix.
     *
     * @param string $name The name of the file.
     * @param string $prefix An optional prefix for the file.
     * 
     * @return string The full file pathname.
     */
    protected function pathname(string $name, string $prefix = ''): string
    {
        return public_path(join('/', ['storage', $this->folder, $prefix . $name]));
    }

    /**
     * Create the directory structure for the given pathname if it doesn't exist.
     *
     * @param string $pathname The full pathname for which the directory structure needs to be created.
     * 
     * @return void
     */
    protected function makeDirectory(string $pathname): void
    {
        if (!File::isDirectory($dir = dirname($pathname))) {
            File::makeDirectory($dir, 0777, true, true);
        }
    }

    /**
     * Resize images for different sizes.
     *
     * @param string $name The name of the image file.
     * @param array $sizes An array of sizes to resize the image to.
     * @param bool $blur Whether to apply blur during resizing. Default is false.
     * 
     * @return void
     */
    public function resizeImages(string $name, array $sizes, bool $blur = false): void
    {
        foreach ($sizes as $size) {
            $this->resizeImage($name, $size, $blur);
        }
    }

    /**
     * Resize an image based on the provided size configurations.
     *
     * @param string $name The name of the image file.
     * @param array $size Array of size configurations.
     * @param bool $blur Whether to apply blur effect.
     *
     * @return void
     */
    public function resizeImage(string $name, array $size, bool $blur = false): void
    {
        $background = Image::canvas($size['width'], $size['height']);
        $image = Image::make($this->pathname($name))->encode('webp');

        $image->resize($size['width'], $size['height'], function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $background->insert($image, 'center');
        $pathnameWithPrefix = $this->pathname($name, $size['prefix'] ?? '');
        $background->save($pathnameWithPrefix, 100);

        if ($blur) {
            $this->pixelateImage($pathnameWithPrefix);
        }
    }

    /**
     * Fit images for different sizes.
     *
     * @param string $name The name of the image file.
     * @param array $sizes An array of sizes to fit the image into.
     * @param bool $blur Whether to apply blur during fitting. Default is false.
     * 
     * @return void
     */
    public function fitImages(string $name, array $sizes, bool $blur = false): void
    {
        foreach ($sizes as $size) {
            $this->fitImage($name, $size, $blur);
        }
    }

    /**
     * Fit an image based on the provided size configurations.
     *
     * @param string $name The name of the image file.
     * @param array $size Array of size configurations.
     * @param bool $blur Whether to apply blur effect.
     *
     * @return void
     */
    public function fitImage(string $name, array $size, bool $blur = false): void
    {
        $image = Image::make($this->pathname($name))->encode('webp');
        $image->fit($size['width'], $size['height']);

        $pathnameWithPrefix = $this->pathname($name, $size['prefix'] ?? '');
        $image->save($pathnameWithPrefix, 100);

        if ($blur) {
            $this->pixelateImage($pathnameWithPrefix);
        }
    }

    /**
     * Pixelate an image file.
     *
     * @param string $pathname The path to the image file.
     *
     * @return void
     */
    public function pixelateImage(string $pathname): void
    {
        Image::make($pathname)->encode('webp')->pixelate(8)->save($pathname . '.blur.webp');
    }

    /**
     * Delete files automatically based on the provided attributes and configurations.
     *
     * @param array $attributes The attributes containing file information.
     *
     * @return void
     */
    public function deleteAutomatically(array $attributes): void
    {
        foreach ($this->keys as $file) {
            if (isset($file['attribute']) && !empty($attributes[$file['attribute']])) {
                $this->deleteFile(
                    $attributes[$file['attribute']],
                    $file['resize'] ?? [],
                    $file['fit'] ?? []
                );
            }
        }
    }

    /**
     * Delete files associated with a given name, along with potentially resized and fitted versions.
     *
     * @param string $name The base name of the file.
     * @param array $resize An array of resized versions to delete.
     * @param array $fit An array of fitted versions to delete.
     * 
     * @return void
     */
    public function deleteFile(string $name, array $resize = [], array $fit = []): void
    {
        File::delete($this->pathname($name));
        File::delete($this->pathname($name . '.blur.webp'));

        if (!empty($resize)) {
            foreach ($resize as $size) {
                $prefix = $size['prefix'] ?? '';
                File::delete($this->pathname($name, $prefix));
                File::delete($this->pathname($name . '.blur.webp', $prefix));
            }
        }

        if (!empty($fit)) {
            foreach ($fit as $size) {
                $prefix = $size['prefix'] ?? '';
                File::delete($this->pathname($name, $prefix));
                File::delete($this->pathname($name . '.blur.webp', $prefix));
            }
        }
    }

    /**
     * Delete a single file based on the provided name and configurations.
     *
     * @param string $name The name of the file.
     *
     * @return void
     */
    public function deleteOneFile(string $name): void
    {
        foreach ($this->keys as $file) {
            if (isset($file['attribute'])) {
                $this->deleteFile(
                    $name,
                    $file['resize'] ?? [],
                    $file['fit'] ?? []
                );
            }
        }
    }
}
