export * from './auth';

export interface SocialLink {
    id: number;
    name: string;
    url: string;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}
