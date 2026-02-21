<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Library> $libraries
 * @property-read int|null $libraries_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Page> $pages
 * @property-read int|null $pages_count
 * @method static \Database\Factories\ComponentFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Component whereUpdatedAt($value)
 */
	class Component extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $industry
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Component> $components
 * @property-read int|null $components_count
 * @method static \Database\Factories\LibraryFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library whereIndustry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Library whereUpdatedAt($value)
 */
	class Library extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $file_name
 * @property string $file_type
 * @property string $caption
 * @property string $cloud_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @method static \Database\Factories\MediaFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereCaption($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereCloudUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Media whereUserId($value)
 */
	class Media extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $portfolio_id
 * @property string $page_name
 * @property string|null $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Component> $components
 * @property-read int|null $components_count
 * @method static \Database\Factories\PageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page wherePageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page wherePortfolioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Page whereUpdatedAt($value)
 */
	class Page extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property string $industry
 * @property bool $publish_status
 * @property array<array-key, mixed>|null $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\PortfolioFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereIndustry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio wherePublishStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Portfolio whereUserId($value)
 */
	class Portfolio extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property string $started_on
 * @property string|null $ended_on
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Media> $media
 * @property-read int|null $media_count
 * @method static \Database\Factories\ProjectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereEndedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereStartedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUserId($value)
 */
	class Project extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Portfolio> $portfolios
 * @property-read int|null $portfolios_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

