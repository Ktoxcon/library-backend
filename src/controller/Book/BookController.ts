import { Request, Response } from "express";
import { displayError, HttpError } from "libraries";
import { DocumentQuery } from "mongoose";
import { IBookModel, BookModel } from "../../database";
import { BookError } from "./error/BookError";

const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      author,
      title,
      edition,
      keyWords,
      description,
      themes,
      copies,
    }: IBookModel = req.body;

    const book = new BookModel();

    const bookExists = await BookModel.findOne({
      $and: [{ author }, { title }, { edition }],
    });

    if (Boolean(bookExists)) {
      const newCopyAdded = await addCopy(bookExists._id, copies);
      if (!Boolean(newCopyAdded)) {
        res.status(500).send({ error: BookError.addCopyError });
        return;
      } else {
        res.send(newCopyAdded);
      }
    } else {
      book.author = author;
      book.title = title;
      book.edition = edition;
      book.keyWords = keyWords;
      book.description = description;
      book.themes = themes;
      book.copies = copies;

      const bookAdded = await book.save();

      if (!Boolean(bookAdded)) {
        res.status(500).send({ error: BookError.saveBookError });
        return;
      } else {
        res.send(bookAdded);
      }
    }
  } catch (err) {
    displayError(err.name, err.message, err.code);
    res.status(500).send({ error: new HttpError(err.code, err.message) });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookDeleted = await BookModel.findByIdAndDelete(req.params.id);
    if (!Boolean(bookDeleted)) {
      res.status(500).send({ error: BookError.deleteBookError });
      return;
    } else {
      res.send({ deleted: true });
    }
  } catch (err) {
    displayError(err.name, err.message, err.code);
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (err) {
    displayError(err.name, err.message, err.code);
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

const addCopy = async (_id: any, add: number): Promise<IBookModel> => {
  const copyToAdd = await BookModel.findByIdAndUpdate(
    _id,
    {
      $inc: { copies: add, disponibility: add },
    },
    { new: true }
  );
  return copyToAdd;
};

export const BookController = {
  addBook,
  deleteBook,
};
