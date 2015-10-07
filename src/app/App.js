import Context from './Context';
import Router from './Router';

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

		this.context = new Context({config:config});
		this.router = new Router({context:this.context, node:node});
		this.router.start();
	}

	getContext(){
		console.log('get', this);
		return this.context;
	}
}