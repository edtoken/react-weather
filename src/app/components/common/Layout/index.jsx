import React from 'react';
import BaseComponent from 'core/Component';
import PreloaderComponent from 'components/common/Preloader';
import HeaderComponent from 'components/common/Header'

/**
 * Layout component
 */

export default class LayoutComponent extends BaseComponent {

	constructor(props) {
		super(props);
		this.state = this.createState(props);
		this.importantFields = ['store', 'user', 'storeRouter'];
	}

	createState(props) {

		var context = this.getContext();
		var storage = context.getStore('App');
		var storeRouter = context.getStore('Router');
		var UserModel = storage.get('child');

		return {
			store: storage,
			storeRouter: storeRouter,
			user: UserModel
		}
	}

	render() {

		if (!this.ready()) {
			return (<PreloaderComponent />);
		}

		return (<div>
			<HeaderComponent />
			Layout
		</div>);
	}
}