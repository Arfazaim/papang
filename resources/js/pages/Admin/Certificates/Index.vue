<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, ExternalLink } from '@lucide/vue';
import { format, parseISO } from 'date-fns';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    certificates: Array<{
        id: number;
        name: string;
        issuer: string;
        issue_date: string;
        credential_url: string | null;
        sort_order: number;
    }>;
}>();

const deleteForm = useForm({});

function deleteCertificate(id: number) {
    if (confirm('Are you sure you want to delete this certificate?')) {
        deleteForm.delete(`/admin/certificates/${id}`);
    }
}

function formatDate(dateString: string) {
    return format(parseISO(dateString), 'MMM yyyy');
}
</script>

<template>
    <Head title="Certificates" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">Certificates</h1>
            <Button as-child>
                <Link href="/admin/certificates/create">
                    <Plus class="mr-2 h-4 w-4" /> Add Certificate
                </Link>
            </Button>
        </div>

        <div class="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Issuer</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Sort Order</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="cert in certificates" :key="cert.id">
                        <TableCell class="font-medium">
                            <div class="flex items-center gap-2">
                                {{ cert.name }}
                                <a v-if="cert.credential_url" :href="cert.credential_url" target="_blank" class="text-muted-foreground hover:text-primary">
                                    <ExternalLink class="h-3 w-3" />
                                </a>
                            </div>
                        </TableCell>
                        <TableCell>{{ cert.issuer }}</TableCell>
                        <TableCell>{{ formatDate(cert.issue_date) }}</TableCell>
                        <TableCell>{{ cert.sort_order }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Button variant="outline" size="icon" as-child>
                                    <Link :href="`/admin/certificates/${cert.id}/edit`">
                                        <Pencil class="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" @click="deleteCertificate(cert.id)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="certificates.length === 0">
                        <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                            No certificates found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>