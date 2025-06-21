

// src/user/user.entity.ts
export class User {
  id: number;
  username: string;
  password: string; // Plain for now, hash in real-world use
  role: 'admin' | 'reviewer' | 'dataentry';
  createdAt: Date;
  fullName: string;
}
