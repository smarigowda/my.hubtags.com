import Router from 'ampersand-router'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import React from 'react'


export default Router.extend({
	routes: {
		'': 'public', // can be functions
		'repos': 'repos'
	},
	public() {
		console.log('public page...')
		React.render(<PublicPage/>, document.body)
	},
	repos() {
		console.log('repos page...');
		React.render(<ReposPage/>, document.body)
	}
})