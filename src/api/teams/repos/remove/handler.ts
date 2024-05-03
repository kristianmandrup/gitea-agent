import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { removeTeamRepo } from "./definition";

export const buildRemoveTeamRepoHandler = (main: IMainController) =>
  new RemoveTeamRepoActionHandler(main);

export class RemoveTeamRepoActionHandler extends CompositeActionHandler {
  name = "remove_team_repo";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { id, organization, repository } = action.fnArgs;
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
