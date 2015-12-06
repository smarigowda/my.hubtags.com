import getConfig from 'hjs-webpack'

module.exports = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuils: true
})