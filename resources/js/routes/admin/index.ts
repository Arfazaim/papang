import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import projectCategories from './project-categories'
import technologies from './technologies'
import projects from './projects'
import skills from './skills'
import experiences from './experiences'
import educations from './educations'
import certificates from './certificates'
import messages from './messages'
import media from './media'
import settings from './settings'
import socialLinks from './social-links'
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:18
* @route '/admin'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:18
* @route '/admin'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:18
* @route '/admin'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:18
* @route '/admin'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    projectCategories: Object.assign(projectCategories, projectCategories),
    technologies: Object.assign(technologies, technologies),
    projects: Object.assign(projects, projects),
    skills: Object.assign(skills, skills),
    experiences: Object.assign(experiences, experiences),
    educations: Object.assign(educations, educations),
    certificates: Object.assign(certificates, certificates),
    messages: Object.assign(messages, messages),
    media: Object.assign(media, media),
    settings: Object.assign(settings, settings),
    socialLinks: Object.assign(socialLinks, socialLinks),
}

export default admin