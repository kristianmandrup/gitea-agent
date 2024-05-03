export interface IAction {
  name: string;
  fnArgs: any;
}

export class Action implements IAction {
  name: string;
  fnArgs: any;

  constructor(name: string, fnArgs: any) {
    this.name = name;
    this.fnArgs = fnArgs;
  }
}
