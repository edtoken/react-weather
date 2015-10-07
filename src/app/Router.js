import React from 'react';
import ReactDOM from 'react-dom';
import LayoutComponent from 'components/common/Layout/';

/**
 * App Router
 */
export default class Router {

	constructor(data) {
		this.context = data.context;
		this.node = data.node;
		ReactDOM.render(<LayoutComponent />, this.node);
	}

	start() {

	}
}