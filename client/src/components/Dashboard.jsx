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
    this.search = this.search.bind(this);
    this.getRandom = this.getRandom.bind(this);

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  search(event) {
    event.preventDefault();

    
    let username = this.state.username.toLowerCase();
    let name = this.state.name.toLowerCase();
    let id = this.state.id;

    axios.get(`cats/${username}/${name}/${id}`)
      .then((results) => {
        console.log('results from query:', results.data);
        this.props.updateCats(results.data);
      })
      .then(() => {
        this.props.updateView('cat_profiles');
      })
      .catch(function (error) {
        console.log(error);
      });

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
        <form className='form' onSubmit={this.search}>
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
          <input type="submit" className="formComponent" value="Search" />
        </form>
        <button className='findButton' onClick={this.getRandom}>Find a Random Cat</button>
      </div>
    );
  }
}

export default Dashboard;