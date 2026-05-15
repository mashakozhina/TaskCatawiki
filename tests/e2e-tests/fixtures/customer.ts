export const existingUser = {
  email: "testuser@gmail.com",
  password: "Catawiki4321!",
};

export const generateUser = () => ({
  firstName: "Test",
  lastName: "User",
  email: `catawiki.test+${Date.now()}@mailinator.com`,
  password: "TestPass123!",
});
