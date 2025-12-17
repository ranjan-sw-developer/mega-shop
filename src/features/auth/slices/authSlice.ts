import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthState {
    isOpen: boolean;
    mode: 'signin' | 'signup';
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isOpen: false,
    mode: 'signin',
    user: null,
    isLoading: false,
    error: null,
};

// Async Thunks
export const login = createAsyncThunk(
    'auth/login',
    async (data: any) => {
        const response = await authService.login(data);
        localStorage.setItem('token', response.token); // Persist token
        return response.user;
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (data: any) => {
        const response = await authService.signup(data);
        localStorage.setItem('token', response.token);
        return response.user;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openAuthModal: (state, action: PayloadAction<'signin' | 'signup'>) => {
            state.isOpen = true;
            state.mode = action.payload;
            state.error = null;
        },
        closeAuthModal: (state) => {
            state.isOpen = false;
            state.error = null;
        },
        switchMode: (state, action: PayloadAction<'signin' | 'signup'>) => {
            state.mode = action.payload;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isOpen = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            })
            // Signup
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isOpen = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Signup failed';
            });
    }
});

export const { openAuthModal, closeAuthModal, switchMode, clearError, logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
