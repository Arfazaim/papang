import DashboardController from './DashboardController'
import ProjectCategoryController from './ProjectCategoryController'
import TechnologyController from './TechnologyController'
import ProjectController from './ProjectController'
import SkillController from './SkillController'
import ExperienceController from './ExperienceController'
import EducationController from './EducationController'
import CertificateController from './CertificateController'
import MessageController from './MessageController'
import MediaController from './MediaController'
import SiteSettingController from './SiteSettingController'
import SocialLinkController from './SocialLinkController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProjectCategoryController: Object.assign(ProjectCategoryController, ProjectCategoryController),
    TechnologyController: Object.assign(TechnologyController, TechnologyController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    SkillController: Object.assign(SkillController, SkillController),
    ExperienceController: Object.assign(ExperienceController, ExperienceController),
    EducationController: Object.assign(EducationController, EducationController),
    CertificateController: Object.assign(CertificateController, CertificateController),
    MessageController: Object.assign(MessageController, MessageController),
    MediaController: Object.assign(MediaController, MediaController),
    SiteSettingController: Object.assign(SiteSettingController, SiteSettingController),
    SocialLinkController: Object.assign(SocialLinkController, SocialLinkController),
}

export default Admin