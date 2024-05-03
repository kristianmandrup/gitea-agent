import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listAssignees } from "./definition";

export const buildGetAssigneesHandler = (main: IMainController) =>
  new GetAssigneesActionHandler(main);

export class GetAssigneesActionHandler extends CompositeActionHandler {
  name = "get_assignees";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.repos.listAssignees();
    console.log({ data });
  }

  get definition(): any {
    return listAssignees;
  }
}
