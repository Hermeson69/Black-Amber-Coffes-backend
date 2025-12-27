import { ClientModel } from "../models";
import { ClientRepository } from "../repositories";

import {
  CreateClientInput,
  UpdateClientInput,
  ClientResponse,
  ClientLoginInput,
  AuthSchemaResponse,
  Message,
  creatClientSchema,
  updatClientSchema,
  clientResponseSchema,
  clientLoginSchema,
  MessageSchema,
  authSchemaResponse,
} from "../schemas";

import SecurityUtils from "../utils/security";

export default class ClientService {
  private clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async createClient(data: CreateClientInput): Promise<ClientResponse>{
    const validateData = creatClientSchema.parse(data);
    const existingClient = await this.clientRepository.findByEmail(validateData.email);

    if (existingClient) {
      throw new Error("Client with this email already exists");
    }

     validateData.password = await SecurityUtils.hashPassword(
      validateData.password
    );

    const model = ClientModel.fromCreateInput(validateData);
    const client = await this.clientRepository.create(model);
    
    return clientResponseSchema.parse(client);  
  }
}
