import Collection from 'ampersand-rest-collection'
import Label from './label'
import githubMixin from '../helpers/github-mixin'
export default Collection.extend(githubMixin, {
	url() {
		return this.parent.url() + '/labels'; // id is implied, id comes from label model
	},

	model: Label
})