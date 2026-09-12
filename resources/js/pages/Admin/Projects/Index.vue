<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    projects: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            status: string;
            is_featured: boolean;
            category: { name: string } | null;
            technologies_count: number;
        }>;
        links: any[];
    };
}>();

function destroy(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
        router.delete(`/admin/projects/${id}`);
    }
}
</script>

<template>
    <div>
        <Head title="Projects" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Projects</h1>
                <p class="text-muted-foreground">
                    Manage your portfolio projects.
                </p>
            </div>
            <Link href="/admin/projects/create">
                <Button>Add Project</Button>
            </Link>
        </div>

        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tech Count</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="project in projects.data" :key="project.id">
                        <TableCell class="font-medium">
                            <div class="flex items-center gap-2">
                                {{ project.title }}
                                <Badge v-if="project.is_featured" variant="secondary">Featured</Badge>
                            </div>
                        </TableCell>
                        <TableCell>{{ project.category?.name || 'Uncategorized' }}</TableCell>
                        <TableCell>
                            <Badge :variant="project.status === 'published' ? 'default' : 'outline'">
                                {{ project.status }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ project.technologies_count }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Link :href="`/admin/projects/${project.id}/edit`">
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                                <Button variant="destructive" size="sm" @click="destroy(project.id)">Delete</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="projects.data.length === 0">
                        <TableCell colspan="5" class="text-center py-6 text-muted-foreground">
                            No projects found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        
        <!-- Very basic pagination, should use proper component later -->
        <div class="mt-4 flex gap-1" v-if="projects.links.length > 3">
            <template v-for="(link, k) in projects.links" :key="k">
                <Link v-if="link.url" :href="link.url">
                    <Button :variant="link.active ? 'default' : 'outline'" size="sm" v-html="link.label"></Button>
                </Link>
                <span v-else class="px-3 py-2 text-sm text-muted-foreground" v-html="link.label"></span>
            </template>
        </div>
    </div>
</template>