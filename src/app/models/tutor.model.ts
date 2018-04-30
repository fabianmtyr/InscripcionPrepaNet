export class Tutor {
    public id: number;
    public nombre: Names;
    public matricula: string;
    public correo: string;
    public campus: string;
    public promedio: number;
    public calificacionCurso: number;
    public cumplePromedio: boolean;
    public pasoCurso: boolean;
    public semestre: number;
    public carrera: string;
    public materias: Materias;
}

export class Names {
	public nombre: string;
	public apellido: string;
}

export class Materias {
    public materia1: string;
    public materia2: string;
    public materia3: string;
}

/*
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
*/