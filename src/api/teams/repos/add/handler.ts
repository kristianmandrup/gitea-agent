import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { addTeamRepo } from "./definition";

export const buildAddTeamRepoHandler = (main: IMainController) =>
  new AddTeamRepoActionHandler(main);

export class AddTeamRepoActionHandler extends CompositeActionHandler {
  name = "add_team_repo";

  async handle(action: Action) {
    const { id, organization, repository } = action.fnArgs;
    if (!id) {
      throw new Error("Missing id");
    }
    if (!organization) {
      throw new Error("Missing organization");
    }
    if (!repository) {
      throw new Error("Missing repository");
    }
    const data = await this.main.teams.repos.add(id, organization, repository);
    console.log({ data });
  }

  get definition(): any {
    return addTeamRepo;
  }
}
