import _ from 'underscore';
import Events from 'extensions/Events';

export default class Navigation extends Events {

	constructor() {
		super();

		var configs = this.getContext().getStore('App').get('configs');

		this.configs = {};
		this.configs.navigation = configs.navigation;
		this.configs.routes = configs.routes;
		this.configs._byId = {}; // элементы навигации отсортированные по ID
		this.configs.active = this._getNewPrepareConfig();
		console.log('Navigation', this);
	}

	/**
	 * Вернет обработанный конфиг удобный для работы с ним
	 * @param cfg
	 * @private
	 */
	_prepareConfig(items, parent) {
		for (var i in items) {
			items[i].id = _.uniqueId('item-');
			items[i].active = false;
			items[i].parent = parent;
			items[i].childs = items[i].childs || [];
			this.configs._byId[items[i].id] = items[i];
			if (items[i].childs.length) {
				this._prepareConfig(items[i].childs, items[i]);
			}
		}
		return items;
	}

	/**
	 * вернет новый экземпляр чистого конфига
	 * @returns {*}
	 * @private
	 */
	_getNewPrepareConfig() {
		var cfg = this.configs.navigation.slice(0);
		this.configs._byId = {};
		return this._prepareConfig(cfg, false);
	}

	/**
	 * вернет определенный уровень активного элемента навигации
	 * @param level
	 */
	getItemsByLevel(level) {

	}

	/**
	 * Получение глобального контекста
	 * @returns {*}
	 */
	getContext() {
		return window.__SPA001.fn.getContext();
	}

}