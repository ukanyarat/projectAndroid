import e, { Request, Response } from "express";
import * as BookService from "../service/book-service";
import { z, ZodError } from "zod";

const BookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    //description: z.string().min(1, { message: "Description is required" })
});

export const getBooks = async (req: Request, res: Response) => {
    const books = await BookService.getAllBooks();
    res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
    const book = await BookService.getBookById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "No book found" });
    }
};

export const createBook = async (req: Request, res: Response) => {
    try {
        const validatedData = BookSchema.parse(req.body);
        console.log(validatedData);

        const book = await BookService.createBook(validatedData);
        res.status(201).json(book);
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

export const updateBook = async (req: Request, res: Response) => {
    try {
        const validatedData = BookSchema.partial().parse(req.body);
        const book = await BookService.updateBook(req.params.id, validatedData);
        res.json(book);
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

export const deleteBook = async (req: Request, res: Response) => {
    try {
        await BookService.deleteBook(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Book not found" });
    }
};