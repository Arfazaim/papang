<script setup lang="ts">
import { Head, Form } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

defineOptions({ layout: GuestLayout });

defineProps<{
    email: string;
    token: string;
}>();
</script>

<template>
    <div>
        <Head title="Reset Password" />

        <Card>
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                    Enter your new password below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    action="/reset-password"
                    method="post"
                    #default="{ errors, processing }"
                    class="space-y-4"
                >
                    <input type="hidden" name="token" :value="token" />

                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            :value="email"
                            required
                        />
                        <p v-if="errors.email" class="text-destructive text-sm">
                            {{ errors.email }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password">New Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autofocus
                        />
                        <p
                            v-if="errors.password"
                            class="text-destructive text-sm"
                        >
                            {{ errors.password }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password_confirmation"
                            >Confirm Password</Label
                        >
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                        />
                    </div>

                    <Button type="submit" class="w-full" :disabled="processing">
                        {{ processing ? 'Resetting...' : 'Reset Password' }}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    </div>
</template>
