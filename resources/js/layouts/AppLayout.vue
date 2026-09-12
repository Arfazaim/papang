<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
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
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

function isActive(href: string): boolean {
    const currentPath = page.url;
    if (href === '/') {
        return currentPath === '/';
    }
    return currentPath.startsWith(href);
}
</script>

<template>
    <div class="min-h-screen bg-background">
        <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <Link href="/" class="text-xl font-bold tracking-tight">ARFA.DEV</Link>

                    <nav class="hidden items-center gap-1 md:flex">
                        <Link
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            :class="isActive(item.href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'"
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
                            <Button variant="ghost" size="icon" class="md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="4" x2="20" y1="12" y2="12" />
                                    <line x1="4" x2="20" y1="6" y2="6" />
                                    <line x1="4" x2="20" y1="18" y2="18" />
                                </svg>
                                <span class="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" class="w-72">
                            <SheetTitle class="text-lg font-bold">Navigation</SheetTitle>
                            <SheetDescription class="sr-only">Site navigation menu</SheetDescription>
                            <nav class="mt-6 flex flex-col gap-1">
                                <Link
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :href="item.href"
                                    class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                                    :class="isActive(item.href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'"
                                    @click="isMobileMenuOpen = false"
                                >
                                    {{ item.name }}
                                </Link>
                                <div class="my-2 border-t border-border" />
                                <Link
                                    :href="user ? '/admin' : '/login'"
                                    class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
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

        <footer class="border-t border-border bg-background">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p class="text-sm text-muted-foreground">
                        &copy; {{ new Date().getFullYear() }} ARFA.DEV. All rights reserved.
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-muted-foreground transition-colors hover:text-foreground">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
