import BaseModel from 'core/Model';

export default class UserModel extends BaseModel {
	defaults() {
		return {
			logged: false,
			name: '',
			lastName: ''
		}
	}
}