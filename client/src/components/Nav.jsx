import React from 'react';
const axios = require('axios');
const util = require('../../../database/hashUtils.js');

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'Username',
      password: 'Password'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  clearInput(event) {
    if (this['state'][event.target.name] === 'Username' || this['state'][event.target.name] === 'Password') {
      this.setState({ [event.target.name]: '' });
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    axios.put('/cat/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        this.props.updateView('dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {

    console.log('this.props.view:', this.props.view);

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
              <input onClick={this.clearInput} name='username' type="text" value={this.state.username} onChange={this.handleChange} />
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