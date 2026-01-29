export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const USERS_STORAGE_KEY = "copilot-users";
const CURRENT_USER_KEY = "copilot-current-user";

export function getAllUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    console.error("Error saving users");
  }
}

export function registerUser(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = getAllUsers();
  
  // Validate email format
  if (!email.includes("@")) {
    return { success: false, error: "Invalid email format" };
  }
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return { success: false, error: "Email already registered" };
  }
  
  // Check password length
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // In production, this should be hashed
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true };
}

export function loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }
  
  // Save current user to session
  setCurrentUser(user);
  
  return { success: true, user };
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch {
    console.error("Error saving current user");
  }
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
