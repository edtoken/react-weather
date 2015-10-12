import Context from './Context';
import Router from './Router';
import Db from 'extensions/db/';

/**
 * Core App
 */
export default class App {

	constructor(config, node){

		// global
		window.__SPA001 = {};
		window.__SPA001.app = this;
		window.__SPA001.fn = {};
		window.__SPA001.fn.getContext = this.getContext.bind(this);

		this.db = new Db({});
		this.context = new Context();
		this.context.initialize({config:config, db:this.db});
		this.router = new Router({node:node});
		this.router.start();
	}

	getContext(){
		return this.context;
	}
}