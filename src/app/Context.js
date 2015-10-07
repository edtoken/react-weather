import Db from 'extensions/db/';

/**
 * Global App Context
 */
export default class Context {

	constructor(data) {

		this.db = new Db({});
		this._storages = {};
		this._api = {};

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
	}

	/**
	 * Создать хранилище внутри контекста
	 * @param name
	 * @param data
	 * @param options
	 */
	createStore(name, data, options, apiList){
		var StorageClass = require('storages/' + name);
		this._storages[name.toLowerCase()] = new StorageClass(data, options, this.db);
	}

	/**
	 * Получить Storage по имени
	 * @param name
	 * @returns {*}
	 */
	getStore(name){
		return this._storages[name.toLowerCase()];
	}

}