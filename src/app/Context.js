import Navigation from 'components/system/Navigation';

/**
 * Global App Context
 */
export default class Context {

	constructor() {
		this._storages = {};
		this._api = {};
	}

	/**
	 *
	 * @param data
	 */
	initialize(data){
		this._db = data.db;

		// создаю хранилища и api
		for(var i in data.config.storages){
			for(var a in data.config.storages[i].api){
				if(!this._api[data.config.storages[i].api[a]]){
					var ApiClass = require('api/' + data.config.storages[i].api[a]);
					this._api[data.config.storages[i].api[a].toLowerCase()] = new ApiClass();
				}
			}
			let storeData = ((data.config.storages[i].name == 'App'))? {configs:data.config} : undefined;
			this.createStore(data.config.storages[i].name, storeData, {});
		}

		this.Navigation = new Navigation();
	}

	/**
	 * Создать хранилище внутри контекста
	 * @param name
	 * @param data
	 * @param options
	 */
	createStore(name, data, options, apiList){
		var StorageClass = require('storages/' + name);
		this._storages[name.toLowerCase()] = new StorageClass(data, options);
	}

	/**
	 * Получить Storage по имени
	 * @param name
	 * @returns {*}
	 */
	getStore(name){
		return this._storages[name.toLowerCase()];
	}

	/**
	 * Получить DB
	 * @returns {*}
	 */
	getDB(){
		return this._db;
	}

}