import React from 'react'
import PropTypes from 'prop-types'


class Book extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }

  handleChange = event => {
    const toCategory = event.target.value
    const {book, category, moveBook, deleteBook} = this.props
    if (toCategory !== 'none') {
      moveBook(book, category, toCategory)
    } else {
      deleteBook(book, category)
    }
  }

  render() {
    const {book} = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128, height: 193,
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'icons/placeholder.png'})`
              }}>
            </div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {book.title ? book.title : 'Untitled'}
          </div>
          <div className="book-authors">
            {book.authors ? book.authors[0] : 'Anonymous'}
          </div>
        </div>
      </li>
    )
  }
}


export default Book
