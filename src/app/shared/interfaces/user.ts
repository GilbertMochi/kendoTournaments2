import { Role } from './roles';

export interface User {
    uid: string;
    email: string;
    role: Role;
}