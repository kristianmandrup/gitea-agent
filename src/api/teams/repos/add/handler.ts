import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { addTeamRepo } from "./definition";

export const buildAddTeamRepoHandler = (main: IMainController) =>
  new AddTeamRepoActionHandler(main);

export class AddTeamRepoActionHandler extends CompositeActionHandler {
  name = "add_team_repo";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id, organization, repository } = action.parameters;
    const data = await this.main.teams.repos.add(id, organization, repository);
    console.log({ data });
  }

  get definition(): any {
    return addTeamRepo;
  }
}
