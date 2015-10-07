import BaseModel from 'core/BaseModel';

/**
 * Base Storage Class
 */

export default class BaseStorage extends BaseModel {
	constructor(data, options, db) {
		super(data, options, db);
	}
}