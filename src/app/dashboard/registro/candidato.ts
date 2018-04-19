export class name {
    constructor(
        public first: string,
        public last: string
    ){}
}

export class Candidato {

  constructor(
    public id: number,
    public name: name,
    public matricula: string,
    public email: string,
    public grades?: number,
    public course?:number
  ) {  }
  

}