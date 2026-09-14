<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, X } from '@lucide/vue';

const page = usePage();

const flash = computed(() => {
    const props = page.props as Record<string, any>;
    return {
        success: (props.flash?.success as string) ?? null,
        error: (props.flash?.error as string) ?? null,
    };
});

const visible = ref(false);
const currentMessage = ref('');
const currentType = ref<'success' | 'error'>('success');

watch(
    () => [flash.value.success, flash.value.error],
    ([success, error]) => {
        if (success) {
            currentMessage.value = success;
            currentType.value = 'success';
            visible.value = true;
            autoDismiss();
        } else if (error) {
            currentMessage.value = error;
            currentType.value = 'error';
            visible.value = true;
            autoDismiss();
        }
    },
    { immediate: true },
);

let timeout: ReturnType<typeof setTimeout>;

function autoDismiss() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        visible.value = false;
    }, 5000);
}

function dismiss() {
    clearTimeout(timeout);
    visible.value = false;
}
</script>

<template>
    <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-[-1rem] opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-[-1rem] opacity-0"
    >
        <div
            v-if="visible"
            class="fixed top-4 right-4 z-[100] w-full max-w-sm"
        >
            <Alert
                :variant="currentType === 'error' ? 'destructive' : 'default'"
                class="shadow-lg"
                :class="
                    currentType === 'success'
                        ? 'border-green-500/50 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
                        : ''
                "
            >
                <CheckCircle
                    v-if="currentType === 'success'"
                    class="h-4 w-4"
                />
                <XCircle v-else class="h-4 w-4" />
                <AlertDescription>
                    {{ currentMessage }}
                </AlertDescription>
                <button
                    class="absolute top-2 right-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
                    @click="dismiss"
                >
                    <X class="h-3 w-3" />
                </button>
            </Alert>
        </div>
    </Transition>
</template>
