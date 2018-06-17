import React from 'react'
import Book from './Book'


export const searchTerms = [
  'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
  'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes',
  'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design',
  'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
  'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football',
  'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey',
  'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
  'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy',
  'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River',
  'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
  'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality',
  'Web Development', 'iOS'
]

// stateless functional React component
export const MapBookData = props => {
  const mappedBooks = props.booksArray.map((book, i) => {
    //const book = {
    //  title: bookData.title ? bookData.title : 'Untitled',
    //  author: bookData.authors ? bookData.authors[0] : 'Anonymous',
    //  image: bookData.imageLinks ? bookData.imageLinks.thumbnail : 'icons/placeholder.png'
    //}
    return (
      <Book key={i} book={book} moveBook={props.moveBook} deleteBook={props.deleteBook} category={props.category} />
    )
  })
  return <ol className="books-grid">{mappedBooks}</ol>
}
