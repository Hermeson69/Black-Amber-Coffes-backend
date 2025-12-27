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
    };

    async authenticateClient(req: Request, res: Response): Promise<void> {
        try{
            const data: ClientLoginInput = req.body;
            const authResponse = await this.clientService.authenticateClient(data);
            res.status(200).json(authSchemaResponse.parse(authResponse));
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    };

    async getclientByEmail(req: Request, res: Response): Promise<void> {
        try{
            const email: string = req.params.email;
            const client = await this.clientService.getClientByEmail(email);
            res.status(200).json(client);
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    };


    async getProfile(req: Request, res: Response): Promise<void> {
        try{
            const id: string = req.params.id;
            const client = await this.clientService.getClientById(id);
            res.status(200).json(client);
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    };

    async getAllClients(req: Request, res: Response): Promise<void> {
        try{
            const clients = await this.clientService.getAllClients();   
            res.status(200).json(clients);
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    };

    async updateClient(req: Request, res: Response): Promise<void> {
        try{
            const id: string = req.params.id;
            const data = req.body;
            const updatedClient = await this.clientService.updateClient(id, data);
            res.status(200).json(updatedClient);
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    };

    async deleteClient(req: Request, res: Response): Promise<void> {
        try{
            const id: string = req.params.id;
            const deleteMessage = await this.clientService.deleteClient(id);
            res.status(200).json(deleteMessage);
        }catch(error){
            res.status(400).json(
                MessageSchema.parse({
                    success: false,
                    detail: (error as Error).message,
                })
            )
        }
    };

}