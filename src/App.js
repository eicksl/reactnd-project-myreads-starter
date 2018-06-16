import React from 'react'
import {Route, Link} from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'
import {defaultState} from './constants'
import './App.css'


class BooksApp extends React.Component {
  constructor() {
    super()
    if (localStorage.getItem('data') === null) {
      localStorage.setItem('data', JSON.stringify(defaultState))
    }
    this.state = JSON.parse(localStorage.getItem('data'))
  }

  moveBook = (book, fromCategory, toCategory) => {
    if (this.props.category === toCategory) {return}
    this.setState(state => ({
      [toCategory]: [...state[toCategory], book],
      [fromCategory]: state[fromCategory].filter(obj => obj.title !== book.title)
    }), () => {
      localStorage.setItem('data', JSON.stringify(this.state))
    })
  }

  deleteBook = (book, category) => {
    if (category === undefined) {return}
    this.setState(state => ({
      [category]: state[category].filter(obj => obj.title !== book.title)
    }), () => {
      localStorage.setItem('data', JSON.stringify(this.state))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BookSearch moveBook={this.moveBook} deleteBook={this.deleteBook} />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookList category="present" books={this.state.present} moveBook={this.moveBook} deleteBook={this.deleteBook} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList category="future" books={this.state.future} moveBook={this.moveBook} deleteBook={this.deleteBook} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList category="past" books={this.state.past} moveBook={this.moveBook} deleteBook={this.deleteBook} />
                </div>
              </div>
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
