import { Action, LeafActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { addTeamRepo } from "./definition";

export const buildAddOrgTeamRepoHandler = (main: IMainController) =>
  new AddOrgTeamRepoActionHandler(main);

export class AddOrgTeamRepoActionHandler extends LeafActionHandler {
  name = "add_team_repo";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id } = action.arguments;
    const data = await this.main.orgs.teams.repos.add(id);
    console.log({ data });
  }

  get definition(): any {
    return addTeamRepo;
  }
}
