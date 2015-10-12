import Events from 'extensions/Events';
import _ from 'underscore';

export default class BaseModel extends Events {

	constructor(data, options) {
		super();

		this._db = this.getContext().getDB();
		this.attributes = {};
		this._attributes = {};

		var defaults = this.defaults();
		for (var a in defaults) {
			if (typeof defaults[a] !== 'function') continue;
			var childData = data[a] || {};
			var childModel = new defaults[a](childData, options);
			data[a] = childModel;
		}

		this._db.addModel(this);
		this.set(_.extend({}, defaults, data));
		this.initialize.apply(this, arguments);
	}

	/**
	 * Получение глобального контекста
	 * @returns {*}
	 */
	getContext() {
		return window.__SPA001.fn.getContext();
	}

	/**
	 * Поля по умолчанию
	 * @returns {{}}
	 */
	defaults() {
		return {};
	}

	/**
	 * Установить значение в атрибуты
	 * учитывая вложенные документы
	 * @param key
	 * @param val
	 * @param options
	 * @returns {BaseModel}
	 */
	set(key, val, options) {

		if (key == null) return this;

		var attrs;
		if (typeof key === 'object') {
			attrs = key;
			options = val;
		} else {
			(attrs = {})[key] = val;
		}

		options || (options = {});

		this._attributes = _.clone(this.attributes);
		var changed = [];
		var unset = false;
		var silent = false;

		for (var k in attrs) {

			var val = attrs[k];

			if (!this._attributes[k]) {
				changed.push(k);
			} else {
				if (this._attributes[k] instanceof BaseModel) {
					this._attributes[k].set(attrs[k], options);
					val = prev[k];
					changed.push(k);
				} else {
					if (!_.isEqual(attrs[k], this._attributes[k])) {
						changed.push(k);
					}
				}
			}
			unset ? delete this.attributes[k] : this.attributes[k] = val;
		}

		if (!silent) {
			if (changed.length) this._pending = options;
			for (var i = 0; i < changed.length; i++) {
				this.trigger('change:' + changed[i], this, this.attributes[changed[i]], options);
			}
		}

		if (!silent) {
			while (this._pending) {
				options = this._pending;
				this._pending = false;
				this.trigger('change', this, options);
			}
		}
		this._pending = false;

		return this;
	}

	/**
	 * получить атрибут
	 * @param name
	 * @returns {*}
	 */
	get(name) {
		return this.attributes[name];
	}

	/**
	 * Выполнится после конструктора
	 */
	initialize() {}

	/**
	 * Получить модель по ID
	 * @param id
	 * @returns {*}
	 */
	findById(id) {
		return this._db.findById(this.constructor.name, id);
	}

	/**
	 * Получить одну (первую) модель по атрибутам
	 * @param attrs
	 * @returns {*}
	 */
	findOne(attrs) {
		return this._db.findOne(this.constructor.name, attrs);
	}

	/**
	 * получить массив моделей по атрибутам
	 * @param attrs
	 * @returns {*}
	 */
	where(attrs) {
		return this._db.where(this.constructor.name, attrs);
	}

	/**
	 * вернуть json копию представление модели
	 * (учитывая дочерние документы)
	 * @returns {*}
	 */
	toJSON() {
		var attr = {};
		for (var n in this.attributes) {
			attr[n] = this.attributes[n] instanceof BaseModel ? this.attributes[n].toJSON() : this.attributes[n];
		}
		return _.clone(attr);
	}
}