import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import search from './BooksAPI'
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
