import Router from 'ampersand-router'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import React from 'react'
import Layout from './layout'
import qs from 'qs'
import xhr from 'xhr'
import app from 'ampersand-app'

export default Router.extend({

	renderPage(page, opts = { layout: true }) {
		if ( opts.layout ) {
			page = (
				<Layout>
					{ page }
				</Layout>
			)
		}
		React.render(page, document.body)
	},

	routes: {
		'': 'public', // can be functions
		'repos': 'repos',
		'login': 'login',
		'auth/callback?:query': 'authCallback',
		'logout': 'logout'
	},

	public() {
		console.log('public page...')
		this.renderPage(<PublicPage/>, { layout: false })
	},

	repos() {
		console.log('repos page...');
		this.renderPage(<ReposPage/>, { layout: true })
	},

	login() {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			client_id: 'd50c5d121413402986cc',
			redirect_uri: window.location.origin + '/auth/callback',
			scope: 'user,repo'
		})
	},

	authCallback(query) {
		query = qs.parse(query)
		console.log(query)

		xhr({
			url: 'https://myhubtags.herokuapp.com/authenticate/' + query.code,
			json: true
		}, (err, req, body) => {
			console.log(body)
			app.me.token = body.token
			this.redirectTo('/repos') // no history, replace state, wipes from history
		})

	},

	logout() {
		window.localStorage.clear();
		window.location = '/' // resets the token
	}

})