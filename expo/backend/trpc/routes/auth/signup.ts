import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { mockUser } from "@/constants/mockData";

// Signup input validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default publicProcedure
  .input(signupSchema)
  .mutation(async ({ input }) => {
    // In a real app, this would create a new user in the database
    // For demo purposes, we'll always succeed
    return {
      success: true,
      token: "mock-jwt-token-" + Date.now(),
      user: {
        ...mockUser,
        name: input.name,
        email: input.email,
      },
    };
  });