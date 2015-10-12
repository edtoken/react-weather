import _ from 'underscore';
import Permissions from 'components/system/Permissions';

/**
 * BaseController
 */
export default class BaseController {

	constructor() {

		this._permissions = _.extend({}, this.getPermissions());
	}

	/**
	 * Описание прав доступа к методам
	 * @returns {{index: Array, error: Array}}
	 */
	getPermissions() {
		return {
			index: [],
			error: []
		}
	}

	index(req, next, err) {
		console.log(this.constructor.name, 'index');
	}

	error(req, next, err) {
		console.log(this.constructor.name, 'error');
	}

	/**
	 * before beforeAction выполнится перед вызовом метода
	 * @param req
	 * @param options
	 * @param errors
	 * @param next
	 * @returns {*}
	 */
	beforeAction(req, options, errors, next) {
		return next(req, errors);
	}

	/**
	 * Проверка прав доступа к action
	 * @param action
	 * @param options
	 * @param next
	 */
	checkPermissions(action, options, next) {
		var errors = this.checkActionPermissionErrors(action, options);
		return (next(errors), (errors? errors : false));
	}

	/**
	 *  Проверка прав доступа к определенному action
	 *  вернет первую ошибку || false
	 * @param action
	 * @param options
	 * @returns {*}
	 */
	checkActionPermissionErrors(action, options){

		if (!this._permissions[action]) {
			return new Error('Не описаны права доступа controller ['
				+ this.constructor.name
				+ '] action [' + action + ']');
		}

		return Permissions.checkError(this._permissions[action], options);
	}
}