<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { Form } from '@inertiajs/vue3';
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
import { Link } from '@inertiajs/vue3';

defineOptions({ layout: GuestLayout });

defineProps<{
    status?: string;
}>();
</script>

<template>
    <div>
        <Head title="Login" />

        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Sign in to access the admin dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert v-if="status" variant="default" class="mb-4">
                    <AlertDescription>{{ status }}</AlertDescription>
                </Alert>

                <Form
                    action="/login"
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
                        <p v-if="errors.email" class="text-sm text-destructive">
                            {{ errors.email }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <Label for="password">Password</Label>
                            <Link
                                href="/forgot-password"
                                class="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                        <p v-if="errors.password" class="text-sm text-destructive">
                            {{ errors.password }}
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            class="rounded border-input"
                        />
                        <Label for="remember" class="text-sm font-normal">
                            Remember me
                        </Label>
                    </div>

                    <Button type="submit" class="w-full" :disabled="processing">
                        {{ processing ? 'Signing in...' : 'Sign in' }}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    </div>
</template>
