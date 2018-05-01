export class User {

		public id: number;
		public name: string;
		public email: string;
		public password: string;
		public campus: string;

}


export interface UserResponse {
	email: boolean;
	password: boolean;
	name: string;
	campus: string;
}