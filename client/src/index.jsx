import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import SignUpForm from './components/SignUpForm.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home'
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
    return (<div>

      <Nav view={this.view} />
      <SignUpForm />

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));