import { Request, Response } from "express";
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
      disponibility,
      loans,
    }: IBookModel = req.body;

    const book = new BookModel();

    const bookExists = await BookModel.findOne({
      $and: [{ author }, { title }, { edition }],
    });

    if (Boolean(bookExists)) {
      const newCopyAdded = await addCopy(bookExists._id);
      if (!Boolean(newCopyAdded)) {
        res.status(500).send({ error: BookError.addCopyError });
      } else {
        res.send(newCopyAdded);
      }
    }

    book.author = author;
    book.title = title;
    book.edition = edition;
    book.keyWords = keyWords;
    book.description = description;
    book.themes = themes;
    book.copies = copies;
    book.disponibility = ;


  } catch (err) {}
};

const addCopy = async (_id: any): Promise<IBookModel> => {
  const copyToAdd = await BookModel.findByIdAndUpdate(
    _id,
    {
      $inc: { copies: 1, disponibility: 1 },
    },
    { new: true }
  );
  return copyToAdd;
};
