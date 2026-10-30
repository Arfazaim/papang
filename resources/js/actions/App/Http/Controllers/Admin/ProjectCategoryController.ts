import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::index
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:12
* @route '/admin/project-categories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/project-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::index
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:12
* @route '/admin/project-categories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::index
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:12
* @route '/admin/project-categories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::index
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:12
* @route '/admin/project-categories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::create
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:21
* @route '/admin/project-categories/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/project-categories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::create
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:21
* @route '/admin/project-categories/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::create
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:21
* @route '/admin/project-categories/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::create
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:21
* @route '/admin/project-categories/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::store
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:26
* @route '/admin/project-categories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/project-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::store
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:26
* @route '/admin/project-categories'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::store
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:26
* @route '/admin/project-categories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::edit
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:40
* @route '/admin/project-categories/{project_category}/edit'
*/
export const edit = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/project-categories/{project_category}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::edit
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:40
* @route '/admin/project-categories/{project_category}/edit'
*/
edit.url = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project_category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project_category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project_category: typeof args.project_category === 'object'
        ? args.project_category.id
        : args.project_category,
    }

    return edit.definition.url
            .replace('{project_category}', parsedArgs.project_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::edit
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:40
* @route '/admin/project-categories/{project_category}/edit'
*/
edit.get = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::edit
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:40
* @route '/admin/project-categories/{project_category}/edit'
*/
edit.head = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::update
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:47
* @route '/admin/project-categories/{project_category}'
*/
export const update = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/project-categories/{project_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::update
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:47
* @route '/admin/project-categories/{project_category}'
*/
update.url = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project_category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project_category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project_category: typeof args.project_category === 'object'
        ? args.project_category.id
        : args.project_category,
    }

    return update.definition.url
            .replace('{project_category}', parsedArgs.project_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::update
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:47
* @route '/admin/project-categories/{project_category}'
*/
update.put = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::update
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:47
* @route '/admin/project-categories/{project_category}'
*/
update.patch = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::destroy
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:61
* @route '/admin/project-categories/{project_category}'
*/
export const destroy = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/project-categories/{project_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::destroy
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:61
* @route '/admin/project-categories/{project_category}'
*/
destroy.url = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project_category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project_category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project_category: typeof args.project_category === 'object'
        ? args.project_category.id
        : args.project_category,
    }

    return destroy.definition.url
            .replace('{project_category}', parsedArgs.project_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProjectCategoryController::destroy
* @see app/Http/Controllers/Admin/ProjectCategoryController.php:61
* @route '/admin/project-categories/{project_category}'
*/
destroy.delete = (args: { project_category: number | { id: number } } | [project_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ProjectCategoryController = { index, create, store, edit, update, destroy }

export default ProjectCategoryController