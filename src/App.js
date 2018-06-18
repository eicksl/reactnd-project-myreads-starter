import React from 'react'
import {Route, Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import {getAll, update} from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  constructor() {
    super()
    if (localStorage.getItem('data') !== null) {
      this.state = JSON.parse(localStorage.getItem('data'))
    } else {
      this.state = {
        read: [],
        currentlyReading: [],
        wantToRead: [],
        idObj: {}
      }
      getAll().then(books => {
        for (const book of books) {
          this.setState(state => ({
            [book.shelf]: [...state[book.shelf], book],
            idObj: {...state.idObj, [book.id]: book.shelf}
          }))
        }
        localStorage.setItem('data', JSON.stringify(this.state))
      })
    }
  }

  moveBook = (book, fromCategory, toCategory) => {
    book.shelf = toCategory
    if (fromCategory === toCategory) {return}
    this.setState(state => ({
      [toCategory]: [...state[toCategory], book],
      idObj: {...state.idObj, [book.id]: toCategory}
    }), () => {
      localStorage.setItem('data', JSON.stringify(this.state))
    })
    update(book, toCategory)
    if (fromCategory !== 'none') {
      this.deleteBook(book, fromCategory)
    }
  }

  deleteBook = (book, category) => {
    if (category === 'none') {return}
    this.setState(state => ({
      [category]: state[category].filter(obj => obj.title !== book.title),
      idObj: {...state.idObj, [book.id]: undefined}
    }), () => {
      localStorage.setItem('data', JSON.stringify(this.state))
    })
    update(book, 'none')
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BookSearch moveBook={this.moveBook} deleteBook={this.deleteBook} idObj={this.state.idObj} />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                booksMatrix={[this.state.currentlyReading, this.state.wantToRead, this.state.read]}
                moveBook={this.moveBook} deleteBook={this.deleteBook}
              />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}


export default BooksApp
