import React from 'react';
import _ from 'underscore';

/**
 * Base Component Class
 */
export default class BaseComponent extends React.Component {

	constructor(props){
		super(props);
		// поля которые должны быть обязательно заполнены в state для отрисовки
		this.importantFields = [];
	}

	/**
	 * используется для вычисления state
	 * @param props
	 * @returns {{}}
	 */
	createState(props){
		return {}
	}

	/**
	 * Получение глобального контекста
	 * @returns {*}
	 */
	getContext(){
		return window.__SPA001.fn.getContext();
	}

	/**
	 * готов ли компонент к отрисовке
	 */
	ready(){
		if(!this.importantFields.length) return true;
		return (_.compact(_.values(_.pick(this.state, this.importantFields))).length === this.importantFields.length);
	}
}