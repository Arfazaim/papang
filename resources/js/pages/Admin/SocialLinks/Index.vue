<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from '@lucide/vue';
import { AppModelsSocialLink } from '@/actions';

defineOptions({ layout: AdminLayout });

defineProps<{
    links: AppModelsSocialLink[];
}>();

const deleteForm = useForm({});

function deleteLink(id: number) {
    if (confirm('Are you sure you want to delete this social link?')) {
        deleteForm.delete(route('admin.social-links.destroy', id), {
            preserveScroll: true,
        });
    }
}
</script>

<template>
    <Head title="Social Links" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">Social Links</h1>
            <Button as-child>
                <Link :href="route('admin.social-links.create')">
                    <Plus class="mr-2 h-4 w-4" />
                    Add Link
                </Link>
            </Button>
        </div>

        <div class="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-16">Sort</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="link in links" :key="link.id">
                        <TableCell class="font-medium">{{ link.sort_order }}</TableCell>
                        <TableCell class="font-medium">
                            <div class="flex items-center gap-2">
                                <span v-if="link.icon" class="text-muted-foreground text-xs border rounded px-1">{{ link.icon }}</span>
                                {{ link.name }}
                            </div>
                        </TableCell>
                        <TableCell>
                            <a :href="link.url" target="_blank" class="text-blue-500 hover:underline">{{ link.url }}</a>
                        </TableCell>
                        <TableCell>
                            <Badge :variant="link.is_active ? 'default' : 'secondary'">
                                {{ link.is_active ? 'Active' : 'Hidden' }}
                            </Badge>
                        </TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Button variant="outline" size="icon" as-child>
                                    <Link :href="route('admin.social-links.edit', link.id)">
                                        <Pencil class="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" @click="deleteLink(link.id)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="links.length === 0">
                        <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                            No social links found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>