import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navigation from './componets/Navigation'
import CreateNote from './componets/CreateNote'
import NoteList from './componets/NoteList'
import CreateUser from './componets/CreateUser'

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exatc component={NoteList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />

      </div>
    </Router>
  );
}

export default App;
