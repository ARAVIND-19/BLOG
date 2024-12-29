/**
 * Configuration settings for the Minimal Blog application.
 * Replace the placeholder values with actual secure credentials.
 */
const CONFIG = {
  // Replace 'your-secure-password' with a strong, secure password for admin access.
  ADMIN_PASSWORD: 'hi', // Example: Use a password manager to generate a strong password.

  // Posts data
  POSTS: {
    1: {
      id: 1,
      key: "first-post",
      title: "First Post",
      date: "2023-10-01",
      summary: "This is the summary of the first post.",
      content: "This is the full content of the first post.",
      tags: ["intro", "welcome"],
      categories: ["General"]
    },
    2: {
      id: 2,
      key: "second-post",
      title: "Second Post",
      date: "2023-10-02",
      summary: "This is the summary of the second post.",
      content: "This is the full content of the second post.",
      tags: ["update"],
      categories: ["News"]
    }
  }
};

// Ensure the CONFIG object is not accidentally modified.
Object.freeze(CONFIG);