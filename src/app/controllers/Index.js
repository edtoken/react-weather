import BaseController from 'core/Controller';

/**
 * IndexController
 */
export default class IndexController extends BaseController {

	constructor(){
		super();
	}

	index(req, next, err){
		console.log('e', err);
	}

	getPermissions(){
		super.getPermissions();
		return {
			index:['logged'],
			error:['logged']
		}
	}
}