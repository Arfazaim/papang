<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import FlashNotification from '@/components/FlashNotification.vue';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Home,
    User,
    FileText,
    LayoutGrid,
    Mail,
    Menu,
    LogOut,
    Settings
} from '@lucide/vue';

const page = usePage();
const user = computed(() => page.props.auth?.user);
const siteSettings = computed(
    () => (page.props.siteSettings as Record<string, string>) || {},
);
const socialLinks = computed(
    () => (page.props.socialLinks as Array<any>) || [],
);
const siteName = computed(
    () => siteSettings.value.site_name || 'My Portfolio',
);
const profileImage = computed(() => {
    // If we have an avatar setting we could use it, for now a placeholder or user avatar
    return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(siteName.value) + '&background=0D8ABC&color=fff&size=150';
});

const isMobileMenuOpen = ref(false);
const activeSection = ref('home');

const isHomePage = computed(() => page.url === '/' || page.url.startsWith('/#'));

const navigation = [
    { name: 'Home', href: isHomePage.value ? '#home' : '/#home', icon: Home, id: 'home' },
    { name: 'About', href: isHomePage.value ? '#about' : '/#about', icon: User, id: 'about' },
    { name: 'Resume', href: isHomePage.value ? '#resume' : '/#resume', icon: FileText, id: 'resume' },
    { name: 'Projects', href: isHomePage.value ? '#projects' : '/#projects', icon: LayoutGrid, id: 'projects' },
    { name: 'Contact', href: isHomePage.value ? '#contact' : '/#contact', icon: Mail, id: 'contact' },
];

function handleNavClick(e: Event, href: string, id: string) {
    if (isHomePage.value && href.startsWith('#')) {
        e.preventDefault();
        isMobileMenuOpen.value = false;
        const target = document.getElementById(id);
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    } else {
        isMobileMenuOpen.value = false;
    }
}

