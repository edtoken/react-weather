import BaseModel from 'core/Model';

/**
 * Base Storage Class
 */

export default class BaseStorage extends BaseModel {

	constructor(data, options) {
		super(data, options);
	}

	beforeAction(){}
}