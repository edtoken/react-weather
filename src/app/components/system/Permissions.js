import _ from 'underscore';

/**
 * Получение глобального контекста
 * @returns {*}
 */
function getContext() {
	return window.__SPA001.fn.getContext();
}

/**
 * Работа с правами доступа
 */
export default class Permissions {
}

/**
 * список разных проверок доступов
 * ключ - имя, значение - функция/bool
 * @type {{}}
 */
Permissions._actions = {};
Permissions._actions.allow = true;
Permissions._actions.deny = false;
Permissions._actions.logged = function (options) {
	console.log('getContext', getContext());
}

/**
 * Методы для проверки прав
 * @type {{}}
 */
Permissions.list = {};

/**
 * Всегда разрешено
 * @param options
 * @returns {boolean}
 */
Permissions.list.allow = function (options) {
	return Permissions._actions.allow;
};

/**
 * Всегда запрещено
 * @param options
 * @returns {boolean}
 */
Permissions.list.deny = function (options) {
	return Permissions._actions.deny;
};

/**
 * Проверка авторизации пользователя
 * @param options
 */
Permissions.list.logged = function (options) {
	return Permissions._actions.logged(options);
};

/**
 * Простая проверка списка правил
 * вернет true - все проверки выполнены, false - одна из них не выполнилась
 * @param arr
 * @param options
 * @returns {*}
 */
Permissions.check = function (arr, options) {
	if (!arr || !arr.length) return true;
	return _.every(arr, item => ((Permissions.list[item])
		? Permissions.list[item](options)
		: (console.warn('Not found permission [' + item + ']'), false)));
};

/**
 * Сложная проверка списка правил
 * вернет все правила которые не были пройдены || false
 * @param arr
 * @param options
 * @returns {*}
 */
Permissions.checkErrors = function (arr, options, first) {
	if (!arr || !arr.length) return false;

	var errors = _.compact(_.map(arr, function (item) {

		if (!Permissions.list[item]) {
			return {
				name: item,
				error: new Error('Not found permission [' + item + ']')
			};
		}

		if (!Permissions.list[item](options)) {
			return {
				name: item,
				error: new Error(item)
			}
		}

		return false;
	}));

	return (errors.length)
		? ((first) ? _.first(errors) : errors)
		: false;
};

/**
 * Сложная проверка списка правил
 * вернет первое не пройденное правило || false
 * @param arr
 * @param options
 * @returns {*}
 */
Permissions.checkError = function (arr, options) {
	return Permissions.checkErrors(arr, options, false);
};