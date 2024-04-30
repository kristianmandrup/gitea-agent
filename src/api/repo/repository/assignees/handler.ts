import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getAssignees } from "./definition";

export const buildGetAssigneesHandler = (main: IMainController) =>
  new GetAssigneesActionHandler(main);

export class GetAssigneesActionHandler extends CompositeActionHandler {
  name = "get_assignees";

  async handle(_action: Action) {
    const data = await this.main.repos.getAssignees();
    console.log({ data });
  }

  get definition(): any {
    return getAssignees;
  }
}
