import { Todo } from "./todos-response.model";

export interface ApiResponse<T> {
    limit: number;
    skip: number;
    total: number;
    data: T;
}



export interface UsersResponseDto{
    limit: number;
    skip: number;
    total: number;
    users: User[];
}

export interface User {
    id: number;

    firstName: string;

    lastName: string;

    maidenName: string;

    age: number;

    gender: string;

    email: string;

    phone: string;

    username: string;

    password: string;

    birthDate: string;

    image: string;

    bloodGroup: string;

    height: number;

    weight: number;

    eyeColor: string;

    hair: Hair;

    ip: string;

    address: Address;

    macAddress: string;

    university: string;

    bank: Bank;

    company: Company;

    ein: string;

    ssn: string;

    crypto: Crypto;

    role: string;

    name?: string;

    img?:string;
}

export interface Company {
    department: string;

    name: string;

    title: string;

    address: CompanyAddress;
}

export interface CompanyAddress {
    address: string;

    city: string;

    state: string;

    stateCode: string;

    postalCode: string;

    country: string;

    // coordinates: Coordinates;
}

export interface Hair {
    color: string;

    type: string;
}

export interface Address {
    address: string;

    city: string;

    state: string;

    stateCode: string;

    postalCode: string;

    country: string;

}

export interface Bank {
    cardExpire: string;

    cardNumber: string;

    cardType: string;

    currency: string;

    iban: string;
}