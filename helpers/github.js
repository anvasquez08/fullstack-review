const config = require('../config.js');
const db = require('../database/index.js')
const axios = require('axios');

let getReposByUsername = (username) => {
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios.get(`https://api.github.com/users/${username}/repos`, options)
  .then(response => {
    let collection = [];
    response.data.forEach((singleRepo) => {
      let modelObjects = {}
      modelObjects.username = singleRepo.owner.login;
      modelObjects.repo_name = singleRepo.name;
      modelObjects.repo_id = singleRepo.id
      modelObjects.repo_url = singleRepo.html_url
      modelObjects.repo_description = singleRepo.description
      modelObjects.repo_watchers = singleRepo.watchers
      collection.push(modelObjects)
    })
    collection.sort((a, b) => {return b.repo_watchers - a.repo_watchers});
    let top3 = collection.slice(0, 3);
    console.log('HERE ARE THREE REPOS', top3)
    return top3
  })
  .then((data) => {
    db.save(data)
    console.log('THIS IS THE SAVED DATA', data)
    return data
  })

}

module.exports.getReposByUsername = getReposByUsername;

/*
Ensure there are no duplicate repos. If you happen to import the same repo twice, 
it should only show up once in your database. See the tips section about considering unique columns.
*/