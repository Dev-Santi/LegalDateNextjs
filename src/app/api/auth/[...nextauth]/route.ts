import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Contraseña", type: "text" },
            },
            async authorize(credentials, req) {
                try {
                    await connectDB();

                    const userFound = await User.findOne({
                        email: credentials?.email,
                    }).select("+password");
                    if (!userFound) throw new Error("Crendenciales inválidas");

                    let matchPass;
                    if (credentials?.password) {
                        matchPass = await bcrypt.compare(
                            credentials?.password,
                            userFound.password
                        );
                    }

                    if (!matchPass) throw new Error("Crendenciales inválidas");

                    return userFound;
                } catch (e) {
                    console.log(e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user;

            return token;
        },
        session({ session, token }: { session: any; token: any }) {
            try {
                if (token.user) session.user = token.user;
                session.user.password = "";

                return session;
            } catch (e) {
                console.log(e);
                return session;
            }
        },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
