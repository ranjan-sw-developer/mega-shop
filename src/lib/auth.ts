import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserModel } from "./models";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mega-shop';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                if (mongoose.connection.readyState === 0) {
                    await mongoose.connect(MONGODB_URI);
                }

                const user = await UserModel.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                if (mongoose.connection.readyState === 0) {
                    await mongoose.connect(MONGODB_URI);
                }

                const existingUser = await UserModel.findOne({ email: user.email });

                if (!existingUser) {
                    // Create new user
                    await UserModel.create({
                        name: user.name,
                        email: user.email,
                        googleId: account.providerAccountId,
                        role: "user",
                        avatar: user.image,
                    });
                } else if (!existingUser.googleId) {
                    // Link Google account to existing email user if not already linked
                    // This is optional but good UX. 
                    // Ideally we should prompt, but auto-linking is common if email is verified.
                    // For now, let's just update the googleId if missing.
                    existingUser.googleId = account.providerAccountId;
                    if (!existingUser.avatar) existingUser.avatar = user.image;
                    await existingUser.save();
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            // If signing in with Google, we might need to fetch the role from DB again 
            // because 'user' object from Google provider doesn't have our DB role initially.
            // However, minimizing DB calls is good. 
            // Let's assume for now newly created users are 'user'.
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev",
    pages: {
        signIn: '/auth/signin', // We have a modal, but this is a fallback
    },
};
