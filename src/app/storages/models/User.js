import BaseModel from 'core/BaseModel';

export default class UserModel extends BaseModel {
	defaults() {
		return {
			logged: false,
			name: '',
			lastName: ''
		}
	}
}