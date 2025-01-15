export interface GetUsersParamsType {
  _quantity?: number;
  _gender?: string;
  _birthday_start?: string;
}

export interface AddressType {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

export interface UserType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: AddressType;
  website: string;
  image: string;
}

export interface GetResUsersType {
  status: string;
  code: number;
  locale: string;
  seed: string | null;
  total: number;
  data: UserType[];
}
