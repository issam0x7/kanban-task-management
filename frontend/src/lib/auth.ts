import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session : {
      strategy : "jwt"
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         console.log("user : " + JSON.stringify(user) )
         return true
       },
        session({ session, token, user }) {
         console.log( "Session from Callback " + session)
            return session; // The return type will match the one returned in `useSession()`
        },
        
    },
};
