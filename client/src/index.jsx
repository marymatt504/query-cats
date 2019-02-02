import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import CatProfiles from './components/CatProfiles.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home', // also 'dashboard' and 'cat_profiles'
      cats: []
    }
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  updateView(view) {
    this.setState({ view });
  }

  render() {

    if (this.state.view === 'home') {
      return (<div>
        <Nav view={this.view} />
        <SignUpForm updateView={this.updateView}/>
      </div>)
    } else if (this.state.view === 'dashboard') {
      return (<div>
        <Nav view={this.view} />
        <Dashboard />
      </div>)
    } else {
      return (<div>
        <Nav view={this.view} />
        <CatProfiles />
      </div>)
    }

  }
}

ReactDOM.render(<App />, document.getElementById('app'));