<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center justify-center bg-background p-4"
    >
        <div class="w-full max-w-md">
            <div class="mb-8 text-center">
                <Link href="/" class="inline-block">
                    <h1 class="text-2xl font-bold tracking-tight">ARFA.DEV</h1>
                </Link>
            </div>
            <slot />
        </div>
    </div>
</template>
