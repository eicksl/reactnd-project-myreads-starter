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
    const categories = ['currentlyReading', 'wantToRead', 'read']
    const categoriesAlt = ['Currently Reading', 'Want to Read', 'Read']
    const shelf = (
      this.props.booksMatrix.map((books, i) => {
        return (
          <div key={i} className="bookshelf">
            <h2 className="bookshelf-title">{categoriesAlt[i]}</h2>
            <BookList
              category={categories[i]} books={books}
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
