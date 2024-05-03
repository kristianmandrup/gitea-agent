import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createTeam } from "./definition";

export const buildCreateOrgTeamHandler = (main: IMainController) =>
  new CreateOrgTeamActionHandler(main);

export class CreateOrgTeamActionHandler extends CompositeActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name, description, permission } = action.parameters;
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
