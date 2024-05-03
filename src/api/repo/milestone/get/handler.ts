import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getMilestone } from "./definition";

export const buildGetMilestoneHandler = (main: IMainController) =>
  new GetMilestoneActionHandler(main);

export class GetMilestoneActionHandler extends CompositeActionHandler {
  name = "get_milestone";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = action.parameters.id;
    const data = await this.main.repos.milestones.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getMilestone;
  }
}
