import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createTeam } from "./definition";

export const buildCreateOrgTeamHandler = (main: IMainController) =>
  new CreateOrgTeamActionHandler(main);

export class CreateOrgTeamActionHandler extends CompositeActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    const { name, description, permission } = action.fnArgs;
    if (!name) {
      throw new Error("Missing team name");
    }
    const data = await this.main.orgs.teams.create(name, {
      name,
      description,
      permission,
    });
    console.log({ data });
  }

  get definition(): any {
    return createTeam;
  }
}
