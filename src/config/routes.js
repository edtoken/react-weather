module.exports = {

	index: {
		controller: 'Index',
		pattern: '',
		match: ['', '#', '(/)']
	},

	about: {
		controller: 'Index',
		pattern: 'about',
		match: ['about', 'about(/)']
	},

	aboutById: {
		controller: 'Index',
		pattern: 'about/:id/:objectId',
		match: ['about/:id/:objectId']
	},

	error: {
		controller: 'Index',
		pattern: '*path',
		match: ['*path']
	}
};