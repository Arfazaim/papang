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
        unreadMessages: number;
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
                    <p class="text-muted-foreground text-xs">
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
                    <p class="text-muted-foreground text-xs">
                        Technologies &amp; competencies
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    class="flex flex-row items-center justify-between pb-2"
                >
                    <CardDescription>Messages</CardDescription>
                    <span
                        v-if="stats.unreadMessages > 0"
                        class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs"
                    >
                        {{ stats.unreadMessages }}
                    </span>
                </CardHeader>
                <CardContent>
                    <CardTitle class="text-3xl">
                        {{ stats.totalMessages }}
                    </CardTitle>
                    <p class="text-muted-foreground mt-2 text-xs">
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
                    <p class="text-muted-foreground text-xs">
                        Work &amp; organization history
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
