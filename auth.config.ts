import type { NextAuthConfig } from "next-auth";

//You can use the pages option to specify the route for custom sign-in, sign-out, and error pages. It is not required, but if you don't provide it, NextAuth.js will use its default sign-in, sign-out, and error pages. By adding signIn: '/login' into our pages option, the user will be redirected to our custom login page, rather than the NextAuth.js default page.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
};
