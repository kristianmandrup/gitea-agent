import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listMilestones } from "./definition";

export const buildListMilestonesHandler = (main: IMainController) =>
  new ListMilestonesActionHandler(main);

export class ListMilestonesActionHandler extends CompositeActionHandler {
  name = "list_milestones";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.repos.milestones.list();
    console.log({ data });
  }

  get definition(): any {
    return listMilestones;
  }
}
