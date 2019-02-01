import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import SignUpForm from './components/SignUpForm.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home' // also 'dashboard'
    }
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


  render() {

    if (this.state.view === 'home') {
      return (<div>
        <Nav view={this.view} />
        <SignUpForm />
      </div>)
    } else {
      return (<div>
        <Nav view={this.view} />
        <Dashboard />
      </div>)
    }

  }
}

ReactDOM.render(<App />, document.getElementById('app'));