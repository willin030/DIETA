import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { mockUser } from "@/constants/mockData";

// Get current user procedure
export default publicProcedure
  .input(
    z.object({
      token: z.string(),
    })
  )
  .query(async ({ input }) => {
    // In a real app, this would verify the token and return the user data
    // For demo purposes, we'll check if the token exists and return mock data
    if (input.token && input.token.startsWith("mock-jwt-token-")) {
      return {
        success: true,
        user: mockUser,
      };
    }

    // Invalid token
    throw new Error("Invalid or expired token");
  });