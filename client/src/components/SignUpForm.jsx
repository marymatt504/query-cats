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
      imageUrl: '',
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
    if (this['state'][event.target.name] === '8 character min') {
      this.setState({ [event.target.name]: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let submission = {
      username: this.state.username.toLowerCase(),
      password: this.state.password,
      name: this.state.name.toLowerCase(),
      weight: this.state.weight,
      breed: this.state.breed.toLowerCase(),
      birthdate: this.state.birthdate,
      imageUrl: this.state.imageUrl,
    };

    axios.post('/cat/register', submission)
      .then(() => {
        this.props.updateView('dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }

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
            <input name='birthdate' type="date" onClick={this.clearInput} value={this.state.birthdate} onChange={this.handleChange} />
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