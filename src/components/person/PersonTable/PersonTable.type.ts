import { PersonType } from "@/types/person/person.type";

export type PersonTableDataType = Pick<
  PersonType,
  "id" | "fullname" | "birthday" | "addressName" | "email"
>;
