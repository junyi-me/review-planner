import bcrypt from 'bcrypt';

// Set the cost factor (higher is more secure but slower)
const SALT_ROUNDS = 10;

// Function to hash a password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Function to verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

