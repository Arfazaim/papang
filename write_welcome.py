import sys

content = """<script setup lang="ts">
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { onMounted, onUnmounted } from 'vue';

defineOptions({ layout: null }); // Disable AppLayout to use MyResume layout

const props = defineProps<{
    settings: Record<string, string>;
    socialLinks: Array<{
        id: number;
        name: string;
        url: string;
        icon: string | null;
        is_active: boolean;
    }>;
    skills: Record<string, Array<any>>;
    experiences: Array<any>;
    educations: Array<any>;
    certificates: Array<any>;
    featuredProjects: Array<any>;
}>();

const form = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
});

function submitContact() {
    form.post('/contact', {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
}

function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
    });
}

onMounted(async () => {
    document.body.classList.add('index-page');
    
    const cssFiles = [
        '/myresume/vendor/bootstrap/css/bootstrap.min.css',
        '/myresume/vendor/bootstrap-icons/bootstrap-icons.css',
        '/myresume/vendor/aos/aos.css',
        '/myresume/vendor/glightbox/css/glightbox.min.css',
        '/myresume/vendor/swiper/swiper-bundle.min.css',
        '/myresume/css/main.css'
    ];
    
    cssFiles.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    });

    const jsFiles = [
        '/myresume/vendor/bootstrap/js/bootstrap.bundle.min.js',
        '/myresume/vendor/aos/aos.js',
        '/myresume/vendor/typed.js/typed.umd.js',
        '/myresume/vendor/purecounter/purecounter_vanilla.js',
        '/myresume/vendor/waypoints/noframework.waypoints.js',
        '/myresume/vendor/glightbox/js/glightbox.min.js',
        '/myresume/vendor/imagesloaded/imagesloaded.pkgd.min.js',
        '/myresume/vendor/isotope-layout/isotope.pkgd.min.js',
        '/myresume/vendor/swiper/swiper-bundle.min.js',
        '/myresume/js/main.js'
    ];

    for (const src of jsFiles) {
        try {
            await loadScript(src);
        } catch (e) {
            console.error('Failed to load', src);
        }
    }
});

onUnmounted(() => {
    document.body.classList.remove('index-page');
});
</script>

<template>
    <div>
        <Head>
            <title>{{ settings.site_name || 'My Portfolio' }}</title>
        </Head>

        <header id="header" class="header d-flex flex-column justify-content-center">
            <i class="header-toggle d-xl-none bi bi-list"></i>
            <nav id="navmenu" class="navmenu">
                <ul>
                    <li><a href="#hero" class="active"><i class="bi bi-house navicon"></i><span>Home</span></a></li>
                    <li><a href="#about"><i class="bi bi-person navicon"></i><span>About</span></a></li>
                    <li><a href="#resume"><i class="bi bi-file-earmark-text navicon"></i><span>Resume</span></a></li>
                    <li><a href="#portfolio"><i class="bi bi-images navicon"></i><span>Portfolio</span></a></li>
                    <li><a href="#contact"><i class="bi bi-envelope navicon"></i><span>Contact</span></a></li>
                    <li v-if="$page.props.auth.user"><Link href="/admin"><i class="bi bi-speedometer2 navicon"></i><span>Dashboard</span></Link></li>
                    <li v-else><Link href="/login"><i class="bi bi-box-arrow-in-right navicon"></i><span>Login</span></Link></li>
                </ul>
            </nav>
        </header>

        <main class="main">
            <!-- Hero Section -->
            <section id="hero" class="hero section light-background">
                <img src="/myresume/img/hero-bg.jpg" alt="">
                <div class="container" data-aos="zoom-out">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <h2>{{ settings.hero_title || 'Hello!' }}</h2>
                            <p>{{ settings.hero_subtitle || 'I am a Developer' }}</p>
                            <div class="social-links">
                                <a v-for="social in socialLinks" :key="social.id" :href="social.url" target="_blank">
                                    <i :class="['bi', social.icon ? 'bi-' + social.icon : 'bi-globe']"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section id="about" class="about section">
                <div class="container section-title" data-aos="fade-up">
                    <h2>About</h2>
                    <p>{{ settings.site_description || 'About Me' }}</p>
                </div>
                <div class="container" data-aos="fade-up" data-aos-delay="100">
                    <div class="row gy-4 justify-content-center">
                        <div class="col-lg-4">
                            <img src="/myresume/img/profile-img.jpg" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-8 content">
                            <h2>{{ settings.site_name || 'My Name' }}</h2>
                            <p class="fst-italic py-3">Here is a brief summary of my profile and skills.</p>
                            
                            <div class="row">
                                <div class="col-lg-12">
                                    <h3 class="mb-4">Skills</h3>
                                    <div class="skills-content skills-animation">
                                        <div v-for="(categorySkills, categoryName) in skills" :key="categoryName">
                                            <h5 class="mt-4">{{ categoryName }}</h5>
                                            <div class="progress" v-for="skill in categorySkills" :key="skill.id">
                                                <span class="skill"><span>{{ skill.name }}</span> <i class="val">{{ skill.proficiency_percentage }}%</i></span>
                                                <div class="progress-bar-wrap">
                                                    <div class="progress-bar" role="progressbar" :aria-valuenow="skill.proficiency_percentage" aria-valuemin="0" aria-valuemax="100" :style="{ width: skill.proficiency_percentage + '%' }"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Resume Section -->
            <section id="resume" class="resume section">
                <div class="container section-title" data-aos="fade-up">
                    <h2>Resume</h2>
                    <p>My professional experience and education background.</p>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <h3 class="resume-title">Education</h3>
                            <div class="resume-item" v-for="edu in educations" :key="edu.id">
                                <h4>{{ edu.degree }}</h4>
                                <h5>{{ edu.start_date ? edu.start_date.substring(0,4) : '' }} - {{ edu.is_current ? 'Present' : (edu.end_date ? edu.end_date.substring(0,4) : 'Present') }}</h5>
                                <p><em>{{ edu.institution }}</em></p>
                                <p>{{ edu.description }}</p>
                            </div>
                        </div>
                        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                            <h3 class="resume-title">Professional Experience</h3>
                            <div class="resume-item" v-for="exp in experiences" :key="exp.id">
                                <h4>{{ exp.position }}</h4>
                                <h5>{{ exp.start_date ? exp.start_date.substring(0,4) : '' }} - {{ exp.is_current ? 'Present' : (exp.end_date ? exp.end_date.substring(0,4) : 'Present') }}</h5>
                                <p><em>{{ exp.company }}</em></p>
                                <p>{{ exp.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Portfolio Section -->
            <section id="portfolio" class="portfolio section">
                <div class="container section-title" data-aos="fade-up">
                    <h2>Portfolio</h2>
                    <p>Some of my featured projects.</p>
                </div>
                <div class="container">
                    <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                        <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                            <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app" v-for="project in featuredProjects" :key="project.id">
                                <img :src="project.cover_image_url || '/myresume/img/masonry-portfolio/masonry-portfolio-1.jpg'" class="img-fluid" alt="">
                                <div class="portfolio-info">
                                    <h4>{{ project.title }}</h4>
                                    <p>{{ project.category ? project.category.name : 'Project' }}</p>
                                    <Link :href="'/projects/' + project.slug" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="contact section">
                <div class="container section-title" data-aos="fade-up">
                    <h2>Contact</h2>
                    <p>Feel free to get in touch with me.</p>
                </div>
                <div class="container" data-aos="fade-up" data-aos-delay="100">
                    <div class="row gy-4">
                        <div class="col-lg-4">
                            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                                <i class="bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>{{ settings.site_email || 'hello@example.com' }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <form @submit.prevent="submitContact" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
                                <div class="row gy-4">
                                    <div class="col-md-6">
                                        <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Your Name" required>
                                        <div v-if="form.errors.name" class="text-danger mt-1 small">{{ form.errors.name }}</div>
                                    </div>
                                    <div class="col-md-6 ">
                                        <input v-model="form.email" type="email" class="form-control" name="email" placeholder="Your Email" required>
                                        <div v-if="form.errors.email" class="text-danger mt-1 small">{{ form.errors.email }}</div>
                                    </div>
                                    <div class="col-md-12">
                                        <input v-model="form.subject" type="text" class="form-control" name="subject" placeholder="Subject" required>
                                        <div v-if="form.errors.subject" class="text-danger mt-1 small">{{ form.errors.subject }}</div>
                                    </div>
                                    <div class="col-md-12">
                                        <textarea v-model="form.message" class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                                        <div v-if="form.errors.message" class="text-danger mt-1 small">{{ form.errors.message }}</div>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <button type="submit" :disabled="form.processing">
                                            {{ form.processing ? 'Sending...' : 'Send Message' }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <footer id="footer" class="footer position-relative light-background">
            <div class="container">
                <h3 class="sitename">{{ settings.site_name || 'My Name' }}</h3>
                <div class="social-links d-flex justify-content-center">
                    <a v-for="social in socialLinks" :key="social.id" :href="social.url" target="_blank">
                        <i :class="['bi', social.icon ? 'bi-' + social.icon : 'bi-globe']"></i>
                    </a>
                </div>
                <div class="container">
                    <div class="copyright">
                        <span>Copyright</span> <strong class="px-1 sitename">{{ settings.site_name || 'My Name' }}</strong> <span>All Rights Reserved</span>
                    </div>
                </div>
            </div>
        </footer>

        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
    </div>
</template>
"""

with open('resources/js/pages/Welcome.vue', 'w') as f:
    f.write(content)
