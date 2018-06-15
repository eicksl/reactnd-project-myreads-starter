import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class BookList extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
          this.props.books.map(book => {
            return (
              <Book
                key={book.title} book={book} moveBook={this.props.moveBook}
                deleteBook={this.props.deleteBook} category={this.props.category}
              />
            )
          })
        }
        </ol>
      </div>
    )
  }
}


export default BookList
