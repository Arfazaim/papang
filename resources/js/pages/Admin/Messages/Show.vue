<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    message: {
        id: number;
        name: string;
        email: string;
        subject: string;
        message: string;
        is_read: boolean;
        created_at: string;
    };
}>();

function destroy() {
    if (confirm('Are you sure you want to delete this message?')) {
        router.delete(`/admin/messages/${props.message.id}`);
    }
}

function formatDate(date: string) {
    return format(parseISO(date), 'MMMM d, yyyy HH:mm');
}
</script>

<template>
    <div>
        <Head :title="message.subject" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">View Message</h1>
                <p class="text-muted-foreground">
                    From: {{ message.name }} ({{ message.email }})
                </p>
            </div>
            <div class="flex items-center gap-2">
                <Link href="/admin/messages">
                    <Button variant="outline">Back to Inbox</Button>
                </Link>
                <Button variant="destructive" @click="destroy">Delete</Button>
            </div>
        </div>

        <div class="bg-card text-card-foreground rounded-md border shadow-sm">
            <div class="p-6">
                <div
                    class="mb-4 flex items-center justify-between border-b pb-4"
                >
                    <div>
                        <h2 class="text-lg font-semibold">
                            {{ message.subject }}
                        </h2>
                        <div class="text-muted-foreground mt-1 text-sm">
                            Received: {{ formatDate(message.created_at) }}
                        </div>
                    </div>
                    <a :href="`mailto:${message.email}`">
                        <Button>Reply via Email</Button>
                    </a>
                </div>

                <div class="mt-6 text-sm leading-relaxed whitespace-pre-wrap">
                    {{ message.message }}
                </div>
            </div>
        </div>
    </div>
</template>
