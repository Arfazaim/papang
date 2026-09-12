<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format, parseISO } from 'date-fns';

defineOptions({ layout: AdminLayout });

defineProps<{
    messages: {
        data: Array<{
            id: number;
            name: string;
            email: string;
            subject: string;
            is_read: boolean;
            created_at: string;
        }>;
        links: any[];
    };
}>();

function destroy(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
        router.delete(`/admin/messages/${id}`);
    }
}

function formatDate(date: string) {
    return format(parseISO(date), 'MMM d, yyyy HH:mm');
}
</script>

<template>
    <div>
        <Head title="Messages" />

        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Messages</h1>
                <p class="text-muted-foreground">
                    View and manage contact inquiries.
                </p>
            </div>
        </div>

        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="message in messages.data"
                        :key="message.id"
                        :class="{ 'bg-muted/30 font-medium': !message.is_read }"
                    >
                        <TableCell>
                            <Badge
                                :variant="
                                    message.is_read ? 'outline' : 'default'
                                "
                            >
                                {{ message.is_read ? 'Read' : 'New' }}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div>{{ message.name }}</div>
                            <div class="text-muted-foreground text-sm">
                                {{ message.email }}
                            </div>
                        </TableCell>
                        <TableCell>{{ message.subject }}</TableCell>
                        <TableCell>{{
                            formatDate(message.created_at)
                        }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <Link :href="`/admin/messages/${message.id}`">
                                    <Button variant="outline" size="sm"
                                        >View</Button
                                    >
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    @click="destroy(message.id)"
                                    >Delete</Button
                                >
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="messages.data.length === 0">
                        <TableCell
                            colspan="5"
                            class="text-muted-foreground py-6 text-center"
                        >
                            No messages found.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <!-- Pagination (Basic) -->
        <div
            v-if="messages.links.length > 3"
            class="mt-4 flex items-center justify-center gap-1"
        >
            <template v-for="(link, key) in messages.links" :key="key">
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
