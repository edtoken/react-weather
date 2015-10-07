import _ from 'underscore';

var defaultId = 0x00000000000000000000;
var currentId = defaultId;

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

	addModel(obj) {

		var name = obj.constructor.name;
		if(!this._data[name]) this._data[name] = new Model();

		var _id = getNewId();
		obj.attributes._id = _id;
		obj._id = _id;
		this._data[name].push(obj);

		return _id;
	}

	findById(name, id){
		if(!this._data[name]){
			throw 'Model not found';
		}
		return this._data[name].findById(id);
	}

	where(name, attrs){
		if(!this._data[name]){
			throw 'Model not found';
		}
		return this._data[name].where(attrs);
	}

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