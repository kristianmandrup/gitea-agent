import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";

export class Action {
  name: string;
  fnArgs: any;

  constructor(name: string, fnArgs: any) {
    this.name = name;
    this.fnArgs = fnArgs;
  }
}

export interface IActionHandler {
  handle(action: Action): Promise<void>;
}

export class ActionHandler extends GiteaMainAccessor {
  constructor(main: IMainController) {
    super(main);
    this.initialize();
  }

  initialize() {}

  async handle(action: Action) {
    //
  }
}

export type ActionHandlerRegistry = Record<string, IActionHandler>;
