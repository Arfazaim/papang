<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    category?: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        sort_order: number;
    };
}>();

const isEditing = !!props.category;

const form = useForm({
    name: props.category?.name ?? '',
    slug: props.category?.slug ?? '',
    description: props.category?.description ?? '',
    sort_order: props.category?.sort_order ?? 0,
});

function generateSlug() {
    if (!isEditing && form.name) {
        form.slug = form.name
            .toLowerCase()
            .replace(/[\s_]+/g, '-')
            .replace(/[^\w-]+/g, '');
    }
}

function submit() {
    if (isEditing) {
        form.put(`/admin/project-categories/${props.category!.id}`);
    } else {
        form.post('/admin/project-categories');
    }
}
</script>

<template>
    <div>
        <Head :title="isEditing ? 'Edit Category' : 'Create Category'" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    {{ isEditing ? 'Edit Category' : 'Create Category' }}
                </h1>
                <p class="text-muted-foreground">
                    {{
                        isEditing
                            ? 'Update the details of the category.'
                            : 'Add a new category for your projects.'
                    }}
                </p>
            </div>
            <Link href="/admin/project-categories">
                <Button variant="outline">Back to Categories</Button>
            </Link>
        </div>

        <div class="max-w-2xl">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        v-model="form.name"
                        @input="generateSlug"
                        required
                    />
                    <p v-if="form.errors.name" class="text-destructive text-sm">
                        {{ form.errors.name }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="slug">Slug</Label>
                    <Input id="slug" v-model="form.slug" required />
                    <p v-if="form.errors.slug" class="text-destructive text-sm">
                        {{ form.errors.slug }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="description">Description (Optional)</Label>
                    <Input id="description" v-model="form.description" />
                    <p
                        v-if="form.errors.description"
                        class="text-destructive text-sm"
                    >
                        {{ form.errors.description }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="sort_order">Sort Order</Label>
                    <Input
                        id="sort_order"
                        type="number"
                        v-model="form.sort_order"
                        required
                    />
                    <p
                        v-if="form.errors.sort_order"
                        class="text-destructive text-sm"
                    >
                        {{ form.errors.sort_order }}
                    </p>
                </div>

                <div class="flex items-center gap-4">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Category' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
