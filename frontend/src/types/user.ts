export interface registerProps {
    name: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
    joinDate?: Date | null;
    cartype: string;
    level?: number | null;
    xpCounter?: number | null;
    lastSeen?: Date | null;
}

export interface loginProps {
    email: string,
    password: string,
}

export interface resetPasswordProps {
    email: string
}

export interface User {
    _id: number
    name: string,
    lastname: string,
    age: number,
    email: string,
    password: string,
    cartype: string,
    joinDate: Date,
    level: number,
    xpCounter: number,
    lastSeen: Date,
}

export interface UserDetails {
    name: string,
    lastname: string,
    age: number | string
    email: string;
    cartype: string;
}


export interface userState {
    userData: User | null,
    error: string | null,
    loading: boolean
}