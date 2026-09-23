<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, ExternalLink, Github } from '@lucide/vue';

defineOptions({ layout: AppLayout });

const props = defineProps<{
    project: {
        id: number;
        title: string;
        slug: string;
        short_description: string;
        full_description: string | null;
        problem: string | null;
        goals: string | null;
        features: string | null;
        architecture: string | null;
        challenges: string | null;
        solutions: string | null;
        lessons_learned: string | null;
        demo_url: string | null;
        github_url: string | null;
        cover_image_url: string | null;
        status: string;
        is_featured: boolean;
        started_at: string | null;
        completed_at: string | null;
        category: { id: number; name: string } | null;
        technologies: Array<{ id: number; name: string; color: string | null }>;
    };
    relatedProjects: Array<{
        id: number;
        title: string;
        slug: string;
        short_description: string;
        cover_image_url: string | null;
        category: { id: number; name: string } | null;
        technologies: Array<{ id: number; name: string }>;
    }>;
}>();

function formatDate(date: string | null) {
    if (!date) return 'Present';
    return format(parseISO(date), 'MMM yyyy');
}

type ProjectKey = keyof typeof props.project;

const contentSections: Array<{ key: ProjectKey; title: string }> = [
    { key: 'problem', title: 'Problem Statement' },
    { key: 'goals', title: 'Goals' },
    { key: 'features', title: 'Key Features' },
    { key: 'architecture', title: 'Architecture' },
    { key: 'challenges', title: 'Challenges' },
    { key: 'solutions', title: 'Solutions' },
    { key: 'lessons_learned', title: 'Lessons Learned' },
];
</script>

<template>
    <div>
        <Head :title="project.title">
            <meta name="description" :content="project.short_description" />
            <meta property="og:title" :content="project.title" />
            <meta property="og:description" :content="project.short_description" />
            <meta v-if="project.cover_image_url" property="og:image" :content="project.cover_image_url" />
        </Head>

        <article class="py-12">
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href="/projects" class="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors">
                    <ArrowLeft class="h-4 w-4" />
                    Back to Projects
                </Link>

                <header class="mb-8">
                    <div class="mb-4 flex flex-wrap items-center gap-2">
                        <Badge v-if="project.category" variant="outline">{{ project.category.name }}</Badge>
                        <Badge v-if="project.is_featured">Featured</Badge>
                        <span v-if="project.started_at" class="text-muted-foreground text-sm">
                            {{ formatDate(project.started_at) }} &mdash; {{ formatDate(project.completed_at) }}
                        </span>
                    </div>
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{{ project.title }}</h1>
                    <p class="text-muted-foreground text-xl leading-relaxed">{{ project.short_description }}</p>
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a v-if="project.demo_url" :href="project.demo_url" target="_blank" rel="noopener noreferrer">
                            <Button size="lg"><ExternalLink class="mr-2 h-4 w-4" />Live Demo</Button>
                        </a>
                        <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg"><Github class="mr-2 h-4 w-4" />Source Code</Button>
                        </a>
                    </div>
                </header>

                <div v-if="project.cover_image_url" class="mb-12 overflow-hidden rounded-xl border">
                    <img :src="project.cover_image_url" :alt="project.title" class="w-full object-cover" />
                </div>

                <div class="mb-12">
                    <h2 class="mb-4 text-lg font-semibold">Technologies Used</h2>
                    <div class="flex flex-wrap gap-2">
                        <Badge v-for="tech in project.technologies" :key="tech.id" variant="secondary" class="px-4 py-2 text-sm">{{ tech.name }}</Badge>
                    </div>
                </div>

                <div v-if="project.full_description" class="mb-12">
                    <h2 class="text-2xl font-bold">About This Project</h2>
                    <div class="text-muted-foreground mt-4 whitespace-pre-line leading-relaxed">{{ project.full_description }}</div>
                </div>

                <template v-for="section in contentSections" :key="section.key">
                    <div v-if="(project as any)[section.key]" class="mb-10">
                        <h2 class="mb-4 text-2xl font-bold">{{ section.title }}</h2>
                        <div class="text-muted-foreground whitespace-pre-line leading-relaxed">{{ (project as any)[section.key] }}</div>
                    </div>
                </template>

                <section v-if="relatedProjects.length > 0" class="border-border mt-16 border-t pt-12">
                    <h2 class="mb-8 text-2xl font-bold">Related Projects</h2>
                    <div class="grid gap-6 md:grid-cols-3">
                        <Link v-for="related in relatedProjects" :key="related.id" :href="`/projects/${related.slug}`" class="bg-card group overflow-hidden rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                            <div class="bg-muted relative aspect-video overflow-hidden">
                                <img v-if="related.cover_image_url" :src="related.cover_image_url" :alt="related.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div v-else class="flex h-full items-center justify-center">
                                    <span class="text-muted-foreground text-3xl font-bold opacity-20">{{ related.title.charAt(0) }}</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="group-hover:text-primary font-semibold transition-colors">{{ related.title }}</h3>
                                <p class="text-muted-foreground mt-1 line-clamp-2 text-sm">{{ related.short_description }}</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    </div>
</template>