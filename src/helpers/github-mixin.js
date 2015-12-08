import app from 'ampersand-app'

// a plain object with a function attached to it
export default {
	ajaxConfig () {
		return {
			headers: {
				Authorization: 'token ' + app.me.token
			}
		}
	}
}