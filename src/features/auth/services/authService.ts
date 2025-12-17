import { User } from '@/features/auth/types';

interface AuthResponse {
    user: User;
    token: string;
}

export const authService = {
    signup: async (data: any): Promise<AuthResponse> => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.error || 'Signup failed');
        }
        return json;
    },

    login: async (data: any): Promise<AuthResponse> => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.error || 'Login failed');
        }
        return json;
    }
};
