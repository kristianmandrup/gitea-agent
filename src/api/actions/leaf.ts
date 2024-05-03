import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import { Action } from "./action";
import { ActionHandlerType, IActionHandler } from "./handler";
import { ActionValidator, IActionValidator } from "./validator";

export interface ILeafActionHandler {
  definition(): any;
  handle(action: Action): Promise<void>;
  validate(action: Action): boolean;
}

export class LeafActionHandler
  extends GiteaMainAccessor
  implements IActionHandler
{
  name = "unknown";
  type: ActionHandlerType = "leaf";
  validator: IActionValidator;

  constructor(main: IMainController) {
    super(main);
    this.initialize();
    this.validator = this.createValidator();
  }

  createValidator() {
    return new ActionValidator(this);
  }

  validate(action: Action): boolean {
    return this.validator.validate(action);
  }

  notify(label: string, data: any) {
    this.main.notify(label, data);
  }

  notifyError(label: string, data: any) {
    this.main.notifyError(label, data);
  }

  get definition(): any {
    throw new Error("Missing definition");
  }

  initialize() {}

  async handle(_action: Action) {
    //
  }
}
