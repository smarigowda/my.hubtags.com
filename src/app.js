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

app.on('local', (x) => {
	// console.log(arguments)
	console.log('local click triggerred...')
	console.log(x)
})

app.on('all', (x) => {
	// console.log(arguments)
	console.log('an event triggerred...')
	console.log('event name: ' + x)
})

app.init();


