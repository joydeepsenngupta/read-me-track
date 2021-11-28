import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelvedBooks: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  
  updateBookShelf = (book, shelf) => {
    this.props.onUpdateBookShelf(book, shelf);
  }

  render() {

    const { book, shelvedBooks } = this.props;
    const bookTitle = book.title;
   
    const bookAuthors = book.authors ? book.authors.join(`, `) : 'Unknown';
    
    const bookCoverUrl = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ``;
  
    const bookShelf = shelvedBooks.find(shelvedBook => shelvedBook.id === book.id) ?
      shelvedBooks.find(shelvedBook => shelvedBook.id === book.id).shelf :
      'none';

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: bookCoverUrl }}
          >
            {!bookCoverUrl &&
              <p className="book-cover-placeholder">Cover unavailable</p>}
          </div>
          <BookShelfChanger
            shelf={bookShelf}
            onChangeShelf={(shelf) => {this.updateBookShelf(book, shelf)}}
          />
        </div>
        <div className="book-title">{bookTitle}</div>
        <div className="book-authors">{bookAuthors}</div>
      </div>
    )
  }
}

export default Book;
