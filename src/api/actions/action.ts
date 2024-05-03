export interface IAction {
  name: string;
  parameters: any;
}

export class Action implements IAction {
  name: string;
  parameters: any;

  constructor(name: string, parameters: any) {
    this.name = name;
    this.parameters = parameters;
  }
}
