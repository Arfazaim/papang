<script setup lang="ts">
import { Head, Form, Link } from '@inertiajs/vue3';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

defineOptions({ layout: GuestLayout });

defineProps<{
    status?: string;
}>();
</script>

<template>
    <div>
        <Head title="Forgot Password" />

        <Card>
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email address and we'll send you a password reset
                    link.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert v-if="status" variant="default" class="mb-4">
                    <AlertDescription>{{ status }}</AlertDescription>
                </Alert>

                <Form
                    action="/forgot-password"
                    method="post"
                    #default="{ errors, processing }"
                    class="space-y-4"
                >
                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@example.com"
                            required
                            autofocus
                        />
                        <p v-if="errors.email" class="text-destructive text-sm">
                            {{ errors.email }}
                        </p>
                    </div>

                    <Button type="submit" class="w-full" :disabled="processing">
                        {{ processing ? 'Sending...' : 'Send Reset Link' }}
                    </Button>
                </Form>

                <div class="mt-4 text-center">
                    <Link
                        href="/login"
                        class="text-muted-foreground hover:text-foreground text-sm"
                    >
                        Back to login
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
