<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    project?: {
        id: number;
        title: string;
        slug: string;
        category_id: number | null;
        short_description: string;
        full_description: string | null;
        problem: string | null;
        goals: string | null;
        features: string | null;
        architecture: string | null;
        challenges: string | null;
        solutions: string | null;
        lessons_learned: string | null;
        status: string;
        is_featured: boolean;
        demo_url: string | null;
        github_url: string | null;
        started_at: string | null;
        completed_at: string | null;
        sort_order: number;
        technologies: Array<{ id: number }>;
    };
    categories: Array<{ id: number; name: string }>;
    technologies: Array<{ id: number; name: string }>;
}>();

const isEditing = !!props.project;

const form = useForm({
    title: props.project?.title ?? '',
    slug: props.project?.slug ?? '',
    category_id: props.project?.category_id ?? '',
    short_description: props.project?.short_description ?? '',
    full_description: props.project?.full_description ?? '',
    problem: props.project?.problem ?? '',
    goals: props.project?.goals ?? '',
    features: props.project?.features ?? '',
    architecture: props.project?.architecture ?? '',
    challenges: props.project?.challenges ?? '',
    solutions: props.project?.solutions ?? '',
    lessons_learned: props.project?.lessons_learned ?? '',
    status: props.project?.status ?? 'draft',
    is_featured: props.project?.is_featured ?? false,
    demo_url: props.project?.demo_url ?? '',
    github_url: props.project?.github_url ?? '',
    started_at: props.project?.started_at ?? '',
    completed_at: props.project?.completed_at ?? '',
    sort_order: props.project?.sort_order ?? 0,
    technologies: props.project?.technologies.map((t) => t.id) ?? [],
});

function generateSlug() {
    if (!isEditing && form.title) {
        form.slug = form.title
            .toLowerCase()
            .replace(/[\s_]+/g, '-')
            .replace(/[^\w-]+/g, '');
    }
}

function submit() {
    if (isEditing) {
        form.put(`/admin/projects/${props.project!.id}`);
    } else {
        form.post('/admin/projects');
    }
}
</script>

<template>
    <div>
        <Head :title="isEditing ? 'Edit Project' : 'Create Project'" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    {{ isEditing ? 'Edit Project' : 'Create Project' }}
                </h1>
                <p class="text-muted-foreground">
                    {{
                        isEditing
                            ? 'Update the project details.'
                            : 'Add a new project to your portfolio.'
                    }}
                </p>
            </div>
            <Link href="/admin/projects">
                <Button variant="outline">Back to Projects</Button>
            </Link>
        </div>

        <div class="max-w-3xl">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            @input="generateSlug"
                            required
                        />
                        <p
                            v-if="form.errors.title"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.title }}
                        </p>
                    </div>
                    <div class="space-y-2">
                        <Label for="slug">Slug</Label>
                        <Input id="slug" v-model="form.slug" required />
                        <p
                            v-if="form.errors.slug"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.slug }}
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="category_id">Category</Label>
                        <select
                            id="category_id"
                            v-model="form.category_id"
                            class="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        >
                            <option value="">Uncategorized</option>
                            <option
                                v-for="cat in categories"
                                :key="cat.id"
                                :value="cat.id"
                            >
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <Label for="status">Status</Label>
                        <select
                            id="status"
                            v-model="form.status"
                            class="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="short_description">Short Description</Label>
                    <Textarea
                        id="short_description"
                        v-model="form.short_description"
                        rows="3"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <Label for="full_description">Full Description</Label>
                    <Textarea
                        id="full_description"
                        v-model="form.full_description"
                        rows="6"
                    />
                </div>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="problem">Problem Statement</Label>
                        <Textarea
                            id="problem"
                            v-model="form.problem"
                            rows="4"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="goals">Project Goals</Label>
                        <Textarea id="goals" v-model="form.goals" rows="4" />
                    </div>
                    <div class="space-y-2">
                        <Label for="features">Key Features</Label>
                        <Textarea
                            id="features"
                            v-model="form.features"
                            rows="4"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="architecture">Architecture</Label>
                        <Textarea
                            id="architecture"
                            v-model="form.architecture"
                            rows="4"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="challenges">Challenges</Label>
                        <Textarea
                            id="challenges"
                            v-model="form.challenges"
                            rows="4"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="solutions">Solutions</Label>
                        <Textarea
                            id="solutions"
                            v-model="form.solutions"
                            rows="4"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="lessons_learned">Lessons Learned</Label>
                        <Textarea
                            id="lessons_learned"
                            v-model="form.lessons_learned"
                            rows="4"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="demo_url">Demo URL</Label>
                        <Input
                            id="demo_url"
                            v-model="form.demo_url"
                            type="url"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="github_url">GitHub URL</Label>
                        <Input
                            id="github_url"
                            v-model="form.github_url"
                            type="url"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="started_at">Started At</Label>
                        <Input
                            id="started_at"
                            v-model="form.started_at"
                            type="date"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="completed_at">Completed At</Label>
                        <Input
                            id="completed_at"
                            v-model="form.completed_at"
                            type="date"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="sort_order">Sort Order</Label>
                        <Input
                            id="sort_order"
                            v-model="form.sort_order"
                            type="number"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <Label>Technologies</Label>
                    <div
                        class="bg-muted/20 mt-2 flex flex-wrap gap-4 rounded-md border p-4"
                    >
                        <label
                            v-for="tech in technologies"
                            :key="tech.id"
                            class="flex cursor-pointer items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                :value="tech.id"
                                v-model="form.technologies"
                                class="border-input text-primary focus:ring-primary h-4 w-4 rounded"
                            />
                            <span class="text-sm">{{ tech.name }}</span>
                        </label>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="flex cursor-pointer items-center gap-2">
                        <input
                            type="checkbox"
                            v-model="form.is_featured"
                            class="border-input text-primary focus:ring-primary h-4 w-4 rounded"
                        />
                        <span class="text-sm font-medium"
                            >Feature this project</span
                        >
                    </label>
                </div>
                <div class="flex items-center gap-4 border-t pt-4">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Project' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
