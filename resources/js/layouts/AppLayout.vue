<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import FlashNotification from '@/components/FlashNotification.vue';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const page = usePage();
const user = computed(() => page.props.auth?.user);
const isMobileMenuOpen = ref(false);

const navigation = [
    { name: 'Home', href: '/#home' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Resume', href: '/#resume' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
];

function isActive(href: string): boolean {
    const currentPath = page.url;
    // Basic fallback for anchor links; client-side observers are better for scroll spy.
    if (href === '/#home') return currentPath === '/';
    return false;
}
</script>

<template>
    <div class="bg-background min-h-screen">
        <FlashNotification />
        <header
            class="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm"
        >
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <Link href="/" class="text-xl font-bold tracking-tight"
                        >ARFA.DEV</Link
                    >

                    <nav class="hidden items-center gap-1 md:flex">
                        <Link
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            :class="
                                isActive(item.href)
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground'
                            "
                        >
                            {{ item.name }}
                        </Link>
                    </nav>

                    <div class="hidden items-center gap-2 md:flex">
                        <Link v-if="user" href="/admin">
                            <Button variant="outline" size="sm">Admin</Button>
                        </Link>
                        <Link v-else href="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                    </div>

                    <Sheet v-model:open="isMobileMenuOpen">
                        <SheetTrigger as-child>
                            <Button
                                variant="ghost"
                                size="icon"
                                class="md:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="4" x2="20" y1="12" y2="12" />
                                    <line x1="4" x2="20" y1="6" y2="6" />
                                    <line x1="4" x2="20" y1="18" y2="18" />
                                </svg>
                                <span class="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" class="w-72">
                            <SheetTitle class="text-lg font-bold"
                                >Navigation</SheetTitle
                            >
                            <SheetDescription class="sr-only"
                                >Site navigation menu</SheetDescription
                            >
                            <nav class="mt-6 flex flex-col gap-1">
                                <Link
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :href="item.href"
                                    class="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors"
                                    :class="
                                        isActive(item.href)
                                            ? 'bg-accent text-accent-foreground'
                                            : 'text-muted-foreground'
                                    "
                                    @click="isMobileMenuOpen = false"
                                >
                                    {{ item.name }}
                                </Link>
                                <div class="border-border my-2 border-t" />
                                <Link
                                    :href="user ? '/admin' : '/login'"
                                    class="text-muted-foreground hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors"
                                    @click="isMobileMenuOpen = false"
                                >
                                    {{ user ? 'Admin Dashboard' : 'Login' }}
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>

        <main>
            <slot />
        </main>

        <footer class="border-border bg-background border-t">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div
                    class="flex flex-col items-center justify-between gap-4 md:flex-row"
                >
                    <p class="text-muted-foreground text-sm">
                        &copy; {{ new Date().getFullYear() }} ARFA.DEV. All
                        rights reserved.
                    </p>
                    <div class="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
