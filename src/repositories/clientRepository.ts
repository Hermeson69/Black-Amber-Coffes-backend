import { drizzle } from "drizzle-orm/libsql";
import { ClientModel } from "../models";
import { eq } from "drizzle-orm";
import { clientTable } from "../db/schema";

export default class ClientRepository {
  db: ReturnType<typeof drizzle>;

  constructor(db: ReturnType<typeof drizzle>) {
    this.db = db;
  }

  async create(model: ClientModel): Promise<ClientModel> {
    const client: typeof clientTable.$inferInsert = {
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      phone: model.phone,
      createdAt: model.createdAt || new Date().toISOString(),
      updatedAt: model.updatedAt || new Date().toISOString(),
      deletedAt: null,
    };

    await this.db.insert(clientTable).values(client);

    return new ClientModel(
      client.id,
      client.name,
      client.email,
      client.password,
      client.phone,
      client.createdAt,
      client.updatedAt,
      client.deletedAt
    );
  };

  async findByEmail(email: string): Promise<ClientModel | null> {
    const result = await this.db
      .select()
      .from(clientTable)
      .where(eq(clientTable.email, email))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const clientData = result[0];

    return new ClientModel(
      clientData.id,
      clientData.name,
      clientData.email,
      clientData.password,
      clientData.phone,
      clientData.createdAt,
      clientData.updatedAt,
      clientData.deletedAt
    );
  }
}
