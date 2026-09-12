<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    education?: {
        id: number;
        institution: string;
        program: string;
        start_date: string;
        end_date: string | null;
        description: string | null;
        sort_order: number;
    };
}>();

const isEditing = !!props.education;

const form = useForm({
    institution: props.education?.institution ?? '',
    program: props.education?.program ?? '',
    start_date: props.education?.start_date
        ? props.education.start_date.split('T')[0]
        : '',
    end_date: props.education?.end_date
        ? props.education.end_date.split('T')[0]
        : '',
    description: props.education?.description ?? '',
    sort_order: props.education?.sort_order ?? 0,
});

function submit() {
    if (isEditing) {
        form.put(`/admin/educations/${props.education!.id}`);
    } else {
        form.post('/admin/educations');
    }
}
</script>

<template>
    <Head :title="isEditing ? 'Edit Education' : 'Add Education'" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">
                {{ isEditing ? 'Edit Education' : 'Add Education' }}
            </h1>
            <Button variant="outline" as-child>
                <Link href="/admin/educations">Back</Link>
            </Button>
        </div>

        <div class="bg-card rounded-md border p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="institution"
                            >Institution / University</Label
                        >
                        <Input
                            id="institution"
                            v-model="form.institution"
                            required
                        />
                        <p
                            v-if="form.errors.institution"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.institution }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="program">Program / Degree</Label>
                        <Input id="program" v-model="form.program" required />
                        <p
                            v-if="form.errors.program"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.program }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="start_date">Start Date</Label>
                        <Input
                            id="start_date"
                            type="date"
                            v-model="form.start_date"
                            required
                        />
                        <p
                            v-if="form.errors.start_date"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.start_date }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="end_date">End Date</Label>
                        <Input
                            id="end_date"
                            type="date"
                            v-model="form.end_date"
                        />
                        <p class="text-muted-foreground text-xs">
                            Leave empty if currently studying.
                        </p>
                        <p
                            v-if="form.errors.end_date"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.end_date }}
                        </p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        v-model="form.description"
                        rows="4"
                    />
                    <p
                        v-if="form.errors.description"
                        class="text-destructive text-sm"
                    >
                        {{ form.errors.description }}
                    </p>
                </div>

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

                <div class="flex justify-end border-t pt-4">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Education' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
