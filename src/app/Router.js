import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import LayoutComponent from 'components/common/Layout/';
import RouterExt from 'extensions/Router';
import HistoryExt from 'extensions/History';

/**
 * App Router
 * используются вставки Backbone.Router
 */
export default class Router  {

	constructor(options) {

		var self = this;
		this.node = options.node;
		this.config = this.getContext().getStore('App').get('configs').routes;
		this.waiting = {};
		this.routes = {};
		this.controllers = {};

		// разбираю конфиг с роутами
		for(var n in this.config){

			var controllerSysName = this.config[n].controller.toLowerCase();

			if(!this.controllers[controllerSysName]){
				var ControllerClass = require('controllers/' + this.config[n].controller);
				this.controllers[controllerSysName] = new ControllerClass();
			}

			var Controller = this.controllers[controllerSysName];
			var controllerActionName = (Controller[n])? n : 'error';
			var matches = this.config[n].match;

			for(var m in matches){

				if(this.routes[matches[m]]){
					throw 'Dublicate route';
				}

				this.routes[matches[m]] = (function(actionName, cfg, controller){

					var routeArguments = Array.prototype.slice.call(arguments, 0);
					routeArguments.splice(0, 3);
					self.runRoute(routeArguments, actionName, cfg, controller);

				}).bind(this, controllerActionName, this.config[n], Controller);
			}
		}

		this.history = new HistoryExt({router: this});

		RouterExt.prototype.constructor.apply(this, arguments);
	}

	runRoute(routeArguments, actionName, cfg, controller){

		var self = this;
		var routeAttributes = this.getContext().getStore('Router').get('attrs');
		var routeUpdateAttributes = {};
		var queryKeys = _.map(cfg.pattern.match(/(:)([a-z0-9]+)/ig), item => (item.substr(1, item.length)));
		var query = _.object(queryKeys, routeArguments);

		// проверяю права доступа
		controller.checkPermissions(actionName, query, function(error){

			// первый перехват ошибок
			if(error){
				console.log('e', error)
			}

			// выполняю beforeAction у контроллера
			controller.beforeAction(query, {action:actionName}, error, function(req, errors){

				// копирую переменные роутинга
				_.extend(routeUpdateAttributes, routeAttributes, req);

				// если before action выполнился успешно - выполняю action
				controller[actionName].call(controller, req, function(err){

					if(err){
						throw err;
					}

					self.getContext().getStore('Router').set('attrs', routeUpdateAttributes);

				}, errors);


			});
		});
	}

	/**
	 * Получение глобального контекста
	 * @returns {*}
	 */
	getContext() {
		return window.__SPA001.fn.getContext();
	}

	start(){
		ReactDOM.render(<LayoutComponent />, this.node);
		this.history.start({pushState: false});
	}
}

// костылек
_.extend(Router.prototype, RouterExt.prototype);