<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from '@lucide/vue';
import { format, parseISO } from 'date-fns';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    educations: Array<{
        id: number;
        institution: string;
        program: string;
        start_date: string;
        end_date: string | null;
        sort_order: number;
    }>;
}>();

const deleteForm = useForm({});

function deleteEducation(id: number) {
    if (confirm('Are you sure you want to delete this education?')) {
        deleteForm.delete(`/admin/educations/${id}`);
    }
}

function formatDate(dateString: string | null) {
    if (!dateString) return 'Present';
    return format(parseISO(dateString), 'MMM yyyy');
}
</script>

<template>
    <Head title="Educations" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">Educations</h1>
            <Button as-child>
                <Link href="/admin/educations/create">
                    <Plus class="mr-2 h-4 w-4" /> Add Education
                </Link>
            </Button>
        </div>

        <div class="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Institution</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Sort Order</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="edu in educations" :key="edu.id">
                        <TableCell class="font-medium">{{ edu.institution }}</TableCell>
                        <TableCell>{{ edu.program }}</TableCell>
                        <TableCell>{{ formatDate(edu.start_date) }} - {{ formatDate(edu.end_date) }}</TableCell>
                        <TableCell>{{ edu.sort_order }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Button variant="outline" size="icon" as-child>
                                    <Link :href="`/admin/educations/${edu.id}/edit`">
                                        <Pencil class="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" @click="deleteEducation(edu.id)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="educations.length === 0">
                        <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                            No educations found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>