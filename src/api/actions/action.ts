export interface IAction {
  name: string;
  arguments: any;
}

export class Action implements IAction {
  name: string;
  arguments: any;

  constructor(name: string, parameters: any) {
    this.name = name;
    this.arguments = parameters;
  }

  static createFrom(actionObj: any) {
    return new Action(actionObj.name, JSON.parse(actionObj.arguments));
  }
}
