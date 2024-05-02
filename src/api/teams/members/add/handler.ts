import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { addTeamMember } from "./definition";

export const buildAddTeamHandler = (main: IMainController) =>
  new AddTeamActionHandler(main);

export class AddTeamActionHandler extends CompositeActionHandler {
  name = "add_team_member";

  async handle(action: Action) {
    const { username } = action.fnArgs;
    if (!username) {
      throw new Error("Missing username");
    }
    const data = await this.main.teams.members.add(username);
    console.log({ data });
  }

  get definition(): any {
    return addTeamMember;
  }
}
