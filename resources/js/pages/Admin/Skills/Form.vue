<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    skill?: {
        id: number;
        name: string;
        category_name: string;
        icon: string | null;
        level: string;
        description: string | null;
        is_featured: boolean;
        sort_order: number;
    };
    categories: Array<{
        id: number;
        name: string;
    }>;
}>();

const isEditing = !!props.skill;

const form = useForm({
    name: props.skill?.name ?? '',
    category_name: props.skill?.category_name ?? '',
    icon: props.skill?.icon ?? '',
    level: props.skill?.level ?? 'Intermediate',
    description: props.skill?.description ?? '',
    is_featured: props.skill?.is_featured ?? false,
    sort_order: props.skill?.sort_order ?? 0,
});

function submit() {
    if (isEditing) {
        form.put(`/admin/skills/${props.skill!.id}`);
    } else {
        form.post('/admin/skills');
    }
}
</script>

<template>
    <Head :title="isEditing ? 'Edit Skill' : 'Add Skill'" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">
                {{ isEditing ? 'Edit Skill' : 'Add Skill' }}
            </h1>
            <Button variant="outline" as-child>
                <Link href="/admin/skills">Back</Link>
            </Button>
        </div>

        <div class="bg-card rounded-md border p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="name">Skill Name</Label>
                        <Input id="name" v-model="form.name" required />
                        <p
                            v-if="form.errors.name"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="category_name">Category</Label>
                        <!-- Using datalist for category autocomplete while allowing new categories -->
                        <Input
                            id="category_name"
                            list="categories"
                            v-model="form.category_name"
                            required
                            placeholder="Select or type a new category"
                        />
                        <datalist id="categories">
                            <option
                                v-for="cat in categories"
                                :key="cat.id"
                                :value="cat.name"
                            />
                        </datalist>
                        <p
                            v-if="form.errors.category_name"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.category_name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="level">Proficiency Level</Label>
                        <select
                            id="level"
                            v-model="form.level"
                            class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <p
                            v-if="form.errors.level"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.level }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="icon"
                            >Icon Class (e.g. 'fa-brands fa-laravel')</Label
                        >
                        <Input id="icon" v-model="form.icon" />
                        <p
                            v-if="form.errors.icon"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.icon }}
                        </p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        v-model="form.description"
                        rows="3"
                    />
                    <p
                        v-if="form.errors.description"
                        class="text-destructive text-sm"
                    >
                        {{ form.errors.description }}
                    </p>
                </div>

                <div class="grid gap-6 md:grid-cols-2">
                    <div class="max-w-[200px] space-y-2">
                        <Label for="sort_order">Sort Order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            v-model="form.sort_order"
                        />
                        <p
                            v-if="form.errors.sort_order"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.sort_order }}
                        </p>
                    </div>

                    <div class="flex items-center space-x-2 pt-6">
                        <input
                            type="checkbox"
                            id="is_featured"
                            v-model="form.is_featured"
                            class="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                        />
                        <Label
                            for="is_featured"
                            class="cursor-pointer font-normal"
                            >Featured Skill</Label
                        >
                        <p
                            v-if="form.errors.is_featured"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.is_featured }}
                        </p>
                    </div>
                </div>

                <div class="flex justify-end border-t pt-4">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Skill' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
