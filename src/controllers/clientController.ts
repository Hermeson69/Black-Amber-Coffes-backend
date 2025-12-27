import {ClientService} from "../services";
import {
    MessageSchema,
    CreateClientInput,
    ClientLoginInput,
    authSchemaResponse,
} from "../schemas"

import { Request, Response } from "express";
import { tr } from "zod/v4/locales";
import { success } from "zod";

export default class ClientController {
    private clientService: ClientService;

    constructor(clientService: ClientService) {
        this.clientService = clientService;
    }


    async createClient(req: Request, res: Response): Promise<void> {
        try{
            const data: CreateClientInput = req.body;
            const newClient = await this.clientService.createClient(data);
            res.status(201).json(newClient);
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    }

}