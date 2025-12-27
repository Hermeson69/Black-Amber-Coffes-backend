import { Router } from "express";
import { ClinetsController } from "../controllers";
import { ClientService } from "../services";
import { ClientRepository } from "../repositories";
import { db } from "../db";

const router = Router();

const clientRepository = new ClientRepository(db);
const clientService = new ClientService(clientRepository);
const clientController = new ClinetsController(clientService);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Criar um novo cliente
 *     description: Cria um novo cliente no banco de dados
 *     tags:
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post("/clients", clientController.createClient.bind(clientController));

export default router;
