import axios from 'axios'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    componentDidMount = async () => {
        const users = await axios.get('http://localhost:4000/api/users')
        this.setState({
            users: users.data.map(user => user.username),
            userSelected: users.data[0].username

        })
        if (this.props.match.params.id){
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }



    }

    onSubmit = async (e) => {
        console.log('UwU')
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        if (this.state.editing){
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
        }else{
            await axios.post('http://localhost:4000/api/notes/', newNote)

        }
        
        
        console.log("> ",newNote)
        window.location.href = '/'
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <img src="https://drive.google.com/file/d/1dMqwAg10DDRP2ZfpRv7g3P3vBOXIJKkh/view?usp=sharing" alt=""/>
                <div className="card card-body">
                    <h3>Create a Note</h3>
                    {/** SELECT USER*/}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <select
                                className="form-control"
                                name='userSelected'
                                onChange={this.onInputChange}
                            >
                                {
                                    this.state.users.map(user =>
                                        <option key={user} value={user}>
                                            {user}
                                        </option>)
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="title"
                                name="title"
                                onChange={this.onInputChange}
                                value={this.state.title}
                                required />
                        </div>

                        <div className="form-control">
                            <textarea
                                name="content"
                                className="form-control"
                                placeholder="content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                required></textarea>

                        </div>

                        <div className="form-group">
                            <DatePicker className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}

                            />
                        </div>


                        <button className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>

            </div>
        )
    }
}
