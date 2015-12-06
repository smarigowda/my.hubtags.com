import app from 'ampersand-app'
import Router from './router'
import styles from './styles/main.styl'

window.app = app;

app.extend({
	init() {
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


