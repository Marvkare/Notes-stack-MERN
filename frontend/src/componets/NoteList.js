import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
export default class NoteList extends Component {
    state={
        notes: [],

    }

    async componentDidMount() {
       this.getNotes();
    }  
    
    async getNotes() {
        const res =  await axios.get('http://localhost:4000/api/notes',{})
        this.setState({notes: res.data })
        console.log(this.state.notes)
        
    }

    deleteNote = async (id) =>{
        console.log(id)
        await axios.delete('http://localhost:4000/api/notes/'+ id)
        this.getNotes()
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(notes => (
                        <div className="col-md-4 p-2">
                            <div className="card">
                                <div className="card-header d-flex justify-content-betwen">
                                    <h5>{notes.title}</h5>
                                    <Link className="btn btn-secondary" to={'/edit/' + notes._id}> Edit</Link>
                                </div>
                                <div className="card-body">
                                    <p>{notes.content} </p>
                                    <p> Att. {notes.author}</p>
                                    <p>{format(notes.date)}</p> 
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={()=> this.deleteNote(notes._id)}>
                                        Delete
                                    </button>
                                    

                                </div>
                            </div>

                        </div>
                    ))
                }
               
            </div>
        )
    }
}
