export class User {

		public id: number;
		public fname: string;
		public lname: string;
		public email: string;
		public password: string;
		public campus: string;

}

export interface UserResponse {
	email: boolean;
	password: boolean;
}