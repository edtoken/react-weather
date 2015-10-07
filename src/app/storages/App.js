import BaseStorage from 'core/BaseStorage';
import UserModel from 'storages/models/User';

/**
 * Default App Storage
 */
export default class AppStorage extends BaseStorage {

	constructor(data, options, db) {
		super(data, options, db);
	}

	defaults() {
		return {
			child: UserModel
		};
	}
}