import { HttpError } from "../../../libraries";

enum BookErrorCode {
  saveBook = 200,
  updateBook = 205,
  deleteBook = 210,
  getBooks = 215,
  addCopy = 220,
  bookDoesntExists = 230,
}

const saveBookError = new HttpError(
  BookErrorCode.saveBook,
  "Error trying to save the book"
);

const updateBookError = new HttpError(
  BookErrorCode.updateBook,
  "Error trying to update the book"
);

const deleteBookError = new HttpError(
  BookErrorCode.updateBook,
  "Error trying to delete the book"
);

const getBooksError = new HttpError(
  BookErrorCode.getBooks,
  "Error trying to get the books"
);

const bookDoesntExistsError = new HttpError(
  BookErrorCode.bookDoesntExists,
  "The book whit that id doesnt exists"
);

const addCopyError = new HttpError(
  BookErrorCode.addCopy,
  "Error trying to add a new copy"
);

export const BookError = {
  saveBookError,
  updateBookError,
  deleteBookError,
  getBooksError,
  addCopyError,
  bookDoesntExistsError,
};