// Scroll spy for active navigation item
function onScroll() {
    if (!isHomePage.value) return;
    
    const sections = navigation.map(n => document.getElementById(n.id)).filter(Boolean);
    const scrollPosition = window.scrollY + 200; // offset
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
            activeSection.value = section.id;
            break;
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', onScroll);
    onScroll(); // initial check
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <div class="bg-background min-h-screen flex flex-col xl:flex-row">
        <FlashNotification />
        
        <!-- Mobile Header Toggle -->
        <div class="xl:hidden fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-sm border-b z-50 flex items-center justify-between px-4">
            <Link href="/" class="text-xl font-bold font-heading">{{ siteName }}</Link>
            
            <Sheet v-model:open="isMobileMenuOpen">
                <SheetTrigger as-child>
                    <Button variant="ghost" size="icon" class="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                        <Menu class="h-6 w-6" />
                        <span class="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" class="w-[300px] p-0 bg-slate-900 border-none text-slate-200">
                    <SheetTitle class="sr-only">Navigation</SheetTitle>
                    <SheetDescription class="sr-only">Site navigation menu</SheetDescription>
                    
                    <div class="h-full flex flex-col py-8 px-6 overflow-y-auto">
                        <div class="flex flex-col items-center mb-8">
                            <div class="w-28 h-28 rounded-full border-4 border-slate-700 overflow-hidden mb-4">
                                <img :src="profileImage" :alt="siteName" class="w-full h-full object-cover" />
                            </div>
                            <h1 class="text-2xl font-bold text-white font-heading text-center">{{ siteName }}</h1>
                            
                            <div class="flex gap-2 mt-4 flex-wrap justify-center">
                                <a
                                    v-for="social in socialLinks"
                                    :key="social.id"
                                    :href="social.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-primary transition-all duration-300"
                                >
                                    <!-- Use a generic icon or SVG from DB, for now let's just use text initial -->
                                    <span class="text-xs font-semibold">{{ social.name.charAt(0) }}</span>
                                </a>
                            </div>
                        </div>

                        <nav class="flex flex-col gap-2 flex-1">
                            <a
                                v-for="item in navigation"
                                :key="item.name"
                                :href="item.href"
                                @click="(e) => handleNavClick(e, item.href, item.id)"
                                class="flex items-center gap-3 px-4 py-3 rounded-full transition-all group"
                                :class="activeSection === item.id && isHomePage ? 'text-primary' : 'text-slate-400 hover:text-white'"
                            >
                                <component :is="item.icon" class="w-5 h-5 transition-colors" :class="activeSection === item.id && isHomePage ? 'text-primary' : 'text-slate-400 group-hover:text-primary'" />
                                <span>{{ item.name }}</span>
                            </a>
                        </nav>
                        
                        <div class="mt-auto pt-6 border-t border-slate-800">
                            <Link v-if="user" href="/admin" class="flex items-center gap-3 px-4 py-3 rounded-full text-slate-400 hover:text-white transition-all group">
                                <Settings class="w-5 h-5 group-hover:text-primary transition-colors" />
                                <span>Admin Dashboard</span>
                            </Link>
                            <Link v-else href="/login" class="flex items-center gap-3 px-4 py-3 rounded-full text-slate-400 hover:text-white transition-all group">
                                <User class="w-5 h-5 group-hover:text-primary transition-colors" />
                                <span>Login</span>
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        <!-- Desktop Sidebar -->
        <header class="hidden xl:flex flex-col w-[300px] fixed top-0 left-0 bottom-0 bg-[#040b14] text-slate-200 z-50 overflow-y-auto py-8 px-6 transition-all duration-300">
            <div class="flex flex-col items-center mb-10">
                <div class="w-32 h-32 rounded-full border-8 border-slate-800 overflow-hidden mb-4">
                    <img :src="profileImage" :alt="siteName" class="w-full h-full object-cover" />
                </div>
                <Link href="/"><h1 class="text-2xl font-bold text-white font-heading text-center hover:text-primary transition-colors">{{ siteName }}</h1></Link>
                
                <div class="flex gap-2 mt-5 flex-wrap justify-center">
                    <a
                        v-for="social in socialLinks"
                        :key="social.id"
                        :href="social.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-10 h-10 rounded-full bg-[#212431] flex items-center justify-center text-slate-300 hover:text-white hover:bg-primary hover:scale-110 transition-all duration-300"
                        :title="social.name"
                    >
                        <!-- For simplicity in this layout without fetching specific SVGs, we use first letter -->
                        <span class="text-sm font-semibold">{{ social.name.charAt(0) }}</span>
                    </a>
                </div>
            </div>

            <nav class="flex flex-col gap-1 flex-1">
                <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    @click="(e) => handleNavClick(e, item.href, item.id)"
                    class="flex items-center gap-3 px-4 py-3 rounded-full transition-all group"
                    :class="activeSection === item.id && isHomePage ? 'text-white' : 'text-slate-400 hover:text-white'"
                >
                    <component :is="item.icon" class="w-5 h-5 transition-colors" :class="activeSection === item.id && isHomePage ? 'text-primary' : 'text-[#a8a9b4] group-hover:text-primary'" />
                    <span>{{ item.name }}</span>
                </a>
            </nav>

            <div class="mt-8 pt-6 border-t border-[#141824]">
                <Link v-if="user" href="/admin" class="flex items-center gap-3 px-4 py-3 rounded-full text-slate-400 hover:text-white transition-all group">
                    <Settings class="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span>Admin</span>
                </Link>
                <Link v-else href="/login" class="flex items-center gap-3 px-4 py-3 rounded-full text-slate-400 hover:text-white transition-all group">
                    <User class="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span>Login</span>
                </Link>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 xl:ml-[300px] w-full pt-16 xl:pt-0 transition-all duration-300">
            <slot />
        </main>
        
        <!-- Back to top button could be added here in the future -->
    </div>
</template>
