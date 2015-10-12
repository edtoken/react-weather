import _ from 'underscore';

var defaultId = 0x00000000000000000000;
var currentId = defaultId;

/**
 * сгенерировать новый ID
 * @returns {number}
 */
function getNewId(){
	return currentId++;
};

export default class Database {

	constructor(opt) {
		this._data = {};
		this.options = _.extend({}, this.defaultOptions(), opt);
	}

	defaultOptions() {
		return {}
	}

	/**
	 * Добавить новую модель
	 * @param obj объект модели
	 * @returns {number}
	 */
	addModel(obj) {

		var name = obj.constructor.name;
		if(!this._data[name]) this._data[name] = new Model();

		var _id = getNewId();
		obj.attributes._id = _id;
		obj._id = _id;
		this._data[name].push(obj);

		return _id;
	}

	/**
	 * вернуть модель по ID
	 * @param name
	 * @param id
	 * @returns {*}
	 */
	findById(name, id){
		if(!this._data[name]){
			throw 'Model not found';
		}
		return this._data[name].findById(id);
	}

	/**
	 * вернуть массив моделей по атрибутам
	 * @param name
	 * @param attrs
	 * @returns {*}
	 */
	where(name, attrs){
		if(!this._data[name]){
			throw 'Model not found';
		}
		return this._data[name].where(attrs);
	}

	/**
	 * получить одну модель по атрибутам
	 * @param name
	 * @param attrs
	 * @returns {*}
	 */
	findOne(name, attrs){
		if(!this._data[name]){
			throw 'Model not found';
		}
		return this._data[name].findOne(attrs);
	}
}

export class Model {

	constructor(options) {
		this.items = [];
		this._byId = {};
	}

	filter(attrs){
		var match = _.matches(attrs);
		return _.filter(this.items, item => (match(item.attributes)));
	}

	first(attrs){
		var match = _.matches(attrs);
		return _.first(this.items, item => (match(item.attributes)));
	}

	push(obj){
		this.items.push(obj);
		this._byId[obj._id] = obj;
	}

	findById(id){
		return this._byId[id];
	}

	where(attrs){
		return this.filter(attrs);
	}

	findOne(attrs){
		return this.first(attrs);
	}
}