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
  type: string;
  handle(action: Action): Promise<void>;
}

export class LeafActionHandler
  extends GiteaMainAccessor
  implements IActionHandler
{
  name = "unknown";
  type = "leaf";

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
  type = "composite";
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

  get compositeHandlers() {
    const handlers: IActionHandler[] = Object.values(this.handlerRegistry);
    return handlers.filter(
      (handler: IActionHandler) => handler.type === "composite"
    );
  }

  async handleComposites(action: Action) {
    for (const composite of this.compositeHandlers) {
      await composite.handle(action);
    }
  }

  async handleLeaves(action: Action) {
    const handler = this.handlerRegistry[action.name];
    if (!handler) {
      // notify no handler for action
      return false;
    }
    return await handler.handle(action);
  }

  async handle(action: Action) {
    const result = await this.handleLeaves(action);
    if (result) {
      return;
    }
    await this.handleComposites(action);
  }
}

export type ActionHandlerRegistry = Record<string, IActionHandler>;
