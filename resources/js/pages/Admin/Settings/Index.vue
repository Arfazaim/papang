<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from '@lucide/vue';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    settings: Record<string, string>;
}>();

const form = useForm({
    site_name: props.settings.site_name || '',
    site_description: props.settings.site_description || '',
    contact_email: props.settings.contact_email || '',
    seo_keywords: props.settings.seo_keywords || '',
});

function submit() {
    form.post(route('admin.settings.store'), {
        preserveScroll: true,
    });
}
</script>

<template>
    <Head title="Site Settings" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">Site Settings</h1>
        </div>

        <div class="max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                
                <div class="space-y-2">
                    <Label for="site_name">Site Name</Label>
                    <Input id="site_name" v-model="form.site_name" placeholder="e.g. My Portfolio" />
                    <p v-if="form.errors.site_name" class="text-sm text-destructive">{{ form.errors.site_name }}</p>
                </div>

                <div class="space-y-2">
                    <Label for="site_description">Site Description</Label>
                    <Textarea id="site_description" v-model="form.site_description" placeholder="A short description of your site" rows="3" />
                    <p class="text-xs text-muted-foreground">Used for the hero section and SEO meta description.</p>
                    <p v-if="form.errors.site_description" class="text-sm text-destructive">{{ form.errors.site_description }}</p>
                </div>

                <div class="space-y-2">
                    <Label for="contact_email">Primary Contact Email</Label>
                    <Input id="contact_email" type="email" v-model="form.contact_email" placeholder="e.g. hello@example.com" />
                    <p v-if="form.errors.contact_email" class="text-sm text-destructive">{{ form.errors.contact_email }}</p>
                </div>

                <div class="space-y-2">
                    <Label for="seo_keywords">SEO Keywords</Label>
                    <Input id="seo_keywords" v-model="form.seo_keywords" placeholder="e.g. developer, portfolio, laravel" />
                    <p v-if="form.errors.seo_keywords" class="text-sm text-destructive">{{ form.errors.seo_keywords }}</p>
                </div>

                <div class="flex justify-end pt-4 border-t">
                    <Button type="submit" :disabled="form.processing">
                        <Save class="mr-2 h-4 w-4" />
                        {{ form.processing ? 'Saving...' : 'Save Settings' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>