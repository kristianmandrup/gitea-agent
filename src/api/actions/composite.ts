import { Action } from "./action";
import {
  ActionHandlerFactoryFn,
  ActionHandlerType,
  IActionHandler,
} from "./handler";
import { LeafActionHandler } from "./leaf";

export type ActionHandlerRegistry = Record<string, IActionHandler>;

export class CompositeActionHandler extends LeafActionHandler {
  type: ActionHandlerType = "composite";
  handlerRegistry: ActionHandlerRegistry = {};
  compositeHandlerRegistry: ActionHandlerRegistry = {};

  get handlers(): ActionHandlerFactoryFn[] {
    return [];
  }

  buildHandlers() {
    return this.handlers.map((factory) => factory(this.main));
  }

  initialize() {
    for (const handler of this.buildHandlers()) {
      this.registerHandler(handler);
    }
  }

  get definitions(): any[] {
    return [];
  }

  isComposite(handler: IActionHandler) {
    return handler.type === "composite";
  }

  isLeaf(handler: IActionHandler) {
    return handler.type === "leaf";
  }

  registerComposite(handler: IActionHandler) {
    if (!this.isComposite(handler)) {
      return;
    }
    this.compositeHandlerRegistry[handler.name] = handler;
    return true;
  }

  registerLeaf(handler: IActionHandler) {
    if (!this.isLeaf(handler)) {
      return;
    }
    this.handlerRegistry[handler.name] = handler;
    return true;
  }

  registerHandler(handler: IActionHandler) {
    this.registerComposite(handler) || this.registerLeaf(handler);
  }

  get compositeHandlers() {
    return Object.values(this.compositeHandlerRegistry);
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
