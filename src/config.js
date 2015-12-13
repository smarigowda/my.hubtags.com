const config = {
	'localhost': {
		authUrl: 'https://devhubtags.herokuapp.com/authenticate',
		clientId: 'd6f4ca7adb9590910afa'
	},

	'santosharakere.surge.sh': {
		authUrl: 'https://myhubtags.herokuapp.com/authenticate',
		clientId: 'd50c5d121413402986cc'
	}
}[window.location.hostname]

console.log(config)

export default config