import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }
    async componentDidMount() {
        this.getUsers()
        console.log(this.state.users)
    }

    getUsers = async ()=> {
        
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({
            users: res.data
        })
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit =  async e =>{
        e.preventDefault();
        console.log(this.state.username)
        const res = await axios.post('http://localhost:4000/api/users',{
            username: this.state.username
        })
        this.setState({username:''})
        this.getUsers();

    }

    deleteUser = async (id) =>{
        await axios.delete('http://localhost:4000/api/users/' + id)
        this.getUsers()
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="car card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}  >
                            <div >
                                <input
                                    value={this.state.username}
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeUsername} />
                            </div>
                            <button type="submint" className="btn btn-primary">
                                Save

                            </button>
                        </form>
                    </div>

                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-grup-item list-group-item-action" 
                                    key={user._id}
                                    onDoubleClick={()=> this.deleteUser(user._id)}>

                                    {user.username}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
