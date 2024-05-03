import { Action } from "./action";
import {
  ActionHandlerFactoryFn,
  ActionHandlerType,
  IActionHandler,
} from "./handler";
import { ILeafActionHandler, LeafActionHandler } from "./leaf";

export type ActionHandlerRegistry = Record<string, IActionHandler>;

export interface ICompositeActionHandler extends ILeafActionHandler {
  definitions: any[];
  registerHandler(handler: IActionHandler): void;
  removeHandler(handler: IActionHandler): void;
}

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

  get definition(): any {
    return this.definitions;
  }

  get definitions(): any[] {
    const leafDefinitions = this.leafHandlers.map(
      (handler) => handler.definition
    );
    const compositeDefinitions = this.compositeHandlers.map(
      (handler) => handler.definition
    );
    return [...leafDefinitions, ...compositeDefinitions];
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

  removeLeaf(handler: IActionHandler) {
    if (!this.isLeaf(handler)) {
      return;
    }
    delete this.handlerRegistry[handler.name];
    return true;
  }

  removeComposite(handler: IActionHandler) {
    if (!this.isComposite(handler)) {
      return;
    }
    delete this.compositeHandlerRegistry[handler.name];
    return true;
  }

  registerHandler(handler: IActionHandler) {
    this.registerComposite(handler) || this.registerLeaf(handler);
  }

  removeHandler(handler: IActionHandler) {
    this.removeComposite(handler) || this.removeLeaf(handler);
  }

  removeLeafByName(name: string) {
    delete this.handlerRegistry[name];
    return true;
  }

  removeCompositeByName(name: string) {
    delete this.compositeHandlerRegistry[name];
    return true;
  }

  removeHandlerByName(name: string) {
    this.removeCompositeByName(name) || this.removeLeafByName(name);
  }

  get compositeHandlers() {
    return Object.values(this.compositeHandlerRegistry);
  }

  get leafHandlers() {
    return Object.values(this.handlerRegistry);
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
