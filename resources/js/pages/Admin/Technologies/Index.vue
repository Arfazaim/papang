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
    technologies: Array<{
        id: number;
        name: string;
        slug: string;
        icon: string | null;
        color: string | null;
        projects_count: number;
    }>;
}>();

function destroy(id: number) {
    if (confirm('Are you sure you want to delete this technology?')) {
        router.delete(`/admin/technologies/${id}`);
    }
}
</script>

<template>
    <div>
        <Head title="Technologies" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Technologies</h1>
                <p class="text-muted-foreground">
                    Manage technologies used in your projects.
                </p>
            </div>
            <Link href="/admin/technologies/create">
                <Button>Add Technology</Button>
            </Link>
        </div>

        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="tech in technologies" :key="tech.id">
                        <TableCell class="flex items-center gap-2 font-medium">
                            <span
                                v-if="tech.color"
                                class="h-3 w-3 rounded-full"
                                :style="{ backgroundColor: tech.color }"
                            ></span>
                            {{ tech.name }}
                        </TableCell>
                        <TableCell>{{ tech.slug }}</TableCell>
                        <TableCell>{{ tech.color }}</TableCell>
                        <TableCell>{{ tech.projects_count }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Link
                                    :href="`/admin/technologies/${tech.id}/edit`"
                                >
                                    <Button variant="outline" size="sm"
                                        >Edit</Button
                                    >
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    @click="destroy(tech.id)"
                                    >Delete</Button
                                >
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="technologies.length === 0">
                        <TableCell
                            colspan="5"
                            class="text-muted-foreground py-6 text-center"
                        >
                            No technologies found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
