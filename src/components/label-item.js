import React from 'react'

export default React.createClass({
	render() {
		const { label } = this.props
		return <li><h5>{label.name}</h5></li>
	}
})