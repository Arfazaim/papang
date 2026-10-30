import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SkillController::index
* @see app/Http/Controllers/Admin/SkillController.php:13
* @route '/admin/skills'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/skills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SkillController::index
* @see app/Http/Controllers/Admin/SkillController.php:13
* @route '/admin/skills'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SkillController::index
* @see app/Http/Controllers/Admin/SkillController.php:13
* @route '/admin/skills'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::index
* @see app/Http/Controllers/Admin/SkillController.php:13
* @route '/admin/skills'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::create
* @see app/Http/Controllers/Admin/SkillController.php:34
* @route '/admin/skills/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/skills/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SkillController::create
* @see app/Http/Controllers/Admin/SkillController.php:34
* @route '/admin/skills/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SkillController::create
* @see app/Http/Controllers/Admin/SkillController.php:34
* @route '/admin/skills/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::create
* @see app/Http/Controllers/Admin/SkillController.php:34
* @route '/admin/skills/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::store
* @see app/Http/Controllers/Admin/SkillController.php:43
* @route '/admin/skills'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/skills',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SkillController::store
* @see app/Http/Controllers/Admin/SkillController.php:43
* @route '/admin/skills'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SkillController::store
* @see app/Http/Controllers/Admin/SkillController.php:43
* @route '/admin/skills'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::edit
* @see app/Http/Controllers/Admin/SkillController.php:72
* @route '/admin/skills/{skill}/edit'
*/
export const edit = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/skills/{skill}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SkillController::edit
* @see app/Http/Controllers/Admin/SkillController.php:72
* @route '/admin/skills/{skill}/edit'
*/
edit.url = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { skill: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { skill: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            skill: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        skill: typeof args.skill === 'object'
        ? args.skill.id
        : args.skill,
    }

    return edit.definition.url
            .replace('{skill}', parsedArgs.skill.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SkillController::edit
* @see app/Http/Controllers/Admin/SkillController.php:72
* @route '/admin/skills/{skill}/edit'
*/
edit.get = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::edit
* @see app/Http/Controllers/Admin/SkillController.php:72
* @route '/admin/skills/{skill}/edit'
*/
edit.head = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::update
* @see app/Http/Controllers/Admin/SkillController.php:91
* @route '/admin/skills/{skill}'
*/
export const update = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/skills/{skill}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SkillController::update
* @see app/Http/Controllers/Admin/SkillController.php:91
* @route '/admin/skills/{skill}'
*/
update.url = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { skill: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { skill: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            skill: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        skill: typeof args.skill === 'object'
        ? args.skill.id
        : args.skill,
    }

    return update.definition.url
            .replace('{skill}', parsedArgs.skill.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SkillController::update
* @see app/Http/Controllers/Admin/SkillController.php:91
* @route '/admin/skills/{skill}'
*/
update.put = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::update
* @see app/Http/Controllers/Admin/SkillController.php:91
* @route '/admin/skills/{skill}'
*/
update.patch = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\SkillController::destroy
* @see app/Http/Controllers/Admin/SkillController.php:120
* @route '/admin/skills/{skill}'
*/
export const destroy = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/skills/{skill}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SkillController::destroy
* @see app/Http/Controllers/Admin/SkillController.php:120
* @route '/admin/skills/{skill}'
*/
destroy.url = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { skill: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { skill: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            skill: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        skill: typeof args.skill === 'object'
        ? args.skill.id
        : args.skill,
    }

    return destroy.definition.url
            .replace('{skill}', parsedArgs.skill.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SkillController::destroy
* @see app/Http/Controllers/Admin/SkillController.php:120
* @route '/admin/skills/{skill}'
*/
destroy.delete = (args: { skill: number | { id: number } } | [skill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SkillController = { index, create, store, edit, update, destroy }

export default SkillController