<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';

defineOptions({ layout: AppLayout });

defineProps<{
    status: number;
}>();

const descriptions: Record<number, { title: string; message: string }> = {
    403: {
        title: 'Forbidden',
        message: 'Sorry, you are not authorized to access this page.',
    },
    404: {
        title: 'Page Not Found',
        message: 'Sorry, the page you are looking for could not be found.',
    },
    500: {
        title: 'Server Error',
        message: 'Whoops, something went wrong on our servers.',
    },
    503: {
        title: 'Service Unavailable',
        message: 'Sorry, we are doing some maintenance. Please check back soon.',
    },
};
</script>

<template>
    <div>
        <Head :title="descriptions[status]?.title || 'Error'" />

        <section class="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-20 text-center">
            <h1 class="text-primary text-8xl font-extrabold">{{ status }}</h1>
            <h2 class="mt-4 text-3xl font-bold">{{ descriptions[status]?.title || 'Error' }}</h2>
            <p class="text-muted-foreground mt-4 max-w-md text-lg">{{ descriptions[status]?.message || 'An unexpected error occurred.' }}</p>
            <Link href="/" class="mt-8">
                <Button size="lg">Go Back Home</Button>
            </Link>
        </section>
    </div>
</template>
