import BaseStorage from 'core/Storage';

/**
 * RouterStorage
 */
export default class AppStorage extends BaseStorage {

	constructor(data, options) {
		super(data, options);
	}

	defaults() {
		return {
			route: '',
			pattern: '',
			options: {},

			// утрибуты из роутинга (не удаляются, только заменяются)
			attrs:{}
		}
	}
}