import e, { Request, Response } from "express";
import * as TranferService from "../service/tranfer-service";
import { z, ZodError } from "zod";

const TranferSchema = z.object({
    sender: z.string().min(1, { message: "sender is required" }),
    recipient: z.string().optional(),
    amount: z.number().min(1, { message: "amount is required" }),
    date: z.string().optional(),
    time: z.string().optional(),
    slip_ref: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export const getTranfers = async (req: Request, res: Response) => {
    const tranfer = await TranferService.getAllTranfers();
    res.json(tranfer);
};

export const getTranfer = async (req: Request, res: Response) => {
    const tranfer = await TranferService.getTranferById(req.params.id);
    if (tranfer) {
        res.json(tranfer);
    } else {
        res.status(404).json({ message: "No tranfer found" });
    }
};

export const createTranfer = async (req: Request, res: Response) => {
    try {
        const validatedData = TranferSchema.parse(req.body);
        console.log(validatedData);

        const tranfer = await TranferService.createTranfer(validatedData);
        res.status(201).json(tranfer);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};

export const updateTranfer = async (req: Request, res: Response) => {
    try {
        const validatedData = TranferSchema.partial().parse(req.body);
        const tranfer = await TranferService.updateTranfer(req.params.id, validatedData);
        res.json(tranfer);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    };
};

export const deleteTranfer = async (req: Request, res: Response) => {
    try {
        await TranferService.deleteTranfer(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Tranfer not found" });
    }
};