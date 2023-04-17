export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
}
