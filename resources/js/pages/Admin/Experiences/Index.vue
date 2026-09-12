<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from '@lucide/vue';
import { format, parseISO } from 'date-fns';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    experiences: Array<{
        id: number;
        organization: string;
        position: string;
        start_date: string;
        end_date: string | null;
        sort_order: number;
    }>;
}>();

const deleteForm = useForm({});

function deleteExperience(id: number) {
    if (confirm('Are you sure you want to delete this experience?')) {
        deleteForm.delete(`/admin/experiences/${id}`);
    }
}

function formatDate(dateString: string | null) {
    if (!dateString) return 'Present';
    return format(parseISO(dateString), 'MMM yyyy');
}
</script>

<template>
    <Head title="Experiences" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">Experiences</h1>
            <Button as-child>
                <Link href="/admin/experiences/create">
                    <Plus class="mr-2 h-4 w-4" /> Add Experience
                </Link>
            </Button>
        </div>

        <div class="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Organization</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Sort Order</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="exp in experiences" :key="exp.id">
                        <TableCell class="font-medium">{{ exp.organization }}</TableCell>
                        <TableCell>{{ exp.position }}</TableCell>
                        <TableCell>{{ formatDate(exp.start_date) }} - {{ formatDate(exp.end_date) }}</TableCell>
                        <TableCell>{{ exp.sort_order }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Button variant="outline" size="icon" as-child>
                                    <Link :href="`/admin/experiences/${exp.id}/edit`">
                                        <Pencil class="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" @click="deleteExperience(exp.id)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="experiences.length === 0">
                        <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                            No experiences found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>