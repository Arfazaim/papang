<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

defineOptions({ layout: AdminLayout });

defineProps<{
    stats: {
        totalProjects: number;
        totalSkills: number;
        totalMessages: number;
        totalExperiences: number;
    };
}>();
</script>

<template>
    <div>
        <Head title="Admin Dashboard" />

        <div class="mb-6">
            <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p class="text-muted-foreground">
                Welcome back! Here's an overview of your portfolio.
            </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader class="pb-2">
                    <CardDescription>Total Projects</CardDescription>
                    <CardTitle class="text-3xl">
                        {{ stats.totalProjects }}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xs text-muted-foreground">
                        Manage your portfolio projects
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2">
                    <CardDescription>Total Skills</CardDescription>
                    <CardTitle class="text-3xl">
                        {{ stats.totalSkills }}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xs text-muted-foreground">
                        Technologies &amp; competencies
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2">
                    <CardDescription>Messages</CardDescription>
                    <CardTitle class="text-3xl">
                        {{ stats.totalMessages }}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xs text-muted-foreground">
                        Contact form submissions
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2">
                    <CardDescription>Experiences</CardDescription>
                    <CardTitle class="text-3xl">
                        {{ stats.totalExperiences }}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xs text-muted-foreground">
                        Work &amp; organization history
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
