<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    technology?: {
        id: number;
        name: string;
        slug: string;
        icon: string | null;
        color: string | null;
    };
}>();

const isEditing = !!props.technology;

const form = useForm({
    name: props.technology?.name ?? '',
    slug: props.technology?.slug ?? '',
    icon: props.technology?.icon ?? '',
    color: props.technology?.color ?? '',
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
        form.put(`/admin/technologies/${props.technology!.id}`);
    } else {
        form.post('/admin/technologies');
    }
}
</script>

<template>
    <div>
        <Head :title="isEditing ? 'Edit Technology' : 'Create Technology'" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    {{ isEditing ? 'Edit Technology' : 'Create Technology' }}
                </h1>
                <p class="text-muted-foreground">
                    {{
                        isEditing
                            ? 'Update the details of the technology.'
                            : 'Add a new technology used in your projects.'
                    }}
                </p>
            </div>
            <Link href="/admin/technologies">
                <Button variant="outline">Back to Technologies</Button>
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
                    <Label for="icon"
                        >Icon (Optional, e.g., SVG path or class)</Label
                    >
                    <Input id="icon" v-model="form.icon" />
                    <p v-if="form.errors.icon" class="text-destructive text-sm">
                        {{ form.errors.icon }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="color">Color (Optional Hex code)</Label>
                    <div class="flex items-center gap-2">
                        <Input
                            type="color"
                            id="color-picker"
                            v-model="form.color"
                            class="h-10 w-12 p-1"
                        />
                        <Input
                            id="color"
                            v-model="form.color"
                            placeholder="#000000"
                        />
                    </div>
                    <p
                        v-if="form.errors.color"
                        class="text-destructive text-sm"
                    >
                        {{ form.errors.color }}
                    </p>
                </div>

                <div class="flex items-center gap-4">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Technology' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
