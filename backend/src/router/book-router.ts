import express from "express";
import * as BookController from "../controller/book-controller";

const router = express.Router();

router.get("/books", BookController.getBooks);
router.get("/books/:id", BookController.getBook);
router.post("/books", BookController.createBook);
router.put("/books/:id", BookController.updateBook);
router.delete("/books/:id", BookController.deleteBook);

export default router;