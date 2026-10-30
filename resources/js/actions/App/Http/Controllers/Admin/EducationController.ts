import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EducationController::index
* @see app/Http/Controllers/Admin/EducationController.php:12
* @route '/admin/educations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/educations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationController::index
* @see app/Http/Controllers/Admin/EducationController.php:12
* @route '/admin/educations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationController::index
* @see app/Http/Controllers/Admin/EducationController.php:12
* @route '/admin/educations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::index
* @see app/Http/Controllers/Admin/EducationController.php:12
* @route '/admin/educations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::create
* @see app/Http/Controllers/Admin/EducationController.php:21
* @route '/admin/educations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/educations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationController::create
* @see app/Http/Controllers/Admin/EducationController.php:21
* @route '/admin/educations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationController::create
* @see app/Http/Controllers/Admin/EducationController.php:21
* @route '/admin/educations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::create
* @see app/Http/Controllers/Admin/EducationController.php:21
* @route '/admin/educations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::store
* @see app/Http/Controllers/Admin/EducationController.php:26
* @route '/admin/educations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/educations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EducationController::store
* @see app/Http/Controllers/Admin/EducationController.php:26
* @route '/admin/educations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationController::store
* @see app/Http/Controllers/Admin/EducationController.php:26
* @route '/admin/educations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::edit
* @see app/Http/Controllers/Admin/EducationController.php:42
* @route '/admin/educations/{education}/edit'
*/
export const edit = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/educations/{education}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationController::edit
* @see app/Http/Controllers/Admin/EducationController.php:42
* @route '/admin/educations/{education}/edit'
*/
edit.url = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { education: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            education: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        education: typeof args.education === 'object'
        ? args.education.id
        : args.education,
    }

    return edit.definition.url
            .replace('{education}', parsedArgs.education.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationController::edit
* @see app/Http/Controllers/Admin/EducationController.php:42
* @route '/admin/educations/{education}/edit'
*/
edit.get = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::edit
* @see app/Http/Controllers/Admin/EducationController.php:42
* @route '/admin/educations/{education}/edit'
*/
edit.head = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::update
* @see app/Http/Controllers/Admin/EducationController.php:49
* @route '/admin/educations/{education}'
*/
export const update = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/educations/{education}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\EducationController::update
* @see app/Http/Controllers/Admin/EducationController.php:49
* @route '/admin/educations/{education}'
*/
update.url = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { education: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            education: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        education: typeof args.education === 'object'
        ? args.education.id
        : args.education,
    }

    return update.definition.url
            .replace('{education}', parsedArgs.education.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationController::update
* @see app/Http/Controllers/Admin/EducationController.php:49
* @route '/admin/educations/{education}'
*/
update.put = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::update
* @see app/Http/Controllers/Admin/EducationController.php:49
* @route '/admin/educations/{education}'
*/
update.patch = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\EducationController::destroy
* @see app/Http/Controllers/Admin/EducationController.php:65
* @route '/admin/educations/{education}'
*/
export const destroy = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/educations/{education}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EducationController::destroy
* @see app/Http/Controllers/Admin/EducationController.php:65
* @route '/admin/educations/{education}'
*/
destroy.url = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { education: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            education: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        education: typeof args.education === 'object'
        ? args.education.id
        : args.education,
    }

    return destroy.definition.url
            .replace('{education}', parsedArgs.education.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationController::destroy
* @see app/Http/Controllers/Admin/EducationController.php:65
* @route '/admin/educations/{education}'
*/
destroy.delete = (args: { education: number | { id: number } } | [education: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const EducationController = { index, create, store, edit, update, destroy }

export default EducationController