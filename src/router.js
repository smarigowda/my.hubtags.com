import Router from 'ampersand-router'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import React from 'react'
import Layout from './layout'
import qs from 'qs'
import xhr from 'xhr'
import app from 'ampersand-app'
import RepoDetail from './pages/repo-detail'
import MessagePage from './pages/message'
import config from './config'


function requiresAuth(handlerName) {
	return function() {
		if(app.me.token) {
			// this.handlerName.apply(this, arguments) // does not work
			// debugger
			// console.log(arguments)
			// console.dir()
			this[handlerName].apply(this, arguments) // works
			// handlerName(arguments) // does not work
		} else {
			this.redirectTo('/')
		}
	}
}

export default Router.extend({

	renderPage(page, opts = { layout: true }) {
		if ( opts.layout ) {
			page = (
				<Layout me={app.me}>
					{ page }
				</Layout>
			)
		}
		React.render(page, document.body)
	},

	// routes definition, functions run during import, which is when we require this file
	routes: {
		'': 'public', // can be function
		'repos': requiresAuth('repos'),
		'login': 'login',
		'auth/callback?:query': 'authCallback',
		'logout': 'logout',
		'repo/:owner/:name': requiresAuth('repoDetail'),
		'*nf': 'notfound'
	},

	public() {
		console.log('public page...')
		this.renderPage(<PublicPage/>, { layout: false })
	},

	repos() {
		console.log('repos page...');
		debugger
		this.renderPage(<ReposPage repos={app.me.repos}/>, { layout: true })
	},

	login() {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			client_id: config.clientId,
			redirect_uri: window.location.origin + '/auth/callback',
			scope: 'user,repo'
		})
	},

	authCallback(query) {
		query = qs.parse(query)
		console.log(query)

		xhr({
			url: `${config.authUrl}/${query.code}`,
			json: true
		}, (err, req, body) => {
			console.log(body)
			app.me.token = body.token
			this.redirectTo('/repos') // no history, replace state, wipes from history
		})

		this.renderPage(<MessagePage title='Fetching your data...'/>)


	},

	logout() {
		window.localStorage.clear();
		window.location = '/' // resets the token
	},

	repoDetail(owner, name) {
		const model = app.me.repos.getByFullName(owner + '/' + name)
		this.renderPage(<RepoDetail repo={model} labels={model.labels}/>)
	},

	notfound() {
		this.renderPage(<MessagePage title='Not Found' body='sorry nothing here...'/>)
	}

})