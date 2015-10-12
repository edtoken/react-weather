module.exports = [
	{
		route: 'index',
		component:'Index',
		title: 'IndexPage'
	},
	{
		route: 'about',
		title: 'About page',
		component:'Content',
		childs:[
			//[{title:'child1'}, {title:'child2', childs:[{title:'child2.1'}]}]
		]
	}
];