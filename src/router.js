import Router from 'ampersand-router'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import React from 'react'
import Layout from './layout'

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
		'repos': 'repos'
	},
	public() {
		console.log('public page...')
		this.renderPage(<PublicPage/>, { layout: false })
	},
	repos() {
		console.log('repos page...');
		this.renderPage(<ReposPage/>, { layout: true })
	}
})