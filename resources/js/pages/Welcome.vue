<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format, parseISO } from 'date-fns';
import { ArrowRight, ExternalLink, Briefcase, GraduationCap } from '@lucide/vue';

defineOptions({ layout: AppLayout });

const props = defineProps<{
    settings: Record<string, string>;
    socialLinks: Array<any>;
    skills: Record<string, Array<any>>;
    experiences: Array<any>;
    educations: Array<any>;
    certificates: Array<any>;
    featuredProjects: Array<any>;
}>();
const siteName = props.settings.site_name || 'My Portfolio';
const siteDescription = props.settings.site_description || 'A passionate software developer building scalable applications and intuitive user experiences.';
const seoKeywords = props.settings.seo_keywords || 'portfolio, developer, laravel, vue';


const contactForm = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
});

function submitContact() {
    contactForm.post('/contact', {
        preserveScroll: true,
        onSuccess: () => contactForm.reset(),
    });
}

function formatDate(date: string | null) {
    if (!date) return 'Present';
    return format(parseISO(date), 'MMM yyyy');
}
</script>

<template>
    <div>
        <Head :title="siteName">
            <meta name="description" :content="siteDescription" />
            <meta name="keywords" :content="seoKeywords" />
            <meta property="og:title" :content="siteName" />
            <meta property="og:description" :content="siteDescription" />
        </Head>
        <!-- HERO SECTION -->
        <section id="home" class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center px-4">
            <Badge class="mb-6 py-1 px-4 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" variant="outline">
                Available for Freelance
            </Badge>
            <h1 class="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
                Hi, I'm <span class="text-primary">{{ settings.site_name || 'Zaaim' }}</span>
            </h1>
            <p class="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground leading-relaxed">
                {{ settings.site_description || 'A Fullstack Developer passionate about building excellent software that improves the lives of those around me.' }}
            </p>
            <div class="flex gap-4">
                <a href="#projects">
                    <Button size="lg" class="h-12 px-8 text-base">View Projects <ArrowRight class="ml-2 h-4 w-4" /></Button>
                </a>
                <a href="#contact">
                    <Button variant="outline" size="lg" class="h-12 px-8 text-base">Contact Me</Button>
                </a>
            </div>
            
            <div class="mt-20 flex gap-6 text-muted-foreground">
                <a v-for="social in socialLinks" :key="social.id" :href="social.url" target="_blank" class="hover:text-foreground transition-colors">
                    <span v-if="social.icon" v-html="social.icon" class="h-6 w-6 inline-block fill-current"></span>
                    <span v-else>{{ social.platform }}</span>
                </a>
            </div>
        </section>
        
        <!-- SKILLS SECTION -->
        <section id="skills" class="py-20 bg-muted/30">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Technical Skills</h2>
                    <p class="mt-4 text-lg text-muted-foreground">Technologies I work with daily</p>
                </div>
                
                <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(skillGroup, category) in skills" :key="category" class="space-y-6">
                        <h3 class="text-xl font-semibold border-b pb-2">{{ category }}</h3>
                        <div class="flex flex-wrap gap-3">
                            <Badge v-for="skill in skillGroup" :key="skill.id" variant="secondary" class="px-4 py-2 text-sm flex items-center gap-2 bg-background border">
                                <span v-if="skill.icon" v-html="skill.icon" class="h-4 w-4 fill-current"></span>
                                {{ skill.name }}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- RESUME SECTION -->
        <section id="resume" class="py-24">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Experience & Education</h2>
                    <p class="mt-4 text-lg text-muted-foreground">My professional journey</p>
                </div>
                
                <div class="grid gap-16 md:grid-cols-2">
                    <!-- Experiences -->
                    <div>
                        <div class="flex items-center gap-3 mb-8 text-2xl font-bold">
                            <Briefcase class="h-6 w-6 text-primary" />
                            <h3>Experience</h3>
                        </div>
                        <div class="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                            <div v-for="exp in experiences" :key="exp.id" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div class="flex items-center justify-center w-5 h-5 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                                <div class="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                                    <div class="flex items-center justify-between mb-1">
                                        <div class="font-semibold text-lg text-foreground">{{ exp.position }}</div>
                                    </div>
                                    <div class="text-sm text-primary font-medium mb-3">{{ exp.company_name }}</div>
                                    <div class="text-xs text-muted-foreground mb-4">
                                        {{ formatDate(exp.start_date) }} - {{ exp.is_current ? 'Present' : formatDate(exp.end_date) }}
                                    </div>
                                    <div v-if="exp.description" class="text-sm text-muted-foreground whitespace-pre-wrap">{{ exp.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Education -->
                    <div>
                        <div class="flex items-center gap-3 mb-8 text-2xl font-bold">
                            <GraduationCap class="h-6 w-6 text-primary" />
                            <h3>Education</h3>
                        </div>
                        <div class="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                            <div v-for="edu in educations" :key="edu.id" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div class="flex items-center justify-center w-5 h-5 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                                <div class="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                                    <div class="flex items-center justify-between mb-1">
                                        <div class="font-semibold text-lg text-foreground">{{ edu.degree }}</div>
                                    </div>
                                    <div class="text-sm text-primary font-medium mb-3">{{ edu.institution_name }}</div>
                                    <div class="text-xs text-muted-foreground mb-4">
                                        {{ formatDate(edu.start_date) }} - {{ edu.is_current ? 'Present' : formatDate(edu.end_date) }}
                                    </div>
                                    <div v-if="edu.description" class="text-sm text-muted-foreground whitespace-pre-wrap">{{ edu.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROJECTS SECTION -->
        <section id="projects" class="py-24 bg-muted/30">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
                    <p class="mt-4 text-lg text-muted-foreground">Some of my recent work</p>
                </div>
                
                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div v-for="project in featuredProjects" :key="project.id" class="group flex flex-col rounded-xl border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md">
                        <!-- Project Cover -->
                        <div class="aspect-video w-full bg-muted overflow-hidden relative">
                            <!-- In a real scenario, use project.media cover image -->
                            <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
                            <img v-if="project.cover_image" :src="project.cover_image" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Cover" />
                            <div v-else class="h-full w-full flex items-center justify-center bg-secondary text-secondary-foreground text-sm font-medium">No Image</div>
                        </div>
                        
                        <div class="flex flex-col flex-1 p-6">
                            <Badge variant="outline" class="w-fit mb-3">{{ project.category?.name || 'Uncategorized' }}</Badge>
                            <h3 class="text-xl font-bold tracking-tight mb-2">{{ project.title }}</h3>
                            <p class="text-muted-foreground text-sm flex-1 mb-6 line-clamp-3">
                                {{ project.short_description }}
                            </p>
                            
                            <div class="flex items-center gap-3 mt-auto">
                                <a v-if="project.demo_url" :href="project.demo_url" target="_blank" class="flex-1">
                                    <Button class="w-full" size="sm">
                                        <ExternalLink class="mr-2 h-4 w-4" /> Live Demo
                                    </Button>
                                </a>
                                <a v-if="project.github_url" :href="project.github_url" target="_blank" :class="project.demo_url ? 'flex-none' : 'flex-1'">
                                    <Button variant="outline" size="sm" :class="project.demo_url ? 'px-3' : 'w-full'">
                                        <svg v-if="!project.demo_url" class="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                        </svg>
                                        <svg v-else class="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                        </svg>
                                        <span v-if="!project.demo_url">GitHub</span>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT SECTION -->
        <section id="contact" class="py-24">
            <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
                    <p class="mt-4 text-lg text-muted-foreground">Have a project in mind or just want to say hi?</p>
                </div>
                
                <div class="rounded-2xl border bg-card p-8 shadow-sm">
                    <div v-if="contactForm.wasSuccessful" class="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Thank you for your message! I'll get back to you as soon as possible.
                    </div>
                    
                    <form @submit.prevent="submitContact" class="space-y-6">
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="name">Name</Label>
                                <Input id="name" v-model="contactForm.name" placeholder="John Doe" required />
                                <p v-if="contactForm.errors.name" class="text-sm text-destructive">{{ contactForm.errors.name }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <Input id="email" type="email" v-model="contactForm.email" placeholder="john@example.com" required />
                                <p v-if="contactForm.errors.email" class="text-sm text-destructive">{{ contactForm.errors.email }}</p>
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="subject">Subject</Label>
                            <Input id="subject" v-model="contactForm.subject" placeholder="How can I help you?" required />
                            <p v-if="contactForm.errors.subject" class="text-sm text-destructive">{{ contactForm.errors.subject }}</p>
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="message">Message</Label>
                            <Textarea id="message" v-model="contactForm.message" placeholder="Your message here..." rows="6" required />
                            <p v-if="contactForm.errors.message" class="text-sm text-destructive">{{ contactForm.errors.message }}</p>
                        </div>
                        
                        <Button type="submit" class="w-full" size="lg" :disabled="contactForm.processing">
                            {{ contactForm.processing ? 'Sending...' : 'Send Message' }}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
