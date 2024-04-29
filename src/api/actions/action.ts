export class Action {
  name: string;
  fnArgs: any;

  constructor(name: string, fnArgs: any) {
    this.name = name;
    this.fnArgs = fnArgs;
  }
}
