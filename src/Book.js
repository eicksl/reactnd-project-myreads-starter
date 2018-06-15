import React from 'react'
import PropTypes from 'prop-types'


class Book extends React.Component {
  static propTypes = {
    category: PropTypes.string,
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }
  render() {
    const book = this.props.book
    const category = this.props.category
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.image})` }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" onClick={ () => this.props.moveBook(book, category, "present") }>Currently Reading</option>
                <option value="wantToRead" onClick={ () => this.props.moveBook(book, category, "future") }>Want to Read</option>
                <option value="read" onClick={ () => this.props.moveBook(book, category, "past") }>Read</option>
                <option value="none" onClick={ () => this.props.deleteBook(book, this.props.category) }>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </li>
    )
  }
}


export default Book
