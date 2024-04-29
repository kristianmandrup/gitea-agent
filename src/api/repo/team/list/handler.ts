import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listTeams } from "./definition";

export const buildListTeamHandler = (main: IMainController) =>
  new ListTeamActionHandler(main);

export class ListTeamActionHandler extends CompositeActionHandler {
  name = "list_branch";

  async handle(_action: Action) {
    const data = await this.main.repos.branches.list();
    console.log({ data });
  }

  get definition(): any {
    return listTeams;
  }
}
