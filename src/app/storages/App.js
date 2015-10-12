import BaseStorage from 'core/Storage';
import UserModel from 'storages/models/User';

/**
 * Default App Storage
 */
export default class AppStorage extends BaseStorage {

	constructor(data, options) {
		super(data, options);
	}

	defaults() {
		return {
			// модель пользователя
			child: UserModel
		};
	}
}