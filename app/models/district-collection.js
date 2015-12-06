import Backbone from 'backbone'
import District from './district'

const DistrictCollection = Backbone.Collection.extend({
	model: District,
	url: 'https://api.parse.com/1/classes/District',
	parse(results) {
		return results.results
	}
})

export default DistrictCollection