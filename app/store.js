import Session from './models/session'
import User from './models/user'
import DistrictCollection from './models/district-collection'

let session, districts;

export default {
	getSession() {
		return (session = session || new Session())
	},

	getUser(options) {
		return new User(options)
	},

	getDistrictCollection() {
		return (districts = districts || new DistrictCollection())
	}
}