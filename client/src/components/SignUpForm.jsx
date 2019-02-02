import React from 'react';
const axios = require('axios');

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '8 character min',
      breed: '',
      birthdate: '',
      imgUrl: '',
      name: '',
      weight: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  clearInput(event) {
    // if (this['state'][event.target.name] === 'Password') {
      this.setState({ [event.target.name]: '' });
    // }
  }

  handleSubmit(event) {

    console.log('registration submitted!')
    // * remember to turn weight from string to number
    // axios.post('/cat/register', {
    //   username: this.state.email.toLowerCase(),
    //   password: this.state.password
    // })
    //   // will also need to return an authorization token
    //   .then(response => {
    //     let user_id = response.data.rows[0].id;
    //     this.props.updateUserId(user_id);
    //   })
    //   .then(() => {
    //     this.props.updateView('dashboard');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    event.preventDefault();
  }

  // form validation to do
  // only match for numbers in weight

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <p>*denotes required fields</p>
        <label className='label'>
          <div>
            {`*Username: `}
            <input required name='username' type="text" value={this.state.username} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`*Password: `}
            <input pattern=".{8,}" title='8 character minimum' required name='password' onClick={this.clearInput} type="text" value={this.state.password} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`Breed: `}
            <input name='breed' type="text" value={this.state.breed} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`Birthdate: `}
            <input name='birthdate' type="text" value={this.state.birthdate} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`Image URL: `}
            <input name='imageUrl' type="text" value={this.state.imageUrl} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`*Cat's Name: `}
            <input required name='name' type="text" value={this.state.name} onChange={this.handleChange} />
          </div>
        </label>
        <label className='label'>
          <div>
            {`*Weight: `}
            <input required name='weight' type="number" value={this.state.weight} onChange={this.handleChange} />
            in lbs
          </div>
        </label>
        <input type="submit" className="formComponent" value="Register" />
      </form>
    );
  }
}

export default SignUpForm;