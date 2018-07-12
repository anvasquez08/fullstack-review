const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const git = require('../helpers/github.js')

let app = express();
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/:username', (req, res)  => {
	let {username} = req.params;
	git.getReposByUsername(username)
  	.then(response => {
  		console.log('back to server: sending this response to client', response)
  		res.send(response)
  	})
	.catch(err => console.log(err))
});

app.get('/repos', (req, res) => {
  	db.retrieve()
  	.then(response => {
  		console.log('back to server: sending repos to client')
  		res.send(response)
  	})
  	.catch(err => console.log('error in saving'))
});

app.delete('/repos/:id', (req, res) => {
	let {id} = req.params
	db.deleteRepoByID(id)
	 	.then(response => res.send(response))
  		.catch(err => console.log('error in saving'))
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


 // db.save({
 // 	username: "octocat",
 //    repo_name: "git-consortium",
 //    repo_id: 18221276,
 //    repo_url: "https://github.com/octocat/git-consortium",
 //    repo_description: "This repo is for demonstration purposes only.",
 //  repo_watchers: 10
 // })
