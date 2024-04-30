import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getMilestone } from "./definition";

export const buildGetMilestoneHandler = (main: IMainController) =>
  new GetMilestoneActionHandler(main);

export class GetMilestoneActionHandler extends CompositeActionHandler {
  name = "get_release";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = action.fnArgs.id;
    const data = await this.main.repos.milestones.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getMilestone;
  }
}
