import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
	mixins: [ampersandMixin],
	render() {
		const {repos} = this.props // repo collection
		return(	<div>
					<h1>Repos Page</h1>
					<ul>
					{repos.map(repo => {
						return (<li key={repo.id}>
									<span className="octicon octicon-repo"></span>
									<a href={repo.appUrl}> {repo.full_name}</a>
								</li>)
					 }
					)}
					</ul>
				</div>)
	}
})