export function generateRandomString(prefix: string): string {
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${random}`;
}

export function generateRandomEmail(): string {
  const random = Math.random().toString(36).substring(2, 8);
  return `testuser_${random}@mailinator.com`;
}