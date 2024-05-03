import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { createOrg } from "./definition";

export const buildCreateOrgHandler = (main: IMainController) =>
  new CreateOrgActionHandler(main);

export class CreateOrgActionHandler extends CompositeActionHandler {
  name = "create_organization";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { description, fullName, username } = action.parameters;
    const opts = {
      username,
      description,
      full_name: fullName,
    };
    const data = await this.main.admin.createOrg(username, opts);
    console.log({ data });
  }

  get definition(): any {
    return createOrg;
  }
}
