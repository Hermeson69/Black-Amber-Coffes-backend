import { CreateClientInput } from "../schemas";
import { generateId } from "../utils/gereteId";

export default class ClientModel {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt: string | null;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    deletedAt: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.createdAt =
      createdAt && (typeof createdAt === "string" ? createdAt : createdAt.toISOString());
    this.updatedAt =
      updatedAt && (typeof updatedAt === "string" ? updatedAt : updatedAt.toISOString());
    this.deletedAt = deletedAt;
  }

  static fromCreateInput(input: CreateClientInput): ClientModel {
    return new ClientModel(
      generateId(),
      input.name,
      input.email,
      input.password,
      input.phone,
      undefined, 
      undefined,
      null,
    );
  }
}