import { Action, LeafActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { listTeamRepositories } from "./definition";

export const buildListOrgTeamReposHandler = (main: IMainController) =>
  new ListOrgTeamReposActionHandler(main);

export class ListOrgTeamReposActionHandler extends LeafActionHandler {
  name = "list_team_repos";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { limit } = action.parameters;
    const data = await this.main.orgs.teams.list({ limit });
    console.log({ data });
  }

  get definition(): any {
    return listTeamRepositories;
  }
}
