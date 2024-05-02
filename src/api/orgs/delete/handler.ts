import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { deleteOrganization } from "./definition";

export const buildDeleteOrganizationHandler = (main: IMainController) =>
  new DeleteOrganizationActionHandler(main);

export class DeleteOrganizationActionHandler extends CompositeActionHandler {
  name = "delete_branch";

  async handle(action: Action) {
    const { name } = action.fnArgs;
    if (!name) {
      throw new Error("Missing name");
    }
    const data = await this.main.orgs.delete(name);
    console.log({ data });
  }

  get definition(): any {
    return deleteOrganization;
  }
}
