import { Action, LeafActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { removeTeamRepo } from "./definition";

export const buildRemoveOrgTeamRepoHandler = (main: IMainController) =>
  new ListOrgTeamActionHandler(main);

export class ListOrgTeamActionHandler extends LeafActionHandler {
  name = "list_teams";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id } = action.parameters;
    const data = await this.main.orgs.teams.repos.remove(id);
    console.log({ data });
  }

  get definition(): any {
    return removeTeamRepo;
  }
}
