<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Star } from '@lucide/vue';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    skills: Array<{
        id: number;
        name: string;
        category_name: string;
        level: number;
        is_featured: boolean;
        sort_order: number;
    }>;
}>();

const deleteForm = useForm({});

function deleteSkill(id: number) {
    if (confirm('Are you sure you want to delete this skill?')) {
        deleteForm.delete(`/admin/skills/${id}`);
    }
}
</script>

<template>
    <Head title="Skills" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">Skills</h1>
            <Button as-child>
                <Link href="/admin/skills/create">
                    <Plus class="mr-2 h-4 w-4" /> Add Skill
                </Link>
            </Button>
        </div>

        <div class="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Skill Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Sort Order</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="skill in skills" :key="skill.id">
                        <TableCell class="font-medium">
                            <div class="flex items-center gap-2">
                                {{ skill.name }}
                                <Star v-if="skill.is_featured" class="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </div>
                        </TableCell>
                        <TableCell>{{ skill.category_name }}</TableCell>
                        <TableCell>
                            <div class="flex items-center gap-2">
                                <div class="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                                    <div class="h-full bg-primary" :style="{ width: `${skill.level}%` }"></div>
                                </div>
                                <span class="text-xs text-muted-foreground">{{ skill.level }}%</span>
                            </div>
                        </TableCell>
                        <TableCell>{{ skill.sort_order }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Button variant="outline" size="icon" as-child>
                                    <Link :href="`/admin/skills/${skill.id}/edit`">
                                        <Pencil class="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" @click="deleteSkill(skill.id)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="skills.length === 0">
                        <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                            No skills found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>