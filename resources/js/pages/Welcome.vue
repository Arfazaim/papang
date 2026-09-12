<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';

defineOptions({ layout: AppLayout });
</script>

<template>
    <div>
        <Head title="Welcome" />

        <div
            class="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center py-12 text-center"
        >
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
                Hi, I'm Arfa
            </h1>
            <p
                class="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg sm:text-xl"
            >
                A Fullstack Developer passionate about building excellent
                software that improves the lives of those around me.
            </p>
            <div class="flex gap-4">
                <Link href="/projects">
                    <Button size="lg">View Projects</Button>
                </Link>
                <Link href="/contact">
                    <Button variant="outline" size="lg">Contact Me</Button>
                </Link>
            </div>
        </div>
    </div>
</template>
