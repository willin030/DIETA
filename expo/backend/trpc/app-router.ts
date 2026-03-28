import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import loginRoute from "./routes/auth/login";
import signupRoute from "./routes/auth/signup";
import meRoute from "./routes/auth/me";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  auth: createTRPCRouter({
    login: loginRoute,
    signup: signupRoute,
    me: meRoute,
  }),
});

export type AppRouter = typeof appRouter;