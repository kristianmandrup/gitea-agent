import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import { Action } from "./action";
import { ActionHandlerType, IActionHandler } from "./handler";

export class LeafActionHandler
  extends GiteaMainAccessor
  implements IActionHandler
{
  name = "unknown";
  type: ActionHandlerType = "leaf";

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
