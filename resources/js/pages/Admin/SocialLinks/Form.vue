<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from '@lucide/vue';
import { AppModelsSocialLink } from '@/actions';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    link?: AppModelsSocialLink;
}>();

const isEditing = !!props.link;

const form = useForm({
    name: props.link?.name ?? '',
    url: props.link?.url ?? '',
    icon: props.link?.icon ?? '',
    sort_order: props.link?.sort_order ?? 0,
    is_active: props.link?.is_active ?? true,
});

function submit() {
    if (isEditing) {
        form.put(`/admin/social-links/${props.link!.id}`);
    } else {
        form.post('/admin/social-links');
    }
}
</script>

<template>
    <Head :title="isEditing ? 'Edit Social Link' : 'Add Social Link'" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
            <Button variant="outline" size="icon" as-child>
                <Link href="/admin/social-links">
                    <ArrowLeft class="h-4 w-4" />
                </Link>
            </Button>
            <h1 class="text-3xl font-bold tracking-tight">
                {{ isEditing ? 'Edit Social Link' : 'Add Social Link' }}
            </h1>
        </div>

        <div class="bg-card max-w-2xl rounded-xl border p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="space-y-2">
                    <Label for="name">Platform Name</Label>
                    <Input
                        id="name"
                        v-model="form.name"
                        placeholder="e.g. GitHub"
                    />
                    <p v-if="form.errors.name" class="text-destructive text-sm">
                        {{ form.errors.name }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="url">URL</Label>
                    <Input
                        id="url"
                        type="url"
                        v-model="form.url"
                        placeholder="e.g. https://github.com/username"
                    />
                    <p v-if="form.errors.url" class="text-destructive text-sm">
                        {{ form.errors.url }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="icon">Icon Identifier (Optional)</Label>
                    <Input
                        id="icon"
                        v-model="form.icon"
                        placeholder="e.g. github, twitter, linkedin"
                    />
                    <p class="text-muted-foreground text-xs">
                        Used to map specific SVGs in the frontend.
                    </p>
                    <p v-if="form.errors.icon" class="text-destructive text-sm">
                        {{ form.errors.icon }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="sort_order">Sort Order</Label>
                    <Input
                        id="sort_order"
                        type="number"
                        v-model="form.sort_order"
                    />
                    <p
                        v-if="form.errors.sort_order"
                        class="text-destructive text-sm"
                    >
                        {{ form.errors.sort_order }}
                    </p>
                </div>

                <div class="flex items-center space-x-2">
                    <Checkbox
                        id="is_active"
                        :checked="form.is_active"
                        @update:checked="form.is_active = $event"
                    />
                    <Label
                        for="is_active"
                        class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Active (Visible to public)
                    </Label>
                </div>
                <p
                    v-if="form.errors.is_active"
                    class="text-destructive text-sm"
                >
                    {{ form.errors.is_active }}
                </p>

                <div class="flex justify-end border-t pt-4">
                    <Button type="submit" :disabled="form.processing">
                        <Save class="mr-2 h-4 w-4" />
                        {{ isEditing ? 'Update Link' : 'Save Link' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
