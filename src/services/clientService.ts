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
  };

  async authenticateClient(data: ClientLoginInput): Promise<AuthSchemaResponse> {
    const validateData = clientLoginSchema.parse(data);
    const client = await this.clientRepository.findByEmail(validateData.email);
    
    if (!client) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await SecurityUtils.comparePassword(
      validateData.password,
      client.password
    );
    
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return authSchemaResponse.parse({token: "fake-jwt-token"});
  };

  async getClientByEmail(email: string): Promise<ClientResponse> {
    const client = await this.clientRepository.findByEmail(email);
    
    if (!client) {
      throw new Error("Client not found");
    }

    return clientResponseSchema.parse(client);
  };

  async getClientById(id: string): Promise<ClientResponse> {
    const client = await this.clientRepository.findById(id);
    
    if (!client) {
      throw new Error("Client not found");
    }

    return clientResponseSchema.parse(client);
  };

  async getAllClients(): Promise<ClientResponse[]> {
    const clients = await this.clientRepository.getAll();
    return clients.map(client => clientResponseSchema.parse(client));
  };

  async updateClient(id: string, data: UpdateClientInput): Promise<ClientResponse> {
    const validateData = updatClientSchema.parse(data);
    const client = await this.clientRepository.findById(id);
    
    if (!client) {
      throw new Error("Client not found");
    }

    if (validateData.password) {
      validateData.password = await SecurityUtils.hashPassword(
        validateData.password
      );
    }

    if (validateData.email) client.email = validateData.email;
    if (validateData.name) client.name = validateData.name;
    if (validateData.phone) client.phone = validateData.phone;
    if (validateData.password) client.password = validateData.password;
    client.updatedAt = new Date().toISOString();
    const updatedClient = await this.clientRepository.update(id, client);
    return clientResponseSchema.parse(updatedClient);
  };

  async deleteClient(id: string): Promise<Message> {
    const client = await this.clientRepository.findById(id);
    
    if (!client) {
      throw new Error("Client not found");
    }

    await this.clientRepository.delete(id);
    return MessageSchema.parse({success: true, detail: "Client deleted successfully"});
  };
}
