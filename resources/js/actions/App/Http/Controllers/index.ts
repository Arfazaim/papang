import HomeController from './HomeController'
import ContactController from './ContactController'
import ProjectController from './ProjectController'
import Admin from './Admin'

const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
    ContactController: Object.assign(ContactController, ContactController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    Admin: Object.assign(Admin, Admin),
}

export default Controllers