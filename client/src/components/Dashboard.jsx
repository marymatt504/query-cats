import React from 'react';
const axios = require('axios');

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRandom = this.getRandom.bind(this);

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let submission = {
      username: this.state.username.toLowerCase(),
      name: this.state.name.toLowerCase(),
      id: this.state.id,
    };
    console.log('to be searched:', submission);      
  }

  getRandom() {
    axios.get('/cats/random')
      .then((results) => {
        this.props.updateCats(results.data);
      })
      .then(() => {
        this.props.updateView('cat_profiles');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <h2>Search for Cats</h2>
          <label className='label'>
            <div>
              {`Username: `}
              <input required name='username' type="text" value={this.state.username} onChange={this.handleChange} />
            </div>
          </label>
          <label className='label'>
            <div>
              {`Cat's Name: `}
              <input required name='name' type="text" value={this.state.name} onChange={this.handleChange} />
            </div>
          </label>
          <label className='label'>
            <div>
              {`Id: `}
              <input required name='id' type="number" value={this.state.id} onChange={this.handleChange} />
            </div>
          </label>
          <input type="submit" className="formComponent" value="Register" />
        </form>
        <button className='findButton' onClick={this.getRandom}>Find a Random Cat</button>
      </div>
    );
  }
}

export default Dashboard;