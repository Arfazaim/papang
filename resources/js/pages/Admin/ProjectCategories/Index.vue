<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

defineOptions({ layout: AdminLayout });

defineProps<{
    categories: Array<{
        id: number;
        name: string;
        slug: string;
        description: string | null;
        sort_order: number;
        projects_count: number;
    }>;
}>();

function destroy(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
        router.delete(`/admin/project-categories/${id}`);
    }
}
</script>

<template>
    <div>
        <Head title="Project Categories" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Project Categories</h1>
                <p class="text-muted-foreground">
                    Manage categories for your projects.
                </p>
            </div>
            <Link href="/admin/project-categories/create">
                <Button>Add Category</Button>
            </Link>
        </div>

        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Sort Order</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="category in categories" :key="category.id">
                        <TableCell class="font-medium">{{ category.name }}</TableCell>
                        <TableCell>{{ category.slug }}</TableCell>
                        <TableCell>{{ category.sort_order }}</TableCell>
                        <TableCell>{{ category.projects_count }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Link :href="`/admin/project-categories/${category.id}/edit`">
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                                <Button variant="destructive" size="sm" @click="destroy(category.id)">Delete</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="categories.length === 0">
                        <TableCell colspan="5" class="text-center py-6 text-muted-foreground">
                            No categories found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>