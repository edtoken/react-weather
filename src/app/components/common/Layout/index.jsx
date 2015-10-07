import React from 'react';
import BaseComponent from 'core/BaseComponent';
import PreloaderComponent from 'components/common/Preloader/';

/**
 * Layout component
 */

export default class LayoutComponent extends BaseComponent {

	constructor(props) {
		super(props);
		this.state = this.createState(props);
		this.importantFields = ['store'];
	}

	createState(props) {

		var context = this.getContext();
		var storage = context.getStore('App');
		var UserModel = storage.get('child');

		return {
			store: storage,
			user: UserModel
		}
	}

	render() {

		if(!this.ready()){
			return (<PreloaderComponent />);
		}

		return (<div>Layout</div>);
	}
}