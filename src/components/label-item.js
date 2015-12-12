import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({

	mixins: [ampersandMixin],

	getInitialState() {
		const { name, color } = this.props.label
		return { name, color }
	},

	// case for component level state
	onNameChange(event) {
		this.setState({
			name: event.target.value
		})
	},

	onColorChange(event) {
		this.setState({
			color: event.target.value.slice(1)
		})
	},

	onDeleteClick(event) {
		event.preventDefault()
		this.props.label.destroy({wait: true})
		// debugger
	},

	onCancelClick(event){
		event.preventDefault()

		const {label} = this.props

		if(label.saved) {
			label.editing = false
			this.setState(this.getInitialState())

		} else {
			label.destroy()
		}
		
	},

	onEditClick(event) {
		event.preventDefault()
		this.props.label.editing = true
		// debugger
	},

	onSubmit(event) {
		event.preventDefault()
		const { label } = this.props

		if (label.saved) {
			label.update(this.state)
		} else {
			label.save(this.state, { success: () => { label.saved = true }})
		}

		label.editing = false; // toggles the UI back to non editing mode
	},

	render() {
		const { label } = this.props
		const { color } = this.state
		const cssColor = `#${color}` // always contains hash
		// return <li><h5>{label.name}</h5></li>

		let content


		// editing
		if(label.editing) {
			content = (
				<form onSubmit={this.onSubmit} className='label'>
				  <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
				  <input name='name' value={this.state.name} onChange={this.onNameChange}/>
				  <input name='color' value={cssColor} onChange={this.onColorChange}/>
				  <button type='submit' className='button button-small'>Save</button>
				  <button type='button' onClick={this.onCancelClick} className='button button-small button-unstyled'>cancel</button>
				</form>
			)
		} else {
			content = (
				<div className='label'>
				  <span className='label-color' style={ {backgroundColor: cssColor} }>&nbsp;</span>
				  <span>{label.name}</span>
				  <span onClick={this.onEditClick} className='octicon octicon-pencil' ></span>
				  <span onClick={this.onDeleteClick} className='octicon octicon-x'></span>
				</div>
			)
		}

		return (
			<div>
				{content}
			</div>
		)
	}
})