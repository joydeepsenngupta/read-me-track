import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class ListBooks extends React.Component {
	
	static propTypes = {
		dataAvailable: PropTypes.bool.isRequired,
		shelvedBooks: PropTypes.array.isRequired,
		onUpdateListBooks: PropTypes.func.isRequired
	};

	// Update ListBooks by shelf
	updateListBooks = (book, shelf) => {
		this.props.onUpdateListBooks(book, shelf);
	};

	render() {
		const { dataAvailable, shelvedBooks } = this.props;
		const currentlyReadingBooks = shelvedBooks.filter(
			book => book.shelf === 'currentlyReading'
		);
		const wantToReadBooks = shelvedBooks.filter(
			book => book.shelf === 'wantToRead'
		);
		const readBooks = shelvedBooks.filter(book => book.shelf === 'read');

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>My Reads</h1>
				</div>
				{dataAvailable ? (
					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Currently Reading</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{currentlyReadingBooks.map(book => (
											<li key={book.id}>
												<Book
													book={book}
													shelvedBooks={shelvedBooks}
													onUpdateBookShelf={this.updateListBooks}
												/>
											</li>
										))}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Want to Read</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{wantToReadBooks.map(book => (
											<li key={book.id}>
												<Book
													book={book}
													shelvedBooks={shelvedBooks}
													onUpdateBookShelf={this.updateListBooks}
												/>
											</li>
										))}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Read</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{readBooks.map(book => (
											<li key={book.id}>
												<Book
													book={book}
													shelvedBooks={shelvedBooks}
													onUpdateBookShelf={this.updateListBooks}
												/>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="loader-msg">Loading books...</div>
				)}
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default ListBooks;
