import Events from 'extensions/Events';

export default class BaseApi extends Events {

	actionProcess(){}
	actionError(){}
	actionSuccess(){}


	/**
	 * Получение глобального контекста
	 * @returns {*}
	 */
	getContext(){
		return window.__SPA001.fn.getContext();
	}
}