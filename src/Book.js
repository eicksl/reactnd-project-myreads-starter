import React from 'react'
import PropTypes from 'prop-types'


class Book extends React.Component {
  constructor(props) {
    super(props)
    if (props.book.shelf === undefined) {
      this.state = {shelf: 'none'}
    } else {
      this.state = {shelf: props.book.shelf}
    }
  }

  static propTypes = {
    category: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }

  handleChange = event => {
    this.setState({shelf: event.target.value})
  }

  render() {
    const {book, category} = this.props
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
              <select readOnly value={this.state.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" onClick={ () => this.props.moveBook(book, category, "currentlyReading") }>Currently Reading</option>
                <option value="wantToRead" onClick={ () => this.props.moveBook(book, category, "wantToRead") }>Want to Read</option>
                <option value="read" onClick={ () => this.props.moveBook(book, category, "read") }>Read</option>
                <option value="none" onClick={ () => this.props.deleteBook(book, category) }>None</option>
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
