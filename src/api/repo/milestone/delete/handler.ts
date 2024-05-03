import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteMilestone } from "./definition";

export const buildDeleteMilestoneHandler = (main: IMainController) =>
  new DeleteMilestoneActionHandler(main);

export class DeleteMilestoneActionHandler extends CompositeActionHandler {
  name = "delete_milestone";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const id = action.fnArgs.id;
    const data = await this.main.repos.milestones.delete(id);
    console.log({ data });
  }

  get definition(): any {
    return deleteMilestone;
  }
}
