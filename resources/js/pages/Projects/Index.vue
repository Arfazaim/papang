<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Badge } from '@/components/ui/badge';

defineOptions({ layout: AppLayout });

const props = defineProps<{
    projects: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            short_description: string;
            cover_image_url: string | null;
            status: string;
            is_featured: boolean;
            category: { id: number; name: string } | null;
            technologies: Array<{ id: number; name: string; color: string | null }>;
        }>;
        links: any[];
    };
    categories: Array<{
        id: number;
        name: string;
        slug: string;
        projects_count: number;
    }>;
}>();
</script>

<template>
    <div>
        <Head title="Projects" />

        <section class="py-20">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="mb-16 text-center">
                    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">All Projects</h1>
                    <p class="text-muted-foreground mt-4 text-lg">A collection of projects I have built and contributed to.</p>
                </div>

                <div v-if="categories.length > 0" class="mb-12 flex flex-wrap justify-center gap-2">
                    <Badge v-for="cat in categories" :key="cat.id" variant="secondary" class="cursor-default px-4 py-2 text-sm">
                        {{ cat.name }}
                        <span class="text-muted-foreground ml-1">({{ cat.projects_count }})</span>
                    </Badge>
                </div>

                <div v-if="projects.data.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        v-for="project in projects.data"
                        :key="project.id"
                        :href="`/projects/${project.slug}`"
                        class="bg-card group overflow-hidden rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div class="bg-muted relative aspect-video overflow-hidden">
                            <div class="bg-primary/10 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <img v-if="project.cover_image_url" :src="project.cover_image_url" :alt="project.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div v-else class="flex h-full items-center justify-center">
                                <span class="text-muted-foreground text-4xl font-bold opacity-20">{{ project.title.charAt(0) }}</span>
                            </div>
                            <Badge v-if="project.is_featured" class="absolute top-3 right-3">Featured</Badge>
                        </div>
                        <div class="p-6">
                            <div class="mb-2 flex items-center gap-2">
                                <Badge v-if="project.category" variant="outline" class="text-xs">{{ project.category.name }}</Badge>
                            </div>
                            <h3 class="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">{{ project.title }}</h3>
                            <p class="text-muted-foreground mb-4 line-clamp-2 text-sm">{{ project.short_description }}</p>
                            <div class="flex flex-wrap gap-1">
                                <Badge v-for="tech in project.technologies.slice(0, 4)" :key="tech.id" variant="secondary" class="text-xs">{{ tech.name }}</Badge>
                                <Badge v-if="project.technologies.length > 4" variant="secondary" class="text-xs">+{{ project.technologies.length - 4 }}</Badge>
                            </div>
                        </div>
                    </Link>
                </div>

                <div v-else class="py-20 text-center">
                    <p class="text-muted-foreground text-lg">No projects published yet. Check back soon!</p>
                </div>

                <div v-if="projects.links.length > 3" class="mt-12 flex justify-center gap-2">
                    <Link
                        v-for="link in projects.links"
                        :key="link.label"
                        :href="link.url || '#'"
                        class="rounded-md border px-4 py-2 text-sm transition-colors"
                        :class="link.active ? 'bg-primary text-primary-foreground' : link.url ? 'hover:bg-accent' : 'text-muted-foreground cursor-not-allowed opacity-50'"
                        v-html="link.label"
                    />
                </div>
            </div>
        </section>
    </div>
</template>