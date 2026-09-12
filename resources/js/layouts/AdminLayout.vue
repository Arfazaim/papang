<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    LayoutDashboard,
    Folder,
    Zap,
    Briefcase,
    GraduationCap,
    Award,
    Mail,
    ImageIcon,
    Settings,
    Menu,
    Link2,
} from '@lucide/vue';

const page = usePage();
const user = computed(() => page.props.auth?.user);
const isSidebarOpen = ref(true);

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Folder },
    { name: 'Categories', href: '/admin/project-categories', icon: Folder },
    { name: 'Technologies', href: '/admin/technologies', icon: Zap },
    { name: 'Skills', href: '/admin/skills', icon: Zap },
    { name: 'Experiences', href: '/admin/experiences', icon: Briefcase },
    { name: 'Educations', href: '/admin/educations', icon: GraduationCap },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Media', href: '/admin/media', icon: ImageIcon },
    { name: 'Social Links', href: '/admin/social-links', icon: Link2 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

function isActive(href: string): boolean {
    const currentPath = page.url;
    if (href === '/admin') {
        return currentPath === '/admin';
    }
    return currentPath.startsWith(href);
}
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Top Bar -->
        <header class="sticky top-0 z-50 border-b border-border bg-background">
            <div class="flex h-14 items-center gap-4 px-4 lg:px-6">
                <Button variant="ghost" size="icon" class="lg:hidden" @click="isSidebarOpen = !isSidebarOpen">
                    <Menu class="h-5 w-5" />
                </Button>

                <Link href="/admin" class="text-lg font-bold tracking-tight">ARFA.DEV</Link>
                <span class="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Admin</span>

                <div class="ml-auto flex items-center gap-2">
                    <Link href="/" class="text-sm text-muted-foreground hover:text-foreground">View Site</Link>
                    <Separator orientation="vertical" class="h-6" />
                    <span class="text-sm text-muted-foreground">{{ user?.name }}</span>
                    <Link href="/logout" method="post" as="button">
                        <Button variant="ghost" size="sm">Logout</Button>
                    </Link>
                </div>
            </div>
        </header>

        <div class="flex">
            <!-- Sidebar -->
            <aside
                class="fixed inset-y-0 left-0 z-40 mt-14 w-64 border-r border-border bg-background transition-transform lg:translate-x-0"
                :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
            >
                <nav class="flex flex-col gap-1 p-4">
                    <Link
                        v-for="item in navigation"
                        :key="item.name"
                        :href="item.href"
                        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                        :class="isActive(item.href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'"
                    >
                        <component :is="item.icon" class="h-4 w-4" />
                        {{ item.name }}
                    </Link>
                </nav>
            </aside>

            <!-- Overlay for mobile -->
            <div
                v-if="isSidebarOpen"
                class="fixed inset-0 z-30 bg-black/50 lg:hidden"
                @click="isSidebarOpen = false"
            />

            <!-- Main Content -->
            <main class="min-h-[calc(100vh-3.5rem)] flex-1 lg:ml-64">
                <div class="p-4 lg:p-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
