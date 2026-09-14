<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

defineOptions({ layout: AdminLayout });

const props = defineProps<{
    certificate?: {
        id: number;
        name: string;
        issuer: string;
        issue_date: string;
        credential_id: string | null;
        credential_url: string | null;
        file_url?: string | null;
        sort_order: number;
    };
}>();

const isEditing = !!props.certificate;

const form = useForm({
    _method: isEditing ? 'put' : 'post',
    name: props.certificate?.name ?? '',
    issuer: props.certificate?.issuer ?? '',
    issue_date: props.certificate?.issue_date
        ? props.certificate.issue_date.split('T')[0]
        : '',
    credential_id: props.certificate?.credential_id ?? '',
    credential_url: props.certificate?.credential_url ?? '',
    file: null as File | null,
    sort_order: props.certificate?.sort_order ?? 0,
});

function submit() {
    if (isEditing) {
        form.post(`/admin/certificates/${props.certificate!.id}`);
    } else {
        form.post('/admin/certificates');
    }
}

function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        form.file = target.files[0];
    } else {
        form.file = null;
    }
}
</script>

<template>
    <Head :title="isEditing ? 'Edit Certificate' : 'Add Certificate'" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">
                {{ isEditing ? 'Edit Certificate' : 'Add Certificate' }}
            </h1>
            <Button variant="outline" as-child>
                <Link href="/admin/certificates">Back</Link>
            </Button>
        </div>

        <div class="bg-card rounded-md border p-6 shadow-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-2 md:col-span-2">
                        <Label for="name">Certificate Name</Label>
                        <Input id="name" v-model="form.name" required />
                        <p
                            v-if="form.errors.name"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="issuer">Issuing Organization</Label>
                        <Input id="issuer" v-model="form.issuer" required />
                        <p
                            v-if="form.errors.issuer"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.issuer }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="issue_date">Issue Date</Label>
                        <Input
                            id="issue_date"
                            type="date"
                            v-model="form.issue_date"
                            required
                        />
                        <p
                            v-if="form.errors.issue_date"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.issue_date }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="credential_id"
                            >Credential ID (Optional)</Label
                        >
                        <Input
                            id="credential_id"
                            v-model="form.credential_id"
                        />
                        <p
                            v-if="form.errors.credential_id"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.credential_id }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="credential_url"
                            >Credential URL (Optional)</Label
                        >
                        <Input
                            id="credential_url"
                            type="url"
                            v-model="form.credential_url"
                        />
                        <p
                            v-if="form.errors.credential_url"
                            class="text-destructive text-sm"
                        >
                            {{ form.errors.credential_url }}
                        </p>
                    </div>

                    <div class="space-y-2 md:col-span-2">
                        <Label for="file">Upload Certificate File (PDF/Image) (Optional)</Label>
                        <div class="flex items-center gap-4">
                            <input
                                id="file"
                                type="file"
                                @change="handleFileChange"
                                accept="application/pdf,image/*"
                                class="file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-sm file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
                            />
                            <a
                                v-if="props.certificate?.file_url"
                                :href="props.certificate.file_url"
                                target="_blank"
                                class="text-primary text-sm hover:underline"
                            >
                                View Current File
                            </a>
                        </div>
                        <p v-if="form.errors.file" class="text-destructive text-sm">
                            {{ form.errors.file }}
                        </p>
                    </div>
                </div>

                <div class="max-w-[200px] space-y-2">
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

                <div class="flex justify-end border-t pt-4">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving...' : 'Save Certificate' }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>
