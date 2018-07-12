import React from 'react';

const RepoList = ({repos, deleteRepo}) => (
  <div>
    {console.log(repos)}
    <h4> Repo List Component </h4>
    There are {repos.length} repos.

    {
    	repos.map((repo, i) => {
    		return (
    			<div key={i}>
    				<h5>Username: {repo.username}</h5>
                    <ul>
                         <a href={repo.repo_url}>Repo Name: {repo.repo_name}</a>
                        <li>Repo Watchers: {repo.repo_watchers}</li>
                        <li>Description: {repo.repo_description}</li>
                    </ul>
                    <button onClick={() => {deleteRepo(repo.repo_id, repo.username)}}>Delete from Database</button>
    			</div>
    			)
    	})
    }
  </div>
)

export default RepoList;
