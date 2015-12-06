import Router from './router'
import styles from './styles/main.styl'
import Repos from './pages/public'
import Public from './pages/repos'

window.app = {
	init() {
		this.router = new Router()
		this.router.history.start()
	}
}

window.app.init();
