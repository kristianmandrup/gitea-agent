import { Action, ActionHandler, ActionHandlerRegistry } from "../../actions";
import { buildCreateBranchHandler, createBranch } from "./create-branch";
import { buildDeleteBranchHandler, deleteBranch } from "./delete-branch";

export class RepoBranchActionHandler extends ActionHandler {
  handlerRegistry: ActionHandlerRegistry = {};

  get handlers() {
    return [buildCreateBranchHandler, buildDeleteBranchHandler].map((factory) =>
      factory(this.main)
    );
  }

  initialize() {
    for (const handler of this.handlers) {
      this.handlerRegistry[handler.name] = handler;
    }
  }

  get definitions() {
    return [createBranch, deleteBranch];
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
