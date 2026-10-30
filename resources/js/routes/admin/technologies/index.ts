import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TechnologyController::index
* @see app/Http/Controllers/Admin/TechnologyController.php:12
* @route '/admin/technologies'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/technologies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TechnologyController::index
* @see app/Http/Controllers/Admin/TechnologyController.php:12
* @route '/admin/technologies'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TechnologyController::index
* @see app/Http/Controllers/Admin/TechnologyController.php:12
* @route '/admin/technologies'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::index
* @see app/Http/Controllers/Admin/TechnologyController.php:12
* @route '/admin/technologies'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::create
* @see app/Http/Controllers/Admin/TechnologyController.php:21
* @route '/admin/technologies/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/technologies/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TechnologyController::create
* @see app/Http/Controllers/Admin/TechnologyController.php:21
* @route '/admin/technologies/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TechnologyController::create
* @see app/Http/Controllers/Admin/TechnologyController.php:21
* @route '/admin/technologies/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::create
* @see app/Http/Controllers/Admin/TechnologyController.php:21
* @route '/admin/technologies/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::store
* @see app/Http/Controllers/Admin/TechnologyController.php:26
* @route '/admin/technologies'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/technologies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TechnologyController::store
* @see app/Http/Controllers/Admin/TechnologyController.php:26
* @route '/admin/technologies'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TechnologyController::store
* @see app/Http/Controllers/Admin/TechnologyController.php:26
* @route '/admin/technologies'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::edit
* @see app/Http/Controllers/Admin/TechnologyController.php:40
* @route '/admin/technologies/{technology}/edit'
*/
export const edit = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/technologies/{technology}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TechnologyController::edit
* @see app/Http/Controllers/Admin/TechnologyController.php:40
* @route '/admin/technologies/{technology}/edit'
*/
edit.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { technology: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            technology: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        technology: typeof args.technology === 'object'
        ? args.technology.id
        : args.technology,
    }

    return edit.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TechnologyController::edit
* @see app/Http/Controllers/Admin/TechnologyController.php:40
* @route '/admin/technologies/{technology}/edit'
*/
edit.get = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::edit
* @see app/Http/Controllers/Admin/TechnologyController.php:40
* @route '/admin/technologies/{technology}/edit'
*/
edit.head = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::update
* @see app/Http/Controllers/Admin/TechnologyController.php:47
* @route '/admin/technologies/{technology}'
*/
export const update = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/technologies/{technology}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TechnologyController::update
* @see app/Http/Controllers/Admin/TechnologyController.php:47
* @route '/admin/technologies/{technology}'
*/
update.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { technology: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            technology: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        technology: typeof args.technology === 'object'
        ? args.technology.id
        : args.technology,
    }

    return update.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TechnologyController::update
* @see app/Http/Controllers/Admin/TechnologyController.php:47
* @route '/admin/technologies/{technology}'
*/
update.put = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::update
* @see app/Http/Controllers/Admin/TechnologyController.php:47
* @route '/admin/technologies/{technology}'
*/
update.patch = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TechnologyController::destroy
* @see app/Http/Controllers/Admin/TechnologyController.php:61
* @route '/admin/technologies/{technology}'
*/
export const destroy = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/technologies/{technology}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TechnologyController::destroy
* @see app/Http/Controllers/Admin/TechnologyController.php:61
* @route '/admin/technologies/{technology}'
*/
destroy.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { technology: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            technology: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        technology: typeof args.technology === 'object'
        ? args.technology.id
        : args.technology,
    }

    return destroy.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TechnologyController::destroy
* @see app/Http/Controllers/Admin/TechnologyController.php:61
* @route '/admin/technologies/{technology}'
*/
destroy.delete = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const technologies = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default technologies