export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  gender: string;
  avatarUrl: string;
  streetAddress: string;
  district: string;
  city: string;
  country: string;
  role?: Role;
}