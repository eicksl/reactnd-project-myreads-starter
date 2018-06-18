import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import {searchTerms} from './constants'
import {search} from './BooksAPI'
import Book from './Book'


class BookSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      results: []
    }
  }

  static propTypes = {
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    idObj: PropTypes.object.isRequired
  }

  handleChange = event => {
    this.setState({value: event.target.value}, () => {
      const {value} = this.state
      if (value) {
        const match = new RegExp(escapeRegExp(value), 'i')
        const searchTerm = searchTerms.find(term => match.test(term))
        if (searchTerm === undefined) {
          this.setState({results: []})
        } else {
          search(searchTerm).then(data => this.setState({results: data}))
        }
      } else {
        this.setState({results: []})
      }
    })
  }

  componentDidMount() {
    document.getElementById('search-bar').focus()
  }

  render() {
    const {idObj} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              id="search-bar" type="text" placeholder="Search by title or author"
              value={this.state.value} onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map(book => {
                if (book.id in idObj && idObj[book.id] !== undefined) {
                  book.shelf = idObj[book.id]
                } else {
                  book.shelf = 'none'
                }
                return (
                  <Book
                    key={book.id} book={book} moveBook={this.props.moveBook}
                    deleteBook={this.props.deleteBook} category={book.shelf}
                  />
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
