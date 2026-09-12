<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { Image as ImageIcon, Trash2 } from '@lucide/vue';

defineOptions({ layout: AdminLayout });

defineProps<{
    media: {
        data: Array<{
            id: number;
            filename: string;
            original_name: string;
            mime_type: string;
            size: number;
            disk: string;
            path: string;
            alt_text: string | null;
            created_at: string;
            mediable: any;
            mediable_type: string;
            mediable_id: number;
        }>;
        links: any[];
    };
}>();

function destroy(id: number) {
    if (confirm('Are you sure you want to delete this media file? It will be removed permanently.')) {
        router.delete(`/admin/media/${id}`, {
            preserveScroll: true
        });
    }
}

function formatSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getMediaUrl(path: string) {
    return `/storage/${path}`;
}
</script>

<template>
    <div>
        <Head title="Media Library" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Media Library</h1>
                <p class="text-muted-foreground">View and manage all uploaded media files.</p>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div v-for="item in media.data" :key="item.id" class="group relative rounded-md border bg-card overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                
                <div class="aspect-square bg-muted/50 flex items-center justify-center relative overflow-hidden">
                    <img v-if="item.mime_type.startsWith('image/')" :src="getMediaUrl(item.path)" :alt="item.alt_text || item.original_name" class="object-cover w-full h-full" />
                    <ImageIcon v-else class="h-10 w-10 text-muted-foreground" />
                    
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="destructive" size="icon" @click="destroy(item.id)">
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div class="p-3 text-sm flex-1 flex flex-col">
                    <div class="font-medium truncate mb-1" :title="item.original_name">{{ item.original_name }}</div>
                    <div class="text-xs text-muted-foreground mt-auto flex justify-between">
                        <span>{{ formatSize(item.size) }}</span>
                        <span>{{ item.mime_type.split('/')[1]?.toUpperCase() || 'FILE' }}</span>
                    </div>
                    <div class="text-[10px] text-muted-foreground mt-1 truncate">
                        Attached to: {{ item.mediable_type.split('\\').pop() }} #{{ item.mediable_id }}
                    </div>
                </div>
            </div>

            <div v-if="media.data.length === 0" class="col-span-full py-12 text-center border border-dashed rounded-lg bg-muted/10 text-muted-foreground">
                <ImageIcon class="h-10 w-10 mx-auto mb-2 opacity-20" />
                No media files found.
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="media.links.length > 3" class="mt-8 flex items-center justify-center gap-1">
            <template v-for="(link, key) in media.links" :key="key">
                <Link
                    v-if="link.url"
                    :href="link.url"
                    class="px-3 py-1 border rounded text-sm hover:bg-muted"
                    :class="{ 'bg-primary text-primary-foreground hover:bg-primary': link.active }"
                    v-html="link.label"
                />
                <span v-else class="px-3 py-1 border rounded text-sm text-muted-foreground" v-html="link.label"></span>
            </template>
        </div>
    </div>
</template>