import React from 'react';

const RepoList = ({repos}) => (
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
                         <li>Repo Name: {repo.repo_name}</li>
                        <li>Repo Watchers: {repo.repo_watchers}</li>
                        <a href={repo.repo_url}>Description: {repo.repo_description}}</a>
                    </ul>
    			</div>
    			)
    	})
    }
  </div>
)

export default RepoList;
