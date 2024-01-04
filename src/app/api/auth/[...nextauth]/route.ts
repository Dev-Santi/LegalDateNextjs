import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Contraseña", type: "text" },
            },
            authorize(credentials, req) {
                const user = { id: "1", email: "santinakcfin@gmail.com", password: "123123" };
                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user;
            console.log(token);
            return token;
        },
        //session(){}
    },
});

export { handler as GET, handler as POST };
