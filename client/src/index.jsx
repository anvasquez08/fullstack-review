import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  search(username) {
    axios.post(`/repos/${username}`)
      .then(response => {
        console.log('SUCCESS this is the response.data', response.data)
        this.setState({repos:response.data})
      })
      .catch(err => console.log('ERROR in saving repos'))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));