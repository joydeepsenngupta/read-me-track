import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import '../styles/App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';


const NoMatch = () => (
  <div className='no-match'>
    <h2>404! Cannot find this page at the moment.</h2>
  </div>
);

class BooksApp extends React.Component {

  state = {
    dataAvailable: false,
    shelvedBooks: [],
    searchedBooks: [],
    query: ''
  }


  async componentDidMount() {
    const shelvedBooks = await BooksAPI.getAll();
    this.setState({
      dataAvailable: true,
      shelvedBooks: shelvedBooks
    });
  }


  updateBooks = (book, shelf) => {
    book.shelf = shelf;
    if (shelf === 'none') {
      this.setState((currentState) => ({
        shelvedBooks: currentState.shelvedBooks.filter(shelvedBook => shelvedBook.id !== book.id)
      }));
    }
  
    else {
      this.setState((currentState) => ({
        shelvedBooks: currentState.shelvedBooks.filter(shelvedBook => shelvedBook.id !== book.id).concat([book])
      }));
    }
    BooksAPI.update(book, shelf);
  }


  updateQuery = (query) => {
    this.setState({ query });
  }


  search = async (query) => {
    const searchedBooks = await BooksAPI.search(query);
    this.setState({ searchedBooks });
  }


  clearSearch = () => {
    this.setState({
      searchedBooks: []
    });
  }

  render() {
    const { dataAvailable, shelvedBooks, searchedBooks, query } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <ListBooks
              dataAvailable={dataAvailable}
              shelvedBooks={shelvedBooks}
              onUpdateListBooks={this.updateBooks}
            />
          )} />
          <Route path='/search' render={() => (
            <SearchBooks
              shelvedBooks={shelvedBooks}
              searchedBooks={searchedBooks}
              query={query}
              onUpdateQuery={this.updateQuery}
              onSearch={this.search}
              onUpdateListBooks={this.updateBooks}
              onClear={this.clearSearch}
            />
          )} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
