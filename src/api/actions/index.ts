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
  name: string;
  handle(action: Action): Promise<void>;
}

export class LeafActionHandler
  extends GiteaMainAccessor
  implements IActionHandler
{
  name = "unknown";

  constructor(main: IMainController) {
    super(main);
    this.initialize();
  }

  initialize() {}

  async handle(action: Action) {
    //
  }
}

export type ActionHandlerFactoryFn = (main: IMainController) => IActionHandler;

export class ActionHandler extends LeafActionHandler {
  handlerRegistry: ActionHandlerRegistry = {};

  get handlers(): ActionHandlerFactoryFn[] {
    return [];
  }

  buildHandlers() {
    return this.handlers.map((factory) => factory(this.main));
  }

  initialize() {
    for (const handler of this.buildHandlers()) {
      this.handlerRegistry[handler.name] = handler;
    }
  }

  get definitions(): any[] {
    return [];
  }

  async handle(action: Action) {
    const handler = this.handlerRegistry[action.name];
    if (!handler) {
      // notify no handler for action
      return;
    }
    await handler.handle(action);
  }
}

export type ActionHandlerRegistry = Record<string, IActionHandler>;
