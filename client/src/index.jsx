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
    this.deleteRepo = this.deleteRepo.bind(this);
  }

  componentDidMount() {
    axios.get('/repos')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  deleteRepo(id, username) {
    axios.delete(`/repos/${id}/${username}`)
    .then(res => this.setState({repos: res.data}))
    .catch(err => console.log(err, 'err'))
  }

  search(username) {
    axios.post(`/repos/${username}`)
      .then(response => {this.setState({repos:response.data})})
      .catch(err => console.log('ERROR in saving repos'))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} deleteRepo={this.deleteRepo}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
