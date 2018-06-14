import React from 'react'
import Book from './Book'


class BookList extends React.Component {

  state = {
    reading: [
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
      }
    ],
    willRead: [],
    haveRead: []
  }

  render() {
    const {category} = this.props
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
          this.state[category].map(book => {
            return <Book key={book.title} book={book} />
          })
        }
        </ol>
      </div>
    )
  }
}


export default BookList
