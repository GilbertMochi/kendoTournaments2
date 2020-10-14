import { Role } from './roles';

export class User {
    uid: number;
    email: string;
    role: Role;
    emailVerified:boolean;
}