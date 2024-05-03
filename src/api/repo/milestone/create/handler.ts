import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createMilestone } from "./definition";

export const buildCreateMilestoneHandler = (main: IMainController) =>
  new CreateMilestoneActionHandler(main);

export class CreateMilestoneActionHandler extends CompositeActionHandler {
  name = "create_milestone";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const opts = action.fnArgs;
    const data = await this.main.repos.milestones.create(opts);
    console.log({ data });
  }

  get definition(): any {
    return createMilestone;
  }
}
