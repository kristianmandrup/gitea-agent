import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { createOrganization } from "./definition";

export const buildCreateOrganizationHandler = (main: IMainController) =>
  new CreateOrganizationActionHandler(main);

export class CreateOrganizationActionHandler extends CompositeActionHandler {
  name = "create_organization";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name, description, username, visibility } = action.parameters;
    const data = await this.main.orgs.create(name, {
      full_name: name,
      description,
      username,
      visibility,
    });
    console.log({ data });
  }

  get definition(): any {
    return createOrganization;
  }
}
