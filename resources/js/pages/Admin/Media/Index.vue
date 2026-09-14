<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
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
            mediable_type: string | null;
            mediable_id: number | null;
        }>;
        links: any[];
    };
}>();

function destroy(id: number) {
    if (
        confirm(
            'Are you sure you want to delete this media file? It will be removed permanently.',
        )
    ) {
        router.delete(`/admin/media/${id}`, {
            preserveScroll: true,
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

const fileInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    file: null as File | null,
    alt_text: '',
});

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
        form.file = target.files[0];
    }
}

function submitUpload() {
    form.post('/admin/media', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            if (fileInput.value) {
                fileInput.value.value = '';
            }
        },
    });
}
</script>

<template>
    <div>
        <Head title="Media Library" />

        <div
            class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Media Library</h1>
                <p class="text-muted-foreground">
                    View and manage all uploaded media files.
                </p>
            </div>

            <form
                @submit.prevent="submitUpload"
                class="flex flex-col items-end gap-3 sm:flex-row sm:items-center"
            >
                <div class="flex items-center gap-2">
                    <input
                        type="file"
                        ref="fileInput"
                        @change="handleFileChange"
                        class="file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-sm file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
                        accept="image/*,application/pdf"
                        required
                    />
                </div>
                <div class="flex items-center gap-2">
                    <input
                        type="text"
                        v-model="form.alt_text"
                        placeholder="Alt Text (Optional)"
                        class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    />
                    <Button type="submit" :disabled="form.processing">
                        Upload
                    </Button>
                </div>
            </form>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            <div
                v-for="item in media.data"
                :key="item.id"
                class="group bg-card relative flex h-full flex-col overflow-hidden rounded-md border shadow-sm transition-shadow hover:shadow-md"
            >
                <div
                    class="bg-muted/50 relative flex aspect-square items-center justify-center overflow-hidden"
                >
                    <img
                        v-if="item.mime_type.startsWith('image/')"
                        :src="getMediaUrl(item.path)"
                        :alt="item.alt_text || item.original_name"
                        class="h-full w-full object-cover"
                    />
                    <ImageIcon v-else class="text-muted-foreground h-10 w-10" />

                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <Button
                            variant="destructive"
                            size="icon"
                            @click="destroy(item.id)"
                        >
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div class="flex flex-1 flex-col p-3 text-sm">
                    <div
                        class="mb-1 truncate font-medium"
                        :title="item.original_name"
                    >
                        {{ item.original_name }}
                    </div>
                    <div
                        class="text-muted-foreground mt-auto flex justify-between text-xs"
                    >
                        <span>{{ formatSize(item.size) }}</span>
                        <span>{{
                            item.mime_type.split('/')[1]?.toUpperCase() ||
                            'FILE'
                        }}</span>
                    </div>
                    <div
                        class="text-muted-foreground mt-1 truncate text-[10px]"
                    >
                        <template v-if="item.mediable_type">
                            Attached to:
                            {{ item.mediable_type.split('\\').pop() }} #{{
                                item.mediable_id
                            }}
                        </template>
                        <template v-else>Standalone</template>
                    </div>
                </div>
            </div>

            <div
                v-if="media.data.length === 0"
                class="bg-muted/10 text-muted-foreground col-span-full rounded-lg border border-dashed py-12 text-center"
            >
                <ImageIcon class="mx-auto mb-2 h-10 w-10 opacity-20" />
                No media files found.
            </div>
        </div>

        <!-- Pagination -->
        <div
            v-if="media.links.length > 3"
            class="mt-8 flex items-center justify-center gap-1"
        >
            <template v-for="(link, key) in media.links" :key="key">
                <Link
                    v-if="link.url"
                    :href="link.url"
                    class="hover:bg-muted rounded border px-3 py-1 text-sm"
                    :class="{
                        'bg-primary text-primary-foreground hover:bg-primary':
                            link.active,
                    }"
                    v-html="link.label"
                />
                <span
                    v-else
                    class="text-muted-foreground rounded border px-3 py-1 text-sm"
                    v-html="link.label"
                ></span>
            </template>
        </div>
    </div>
</template>
