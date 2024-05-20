import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { listOrganizationRepos } from "./definition";

export const buildListOrganizationReposHandler = (main: IMainController) =>
  new ListOrganizationReposActionHandler(main);

export class ListOrganizationReposActionHandler extends CompositeActionHandler {
  name = "list_organization_repos";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name, limit } = action.arguments;
    const data = await this.main.orgs.listRepos({ limit }, name);
    console.log({ data });
  }

  get definition(): any {
    return listOrganizationRepos;
  }
}
