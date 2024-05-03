import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import { Action } from "./action";
import { ActionHandlerType, IActionHandler } from "./handler";

export interface ILeafActionHandler {
  definition(): any;
  handle(action: Action): Promise<void>;
}

export class LeafActionHandler
  extends GiteaMainAccessor
  implements IActionHandler
{
  name = "unknown";
  type: ActionHandlerType = "leaf";

  validateRequired(action: Action) {
    const { required } = this.definition;
    for (const param of this.definition.required) {
      if (!action.fnArgs[param]) {
        this.notifyError("action:required:missing", {
          action,
          required,
          param,
        });
      }
    }
  }

  notify(label: string, data: any) {
    this.main.notify(label, data);
  }

  notifyError(label: string, data: any) {
    this.main.notifyError(label, data);
  }

  constructor(main: IMainController) {
    super(main);
    this.initialize();
  }

  get definition(): any {
    throw new Error("Missing definition");
  }

  initialize() {}

  async handle(_action: Action) {
    //
  }
}
