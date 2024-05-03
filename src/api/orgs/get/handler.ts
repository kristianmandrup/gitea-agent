import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { getOrganization } from "./definition";

export const buildGetOrganizationHandler = (main: IMainController) =>
  new GetOrganizationActionHandler(main);

export class GetOrganizationActionHandler extends CompositeActionHandler {
  name = "get_organization";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { name } = action.fnArgs;
    const data = await this.main.orgs.getByName(name);
    console.log({ data });
  }

  get definition(): any {
    return getOrganization;
  }
}
