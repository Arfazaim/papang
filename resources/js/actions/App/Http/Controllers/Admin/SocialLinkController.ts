import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SocialLinkController::index
* @see app/Http/Controllers/Admin/SocialLinkController.php:12
* @route '/admin/social-links'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/social-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::index
* @see app/Http/Controllers/Admin/SocialLinkController.php:12
* @route '/admin/social-links'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::index
* @see app/Http/Controllers/Admin/SocialLinkController.php:12
* @route '/admin/social-links'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::index
* @see app/Http/Controllers/Admin/SocialLinkController.php:12
* @route '/admin/social-links'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::create
* @see app/Http/Controllers/Admin/SocialLinkController.php:21
* @route '/admin/social-links/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/social-links/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::create
* @see app/Http/Controllers/Admin/SocialLinkController.php:21
* @route '/admin/social-links/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::create
* @see app/Http/Controllers/Admin/SocialLinkController.php:21
* @route '/admin/social-links/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::create
* @see app/Http/Controllers/Admin/SocialLinkController.php:21
* @route '/admin/social-links/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::store
* @see app/Http/Controllers/Admin/SocialLinkController.php:26
* @route '/admin/social-links'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/social-links',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::store
* @see app/Http/Controllers/Admin/SocialLinkController.php:26
* @route '/admin/social-links'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::store
* @see app/Http/Controllers/Admin/SocialLinkController.php:26
* @route '/admin/social-links'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::edit
* @see app/Http/Controllers/Admin/SocialLinkController.php:41
* @route '/admin/social-links/{social_link}/edit'
*/
export const edit = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/social-links/{social_link}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::edit
* @see app/Http/Controllers/Admin/SocialLinkController.php:41
* @route '/admin/social-links/{social_link}/edit'
*/
edit.url = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { social_link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { social_link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            social_link: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        social_link: typeof args.social_link === 'object'
        ? args.social_link.id
        : args.social_link,
    }

    return edit.definition.url
            .replace('{social_link}', parsedArgs.social_link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::edit
* @see app/Http/Controllers/Admin/SocialLinkController.php:41
* @route '/admin/social-links/{social_link}/edit'
*/
edit.get = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::edit
* @see app/Http/Controllers/Admin/SocialLinkController.php:41
* @route '/admin/social-links/{social_link}/edit'
*/
edit.head = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::update
* @see app/Http/Controllers/Admin/SocialLinkController.php:48
* @route '/admin/social-links/{social_link}'
*/
export const update = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/social-links/{social_link}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::update
* @see app/Http/Controllers/Admin/SocialLinkController.php:48
* @route '/admin/social-links/{social_link}'
*/
update.url = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { social_link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { social_link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            social_link: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        social_link: typeof args.social_link === 'object'
        ? args.social_link.id
        : args.social_link,
    }

    return update.definition.url
            .replace('{social_link}', parsedArgs.social_link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::update
* @see app/Http/Controllers/Admin/SocialLinkController.php:48
* @route '/admin/social-links/{social_link}'
*/
update.put = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::update
* @see app/Http/Controllers/Admin/SocialLinkController.php:48
* @route '/admin/social-links/{social_link}'
*/
update.patch = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::destroy
* @see app/Http/Controllers/Admin/SocialLinkController.php:63
* @route '/admin/social-links/{social_link}'
*/
export const destroy = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/social-links/{social_link}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::destroy
* @see app/Http/Controllers/Admin/SocialLinkController.php:63
* @route '/admin/social-links/{social_link}'
*/
destroy.url = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { social_link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { social_link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            social_link: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        social_link: typeof args.social_link === 'object'
        ? args.social_link.id
        : args.social_link,
    }

    return destroy.definition.url
            .replace('{social_link}', parsedArgs.social_link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocialLinkController::destroy
* @see app/Http/Controllers/Admin/SocialLinkController.php:63
* @route '/admin/social-links/{social_link}'
*/
destroy.delete = (args: { social_link: number | { id: number } } | [social_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SocialLinkController = { index, create, store, edit, update, destroy }

export default SocialLinkController