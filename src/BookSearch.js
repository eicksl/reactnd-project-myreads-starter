import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {search} from './BooksAPI'
import Book from './Book'


class BookSearch extends React.Component {
  state = {
    value: '',
    results: []
  }

  static propTypes = {
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }
  handleChange = event => {
    this.setState({value: event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault();
    search(this.state.value).then(data => this.setState({results: data}))
    //search(this.state.value).then(data => console.log(data))
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.results.map((bookData, i) => {
              const book = {
                title: bookData.title ? bookData.title : 'Untitled',
                author: bookData.authors ? bookData.authors[0] : 'Anonymous',
                image: bookData.imageLinks.thumbnail
              }
              return (
                <Book key={i} book={book} moveBook={this.props.moveBook} deleteBook={this.props.deleteBook} />
              )
            })
          }
          </ol>
        </div>
      </div>
    )
  }
}


export default BookSearch
