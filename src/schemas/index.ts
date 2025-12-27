import type {
  CreateClientInput,
  UpdateClientInput,
  ClientResponse,
  ClientLoginInput,
  AuthSchemaResponse,
} from "./clientSchema";

import { MessageSchema, Message } from "./mensage";

import {
  creatClientSchema,
  updatClientSchema,
  clientResponseSchema,
  clientLoginSchema,
  authSchemaResponse,
} from "./clientSchema";

export type {
  CreateClientInput,
  UpdateClientInput,
  ClientResponse,
  ClientLoginInput,
  AuthSchemaResponse,
  Message,
};

export {
  creatClientSchema,
  updatClientSchema,
  clientResponseSchema,
  clientLoginSchema,
  MessageSchema,
  authSchemaResponse,
};
