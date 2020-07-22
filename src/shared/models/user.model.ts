export interface userFire {
    uid: string;
    firstName?: string,
    lastName?: string,
    displayName?: string;
    email: string;
    gender?: string;
    phoneNumber: string;
    photoURL?: string;
    location?: string;
    emailVerified?: boolean;
    googleAuth?: boolean;
}