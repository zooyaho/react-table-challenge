export interface AddressInfoType {
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

export interface PersonType {
  id: number;
  fullname: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: AddressInfoType;
  addressName: string;
  website: string;
  image: string;
}
