import React from 'react';
const axios = require('axios');

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios.post('/cat/register', {
      username: this.state.email.toLowerCase(),
      password: this.state.password
    })
      // will also need to return an authorization token
      .then(response => {
        let user_id = response.data.rows[0].id;
        this.props.updateUserId(user_id);
      })
      .then(() => {
        this.props.updateView('dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h2>Create an account</h2>
        <label className='label'>
          <div>
            {`Email: `}
            <input name='email' type="text" value={this.state.email} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`Password: `}
            <input name='password' type="text" value={this.state.password} onChange={this.handleChange} />
          </div>
        </label>
        <input type="submit" className="formComponent" value="Sign up for free" />
      </form>
    );
  }
}

export default SignUpForm;