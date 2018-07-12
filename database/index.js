const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// mongoose.Promise = require('bluebird');


// mongoose.on('open', () => {console.log('connected to DB')})
// mongoose.on('error', () => {console.log('err')})

let repoSchema = mongoose.Schema({
  username: String, 
  repo_name: {
    type: String,
    unique : true
  }, 
  repo_id: Number, 
  repo_url: String,
  repo_description: String,
  repo_watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (array) => {
  return Repo.collection.insert(array, (err, docs) => {
    if (err) console.log('couldnt save docs', err)
    else return docs
  })
}

let retrieve = () => {
	return Repo.find({})
}

let retrieveByUsername = (username) => {
  return Repo.find({username: username})
}
let deleteRepoByID = (id) => {
	return Repo.deleteOne({repo_id: id})
}


exports.save = save;
exports.retrieve = retrieve;
exports.retrieveByUsername = retrieveByUsername;
exports.deleteRepoByID = deleteRepoByID;

/*
 let save = ({username, repo_name, repo_id, repo_url, repo_description, repo_watchers}) => {
  return new Repo({
    username: username, 
    repo_name: repo_name, 
    repo_id: repo_id, 
    repo_url: repo_url, 
    repo_description: repo_description, 
    repo_watchers: repo_watchers
  }).save()

	- comeback to figure out db on open error
*/
