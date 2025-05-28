
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
// import { Exclude } from 'class-transformer';
class Hair {
  @Column()
  color: string;

  @Column()
  type: string;
}

class Coordinates {
  @Column('float')
  lat: number;

  @Column('float')
  lng: number;
}

class Address {
  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  stateCode: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column(() => Coordinates)
  coordinates: Coordinates;
}

class Bank {
  @Column()
  cardExpire: string;

  @Column()
  cardNumber: string;

  @Column()
  cardType: string;

  @Column()
  currency: string;

  @Column()
  iban: string;
}

class CompanyAddress {
  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  stateCode: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column(() => Coordinates)
  coordinates: Coordinates;
}

class Company {
  @Column()
  department: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column(() => CompanyAddress)
  address: CompanyAddress;
}

class Crypto {
  @Column()
  coin: string;

  @Column()
  wallet: string;

  @Column()
  network: string;
}

@Entity({
  
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  maidenName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  birthDate: string;

  @Column()
  image: string;

  @Column()
  bloodGroup: string;

  @Column('float')
  height: number;

  @Column('float')
  weight: number;

  @Column()
  eyeColor: string;

  @Column(() => Hair)
  hair: Hair;

  @Column()
  ip: string;

  @Column(() => Address)
  address: Address;

  @Column()
  macAddress: string;

  @Column()
  university: string;

  @Column(() => Bank)
  bank: Bank;

  @Column(() => Company)
  company: Company;

  @Column()
  ein: string;

  @Column()
  ssn: string;

  // @Exclude()
  // @Column()
  // userAgent: string;

  @Column(() => Crypto)
  crypto: Crypto;

  @Column()
  role: string;
}