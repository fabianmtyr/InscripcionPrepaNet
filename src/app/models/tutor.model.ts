export class Tutor {
    public id: number;
    public name: Names;
    public matricula: string;
    public correo: string;
    public email: string;
    public grades?: number;
    public course?: string;
    public campus: string;
}

export class Names {
	public first: string;
	public last: string;
}