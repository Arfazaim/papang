import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CertificateController::index
* @see app/Http/Controllers/Admin/CertificateController.php:13
* @route '/admin/certificates'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/certificates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::index
* @see app/Http/Controllers/Admin/CertificateController.php:13
* @route '/admin/certificates'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::index
* @see app/Http/Controllers/Admin/CertificateController.php:13
* @route '/admin/certificates'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::index
* @see app/Http/Controllers/Admin/CertificateController.php:13
* @route '/admin/certificates'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::create
* @see app/Http/Controllers/Admin/CertificateController.php:22
* @route '/admin/certificates/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::create
* @see app/Http/Controllers/Admin/CertificateController.php:22
* @route '/admin/certificates/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::create
* @see app/Http/Controllers/Admin/CertificateController.php:22
* @route '/admin/certificates/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::create
* @see app/Http/Controllers/Admin/CertificateController.php:22
* @route '/admin/certificates/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::store
* @see app/Http/Controllers/Admin/CertificateController.php:27
* @route '/admin/certificates'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/certificates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::store
* @see app/Http/Controllers/Admin/CertificateController.php:27
* @route '/admin/certificates'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::store
* @see app/Http/Controllers/Admin/CertificateController.php:27
* @route '/admin/certificates'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
* @see app/Http/Controllers/Admin/CertificateController.php:48
* @route '/admin/certificates/{certificate}/edit'
*/
export const edit = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/{certificate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
* @see app/Http/Controllers/Admin/CertificateController.php:48
* @route '/admin/certificates/{certificate}/edit'
*/
edit.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { certificate: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            certificate: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        certificate: typeof args.certificate === 'object'
        ? args.certificate.id
        : args.certificate,
    }

    return edit.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
* @see app/Http/Controllers/Admin/CertificateController.php:48
* @route '/admin/certificates/{certificate}/edit'
*/
edit.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
* @see app/Http/Controllers/Admin/CertificateController.php:48
* @route '/admin/certificates/{certificate}/edit'
*/
edit.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::update
* @see app/Http/Controllers/Admin/CertificateController.php:55
* @route '/admin/certificates/{certificate}'
*/
export const update = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::update
* @see app/Http/Controllers/Admin/CertificateController.php:55
* @route '/admin/certificates/{certificate}'
*/
update.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { certificate: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            certificate: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        certificate: typeof args.certificate === 'object'
        ? args.certificate.id
        : args.certificate,
    }

    return update.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::update
* @see app/Http/Controllers/Admin/CertificateController.php:55
* @route '/admin/certificates/{certificate}'
*/
update.put = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::update
* @see app/Http/Controllers/Admin/CertificateController.php:55
* @route '/admin/certificates/{certificate}'
*/
update.patch = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
* @see app/Http/Controllers/Admin/CertificateController.php:79
* @route '/admin/certificates/{certificate}'
*/
export const destroy = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
* @see app/Http/Controllers/Admin/CertificateController.php:79
* @route '/admin/certificates/{certificate}'
*/
destroy.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { certificate: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            certificate: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        certificate: typeof args.certificate === 'object'
        ? args.certificate.id
        : args.certificate,
    }

    return destroy.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
* @see app/Http/Controllers/Admin/CertificateController.php:79
* @route '/admin/certificates/{certificate}'
*/
destroy.delete = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const certificates = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default certificates