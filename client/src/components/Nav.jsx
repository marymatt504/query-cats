import React from 'react';
const axios = require('axios');
const util = require('../../../database/hashUtils.js');

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  clearInput(event) {
    if (this['state'][event.target.name] === 'Email' || this['state'][event.target.name] === 'Password') {
      this.setState({ [event.target.name]: '' });
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    axios.get(`/users/${this.state.email.toLowerCase()}`)
      .then(response => {

        let salt = response.data[0].salt;
        let storedPassword = response.data[0].password;

        if (util.compareHash(this.state.password, storedPassword, salt)) {
          this.props.updateUserId(response.data[0].id);
          this.props.updateView('listDashboard');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    if (this.props.view === 'home') {
      return (
        <div className='navBar'>
          <div className='logo'>
            <img src="https://s3.us-east-2.amazonaws.com/ticket-hogger/38-384690_cute-dog-and-cat-clip-art-cute-cat-clip-art-black-and.png" alt="cat clipart" />
            <div>
              <div>Find the Cats on QueryCats!</div>
            </div>
          </div>
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <label className='formComponent'>
              <input onClick={this.clearInput} name='email' type="text" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label className='formComponent'>
              <input onClick={this.clearInput} name='password' type="text" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input className='formComponent' type="submit" value="Sign in" />
          </form>
        </div>
      )
    } else {
      return (
        <div className='navBar'>
          <div className='logo'>
            <img src="https://s3.us-east-2.amazonaws.com/ticket-hogger/38-384690_cute-dog-and-cat-clip-art-cute-cat-clip-art-black-and.png" alt="cat clipart" />
            <div>
              <div>Find the Cats on QueryCats!</div>
            </div>
          </div>
        </div>
      )
    }
  }


}
export default Nav;