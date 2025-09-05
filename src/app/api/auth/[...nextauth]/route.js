import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Dummy banking profiles to assign to new OAuth users
const availableProfiles = [
  {
    firstName: "John",
    lastName: "Doe",
    accountNumber: "1001234567",
    balance: 5420.75,
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Main St, Springfield, IL 62701",
    accountType: "CHECKING",
    transactions: [
      {
        type: "CREDIT",
        amount: 3200.0,
        description: "Salary Deposit - TechCorp Inc.",
        category: "SALARY",
        balanceAfter: 5420.75,
        createdAt: new Date("2025-01-04T08:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 150.0,
        description: "Whole Foods Market",
        category: "GROCERY",
        balanceAfter: 2220.75,
        createdAt: new Date("2025-01-03T14:30:00Z"),
      },
      {
        type: "DEBIT",
        amount: 75.5,
        description: "Shell Gas Station",
        category: "TRANSPORT",
        balanceAfter: 2370.75,
        createdAt: new Date("2025-01-02T18:45:00Z"),
      },
      {
        type: "CREDIT",
        amount: 1000.0,
        description: "Transfer from Savings",
        category: "TRANSFER",
        balanceAfter: 2446.25,
        createdAt: new Date("2025-01-01T10:15:00Z"),
      },
    ],
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    accountNumber: "1001234568",
    balance: 8750.25,
    phoneNumber: "+1 (555) 987-6543",
    address: "456 Oak Avenue, Chicago, IL 60601",
    accountType: "SAVINGS",
    transactions: [
      {
        type: "CREDIT",
        amount: 4500.0,
        description: "Freelance Payment - Design Studio",
        category: "INCOME",
        balanceAfter: 8750.25,
        createdAt: new Date("2025-01-04T16:20:00Z"),
      },
      {
        type: "DEBIT",
        amount: 250.0,
        description: "Rent Payment",
        category: "HOUSING",
        balanceAfter: 4250.25,
        createdAt: new Date("2025-01-01T08:00:00Z"),
      },
      {
        type: "CREDIT",
        amount: 1200.0,
        description: "Investment Dividend",
        category: "INVESTMENT",
        balanceAfter: 4500.25,
        createdAt: new Date("2024-12-30T12:00:00Z"),
      },
    ],
  },
  {
    firstName: "Michael",
    lastName: "Chen",
    accountNumber: "1001234569",
    balance: 3250.8,
    phoneNumber: "+1 (555) 456-7890",
    address: "789 Pine Street, Austin, TX 78701",
    accountType: "CHECKING",
    transactions: [
      {
        type: "CREDIT",
        amount: 2800.0,
        description: "Consulting Payment",
        category: "INCOME",
        balanceAfter: 3250.8,
        createdAt: new Date("2025-01-03T11:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 120.0,
        description: "Utility Bill",
        category: "UTILITIES",
        balanceAfter: 450.8,
        createdAt: new Date("2025-01-02T09:30:00Z"),
      },
      {
        type: "DEBIT",
        amount: 45.99,
        description: "Amazon Purchase",
        category: "SHOPPING",
        balanceAfter: 570.8,
        createdAt: new Date("2025-01-01T15:20:00Z"),
      },
    ],
  },
  {
    firstName: "Emily",
    lastName: "Rodriguez",
    accountNumber: "1001234570",
    balance: 12450.0,
    phoneNumber: "+1 (555) 321-0987",
    address: "321 Maple Drive, Seattle, WA 98101",
    accountType: "PREMIUM",
    transactions: [
      {
        type: "CREDIT",
        amount: 8000.0,
        description: "Business Revenue",
        category: "BUSINESS",
        balanceAfter: 12450.0,
        createdAt: new Date("2025-01-04T14:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 500.0,
        description: "Business Expenses",
        category: "BUSINESS",
        balanceAfter: 4450.0,
        createdAt: new Date("2025-01-03T10:00:00Z"),
      },
      {
        type: "CREDIT",
        amount: 2000.0,
        description: "Investment Return",
        category: "INVESTMENT",
        balanceAfter: 4950.0,
        createdAt: new Date("2025-01-01T16:00:00Z"),
      },
    ],
  },
  {
    firstName: "Alex",
    lastName: "Thompson",
    accountNumber: "1001234571",
    balance: 2180.45,
    phoneNumber: "+1 (555) 654-3210",
    address: "654 Cedar Lane, Denver, CO 80201",
    accountType: "STUDENT",
    transactions: [
      {
        type: "CREDIT",
        amount: 1500.0,
        description: "Part-time Job Payment",
        category: "SALARY",
        balanceAfter: 2180.45,
        createdAt: new Date("2025-01-03T17:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 300.0,
        description: "Textbook Purchase",
        category: "EDUCATION",
        balanceAfter: 680.45,
        createdAt: new Date("2025-01-02T12:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 25.0,
        description: "Coffee Shop",
        category: "FOOD",
        balanceAfter: 980.45,
        createdAt: new Date("2025-01-01T08:30:00Z"),
      },
    ],
  },
];

// Function to assign a random available banking profile
async function assignBankingProfile(userId, userEmail, userName = null) {
  console.log(
    "🔍 assignBankingProfile called for:",
    userEmail,
    "userId:",
    userId,
    "userName:",
    userName
  );
  try {
    // Check if user already has a banking profile
    const existingProfile = await prisma.bankingProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      console.log("✅ User already has banking profile");
      return existingProfile;
    }

    console.log("🔍 Finding available profile...");

    // Pick a random dummy profile for banking data (balance, transactions, etc.)
    const randomProfile =
      availableProfiles[Math.floor(Math.random() * availableProfiles.length)];

    // Generate a new unique account number
    const newAccountNumber = `1001${
      Math.floor(Math.random() * 9000) + 1000
    }${Math.floor(Math.random() * 1000)}`;

    // Use real user's name or extract from email if name not provided
    let firstName = "User";
    let lastName = "Account";

    if (userName) {
      const nameParts = userName.split(" ");
      firstName = nameParts[0] || "User";
      lastName = nameParts.slice(1).join(" ") || "Account";
    } else if (userEmail) {
      // Extract first name from email if no name provided
      const emailName = userEmail.split("@")[0];
      firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      lastName = "Account";
    }

    // Create the banking profile and copy transactions
    const result = await prisma.$transaction(async (prisma) => {
      const bankingProfile = await prisma.bankingProfile.create({
        data: {
          userId,
          firstName,
          lastName,
          accountNumber: newAccountNumber,
          balance: randomProfile.balance,
          phoneNumber: randomProfile.phoneNumber,
          address: randomProfile.address,
          accountType: randomProfile.accountType,
          dateOfBirth: new Date("1990-01-01"),
        },
      });

      // Copy all transactions for this profile
      if (randomProfile.transactions && randomProfile.transactions.length > 0) {
        await prisma.transaction.createMany({
          data: randomProfile.transactions.map((transaction) => ({
            profileId: bankingProfile.id,
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            category: transaction.category,
            balanceAfter: transaction.balanceAfter,
            createdAt: transaction.createdAt,
          })),
        });
      }

      console.log(
        `🏦 Assigned realistic banking profile to ${userEmail}: ${firstName} ${lastName} (${
          randomProfile.accountType
        }) with ${randomProfile.transactions?.length || 0} transactions`
      );

      return bankingProfile;
    });

    return result;
  } catch (error) {
    console.error("Error assigning banking profile:", error);
    return null;
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demo purposes, check against the demo user
        if (
          credentials.email === "demo@example.com" &&
          credentials.password === "password123"
        ) {
          // Find or create banking profile for demo user
          let user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { bankingProfile: true },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "Demo User",
                emailVerified: new Date(),
              },
              include: { bankingProfile: true },
            });
          }

          if (!user.bankingProfile) {
            await assignBankingProfile(user.id, user.email, user.name);
            user = await prisma.user.findUnique({
              where: { email: credentials.email },
              include: { bankingProfile: true },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            bankingProfile: user.bankingProfile,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth users, ensure they have a banking profile
      if (account?.provider === "google") {
        console.log("🔍 OAuth signIn callback triggered for:", user.email);
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { bankingProfile: true },
          });

          console.log("🔍 Existing user found:", !!existingUser);
          console.log(
            "🔍 User has banking profile:",
            !!existingUser?.bankingProfile
          );

          if (existingUser && !existingUser.bankingProfile) {
            console.log("🏦 Assigning banking profile to user:", user.email);
            const bankingProfile = await assignBankingProfile(
              existingUser.id,
              existingUser.email,
              user.name
            );
            console.log("🏦 Banking profile assigned:", !!bankingProfile);
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Add banking profile data to token and ensure OAuth users have banking profiles
      if (account?.provider === "google" || user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email || user?.email },
          include: { bankingProfile: true },
        });

        // If user exists but has no banking profile, create one
        if (
          dbUser &&
          !dbUser.bankingProfile &&
          account?.provider === "google"
        ) {
          console.log(
            "🏦 Creating banking profile in JWT callback for:",
            dbUser.email
          );
          await assignBankingProfile(
            dbUser.id,
            dbUser.email,
            token.name || user?.name
          );

          // Refetch user with banking profile
          const updatedUser = await prisma.user.findUnique({
            where: { email: token.email || user?.email },
            include: { bankingProfile: true },
          });

          if (updatedUser?.bankingProfile) {
            token.bankingProfile = updatedUser.bankingProfile;
          }
        } else if (dbUser?.bankingProfile) {
          token.bankingProfile = dbUser.bankingProfile;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add banking profile to session
      if (token.bankingProfile) {
        session.user.bankingProfile = token.bankingProfile;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      if (isNewUser && account?.provider === "google") {
        console.log(`🎉 New OAuth user signed up: ${user.email}`);
        // Banking profile assignment is handled in signIn callback
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
