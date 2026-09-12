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
        level: number;
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
    level: props.skill?.level ?? 50,
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

        <div class="rounded-md border bg-card p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="name">Skill Name</Label>
                        <Input id="name" v-model="form.name" required />
                        <p v-if="form.errors.name" class="text-sm text-destructive">{{ form.errors.name }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="category_name">Category</Label>
                        <!-- Using datalist for category autocomplete while allowing new categories -->
                        <Input id="category_name" list="categories" v-model="form.category_name" required placeholder="Select or type a new category" />
                        <datalist id="categories">
                            <option v-for="cat in categories" :key="cat.id" :value="cat.name" />
                        </datalist>
                        <p v-if="form.errors.category_name" class="text-sm text-destructive">{{ form.errors.category_name }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="level">Proficiency Level (0-100)</Label>
                        <div class="flex items-center gap-4">
                            <Input id="level" type="range" min="0" max="100" v-model="form.level" class="flex-1" />
                            <span class="w-12 text-center border rounded-md py-1">{{ form.level }}</span>
                        </div>
                        <p v-if="form.errors.level" class="text-sm text-destructive">{{ form.errors.level }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="icon">Icon Class (e.g. 'fa-brands fa-laravel')</Label>
                        <Input id="icon" v-model="form.icon" />
                        <p v-if="form.errors.icon" class="text-sm text-destructive">{{ form.errors.icon }}</p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Description (Optional)</Label>
                    <Textarea id="description" v-model="form.description" rows="3" />
                    <p v-if="form.errors.description" class="text-sm text-destructive">{{ form.errors.description }}</p>
                </div>
                
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-2 max-w-[200px]">
                        <Label for="sort_order">Sort Order</Label>
                        <Input id="sort_order" type="number" v-model="form.sort_order" />
                        <p v-if="form.errors.sort_order" class="text-sm text-destructive">{{ form.errors.sort_order }}</p>
                    </div>

                    <div class="flex items-center space-x-2 pt-6">
                        <input type="checkbox" id="is_featured" v-model="form.is_featured" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <Label for="is_featured" class="font-normal cursor-pointer">Featured Skill</Label>
                        <p v-if="form.errors.is_featured" class="text-sm text-destructive">{{ form.errors.is_featured }}</p>
                    </div>
                </div>

                <div class="flex justify-end pt-4 border-t">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Skill' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>