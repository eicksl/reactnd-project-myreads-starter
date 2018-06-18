import React from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'


class BookShelf extends React.Component {
  static propTypes = {
    booksMatrix: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }

  render() {
    const shelf = (
      this.props.booksMatrix.map((books, i) => {
        return (
          <div key={i} className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookList
              category={books[0].shelf} books={books}
              moveBook={this.props.moveBook} deleteBook={this.props.deleteBook}
            />
          </div>
        )
      })
    )
    return <div>{shelf}</div>
  }
}


export default BookShelf
