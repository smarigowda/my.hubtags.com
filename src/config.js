const config = {
	'localhost': {
		authUrl: 'https://myhubtags.herokuapp.com/authenticate',
		clientId: 'd50c5d121413402986cc'
	},

	'santosharakere.surge.sh': {
		authUrl: 'https://myhubtags.herokuapp.com/authenticate',
		clientId: 'd50c5d121413402986cc'
	}
}[window.location.hostname]

console.log(config)

export default config