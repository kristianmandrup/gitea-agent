import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listTeamMembers } from "./definition";

export const buildListTeamHandler = (main: IMainController) =>
  new ListTeamActionHandler(main);

export class ListTeamActionHandler extends CompositeActionHandler {
  name = "list_team_members";

  async handle(_action: Action) {
    const data = await this.main.teams.members.list();
    console.log({ data });
  }

  get definition(): any {
    return listTeamMembers;
  }
}
