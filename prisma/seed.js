const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dummyProfiles = [
  {
    email: "john.doe@email.com",
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
        createdAt: new Date("2025-09-04T08:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 150.0,
        description: "Whole Foods Market",
        category: "GROCERY",
        balanceAfter: 2220.75,
        createdAt: new Date("2025-09-03T14:30:00Z"),
      },
      {
        type: "DEBIT",
        amount: 75.5,
        description: "Shell Gas Station",
        category: "TRANSPORT",
        balanceAfter: 2370.75,
        createdAt: new Date("2025-09-02T18:45:00Z"),
      },
      {
        type: "CREDIT",
        amount: 1000.0,
        description: "Transfer from Savings",
        category: "TRANSFER",
        balanceAfter: 2446.25,
        createdAt: new Date("2025-09-01T10:15:00Z"),
      },
      {
        type: "DEBIT",
        amount: 89.99,
        description: "Netflix Subscription",
        category: "ENTERTAINMENT",
        balanceAfter: 1446.25,
        createdAt: new Date("2025-08-31T09:00:00Z"),
      },
    ],
  },
  {
    email: "sarah.wilson@email.com",
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
        createdAt: new Date("2025-09-04T16:20:00Z"),
      },
      {
        type: "DEBIT",
        amount: 250.0,
        description: "Rent Payment",
        category: "HOUSING",
        balanceAfter: 4250.25,
        createdAt: new Date("2025-09-01T08:00:00Z"),
      },
      {
        type: "CREDIT",
        amount: 1200.0,
        description: "Investment Dividend",
        category: "INVESTMENT",
        balanceAfter: 4500.25,
        createdAt: new Date("2025-08-30T12:00:00Z"),
      },
    ],
  },
  {
    email: "michael.chen@email.com",
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
        description: "Salary Deposit - StartupXYZ",
        category: "SALARY",
        balanceAfter: 3250.8,
        createdAt: new Date("2025-09-04T09:30:00Z"),
      },
      {
        type: "DEBIT",
        amount: 45.99,
        description: "Amazon Purchase",
        category: "SHOPPING",
        balanceAfter: 450.8,
        createdAt: new Date("2025-09-03T20:15:00Z"),
      },
      {
        type: "DEBIT",
        amount: 120.0,
        description: "Electricity Bill",
        category: "UTILITIES",
        balanceAfter: 496.79,
        createdAt: new Date("2025-09-02T11:00:00Z"),
      },
    ],
  },
  {
    email: "emily.rodriguez@email.com",
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
        amount: 6500.0,
        description: "Consulting Payment - Fortune 500",
        category: "CONSULTING",
        balanceAfter: 12450.0,
        createdAt: new Date("2025-09-04T14:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 1200.0,
        description: "Mortgage Payment",
        category: "HOUSING",
        balanceAfter: 5950.0,
        createdAt: new Date("2025-09-01T07:30:00Z"),
      },
      {
        type: "CREDIT",
        amount: 850.0,
        description: "Stock Sale Profit",
        category: "INVESTMENT",
        balanceAfter: 7150.0,
        createdAt: new Date("2025-08-29T15:45:00Z"),
      },
    ],
  },
  {
    email: "alex.thompson@email.com",
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
        description: "Part-time Job - Campus Bookstore",
        category: "PART_TIME",
        balanceAfter: 2180.45,
        createdAt: new Date("2025-09-04T17:00:00Z"),
      },
      {
        type: "DEBIT",
        amount: 35.0,
        description: "Coffee Shop",
        category: "FOOD",
        balanceAfter: 680.45,
        createdAt: new Date("2025-09-03T08:30:00Z"),
      },
      {
        type: "DEBIT",
        amount: 250.0,
        description: "Textbook Purchase",
        category: "EDUCATION",
        balanceAfter: 715.45,
        createdAt: new Date("2025-09-01T13:20:00Z"),
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database with dummy banking profiles...");

  for (const profile of dummyProfiles) {
    const { transactions, ...profileData } = profile;

    // Create user first
    const user = await prisma.user.create({
      data: {
        email: profile.email,
        name: `${profile.firstName} ${profile.lastName}`,
        emailVerified: new Date(),
      },
    });

    // Create banking profile
    const bankingProfile = await prisma.bankingProfile.create({
      data: {
        userId: user.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        accountNumber: profileData.accountNumber,
        balance: profileData.balance,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        accountType: profileData.accountType,
        dateOfBirth: new Date("1990-01-01"), // Default DOB
      },
    });

    // Create transactions
    for (const transaction of transactions) {
      await prisma.transaction.create({
        data: {
          profileId: bankingProfile.id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          category: transaction.category,
          balanceAfter: transaction.balanceAfter,
          createdAt: transaction.createdAt,
        },
      });
    }

    console.log(
      `✅ Created profile for ${profile.firstName} ${profile.lastName} (${profile.email})`
    );
  }

  console.log("🎉 Database seeded successfully!");
  console.log("\n📊 Available test accounts:");
  console.log(
    "When you sign in with Google OAuth, you'll be randomly assigned one of these banking profiles:"
  );

  for (const profile of dummyProfiles) {
    console.log(
      `- ${profile.firstName} ${profile.lastName} (${
        profile.accountType
      }): $${profile.balance.toLocaleString()}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = { dummyProfiles };
