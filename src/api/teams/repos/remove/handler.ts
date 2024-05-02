import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { removeTeamRepo } from "./definition";

export const buildRemoveTeamRepoHandler = (main: IMainController) =>
  new RemoveTeamRepoActionHandler(main);

export class RemoveTeamRepoActionHandler extends CompositeActionHandler {
  name = "remove_team_repo";

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
    const data = await this.main.teams.repos.remove(
      id,
      organization,
      repository
    );
    console.log({ data });
  }

  get definition(): any {
    return removeTeamRepo;
  }
}
