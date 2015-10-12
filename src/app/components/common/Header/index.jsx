import React from 'react';
import BaseComponent from 'core/Component';

/**
 * Base Site header component
 */
export default class HeaderComponent extends BaseComponent {


	render(){

		return(<div>
			<ul>
				<li><a href="#">Index</a></li>
				<li><a href="#about">List</a></li>
				<li><a href="#about/555/777">List</a></li>
			</ul>
		</div>);
	}
}