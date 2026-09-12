<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    experience?: {
        id: number;
        organization: string;
        position: string;
        start_date: string;
        end_date: string | null;
        description: string | null;
        achievements: string | null;
        sort_order: number;
    };
}>();

const isEditing = !!props.experience;

const form = useForm({
    organization: props.experience?.organization ?? '',
    position: props.experience?.position ?? '',
    start_date: props.experience?.start_date ? props.experience.start_date.split('T')[0] : '',
    end_date: props.experience?.end_date ? props.experience.end_date.split('T')[0] : '',
    description: props.experience?.description ?? '',
    achievements: props.experience?.achievements ?? '',
    sort_order: props.experience?.sort_order ?? 0,
});

function submit() {
    if (isEditing) {
        form.put(`/admin/experiences/${props.experience!.id}`);
    } else {
        form.post('/admin/experiences');
    }
}
</script>

<template>
    <Head :title="isEditing ? 'Edit Experience' : 'Add Experience'" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">
                {{ isEditing ? 'Edit Experience' : 'Add Experience' }}
            </h1>
            <Button variant="outline" as-child>
                <Link href="/admin/experiences">Back</Link>
            </Button>
        </div>

        <div class="rounded-md border bg-card p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="organization">Organization / Company</Label>
                        <Input id="organization" v-model="form.organization" required />
                        <p v-if="form.errors.organization" class="text-sm text-destructive">{{ form.errors.organization }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="position">Position / Job Title</Label>
                        <Input id="position" v-model="form.position" required />
                        <p v-if="form.errors.position" class="text-sm text-destructive">{{ form.errors.position }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="start_date">Start Date</Label>
                        <Input id="start_date" type="date" v-model="form.start_date" required />
                        <p v-if="form.errors.start_date" class="text-sm text-destructive">{{ form.errors.start_date }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="end_date">End Date</Label>
                        <Input id="end_date" type="date" v-model="form.end_date" />
                        <p class="text-xs text-muted-foreground">Leave empty if it's your current job.</p>
                        <p v-if="form.errors.end_date" class="text-sm text-destructive">{{ form.errors.end_date }}</p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Job Description</Label>
                    <Textarea id="description" v-model="form.description" rows="4" />
                    <p v-if="form.errors.description" class="text-sm text-destructive">{{ form.errors.description }}</p>
                </div>

                <div class="space-y-2">
                    <Label for="achievements">Key Achievements (Optional)</Label>
                    <Textarea id="achievements" v-model="form.achievements" rows="4" />
                    <p v-if="form.errors.achievements" class="text-sm text-destructive">{{ form.errors.achievements }}</p>
                </div>
                
                <div class="space-y-2 max-w-[200px]">
                    <Label for="sort_order">Sort Order</Label>
                    <Input id="sort_order" type="number" v-model="form.sort_order" />
                    <p v-if="form.errors.sort_order" class="text-sm text-destructive">{{ form.errors.sort_order }}</p>
                </div>

                <div class="flex justify-end pt-4 border-t">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Experience' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>