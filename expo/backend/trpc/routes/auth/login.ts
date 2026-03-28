import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { mockUser } from "@/constants/mockData";

// Login input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default publicProcedure
  .input(loginSchema)
  .mutation(async ({ input }) => {
    // In a real app, this would verify credentials against a database
    // For demo purposes, we'll accept any email that contains "aa"
    if (input.email.includes("aa")) {
      return {
        success: true,
        token: "mock-jwt-token-" + Date.now(),
        user: {
          ...mockUser,
          email: input.email,
        },
      };
    }

    // Authentication failed
    throw new Error("Invalid email or password");
  });