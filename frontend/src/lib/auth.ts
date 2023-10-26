import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './db';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret : process.env.NEXTAUTH_SECRET,
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     console.log('user : ' + JSON.stringify(user));
        //     return true;
        // },
        session({ session, token, user }) {
          
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session; // The return type will match the one returned in `useSession()`
        },
        async jwt({ token, user }) {
              const client = await clientPromise;
              const db = client.db("kaban-tasks-db");

              const dbUser = await db.collection("users").findOne({
                email : token.email,
              });

              if (!dbUser) {
                  if (user) {
                      token.id = user?.id;
                  }
                  return token;
              }

              return {
                  id: dbUser._id.toString(),
                  name: dbUser.name,
                  email: dbUser.email,
                  picture: dbUser.image,
              };
        },
    },
    adapter: MongoDBAdapter(clientPromise, { databaseName: 'kaban-tasks-db' }),
};
