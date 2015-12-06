import app from 'ampersand-app'
import Router from './router'
import styles from './styles/main.styl'
import Me from './models/me'

window.app = app;

app.extend({
	init() {
		this.me = new Me();
		this.router = new Router()
		this.router.history.start()
	}
})

app.on('local', (payload) => {
	// console.log(arguments)
	console.log('local click triggerred...')
	console.log(payload)
})

app.on('all', (eventName, payload) => {
	// console.log(arguments)
	console.log('an event triggerred...')
	console.log('event name: ' + eventName)
})

app.init();


