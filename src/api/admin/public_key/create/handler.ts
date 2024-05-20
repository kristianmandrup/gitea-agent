import { Action, LeafActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createPublicKey } from "./definition";

export const buildCreatePublicKeyHandler = (main: IMainController) =>
  new CreatePublicKeyActionHandler(main);

export class CreatePublicKeyActionHandler extends LeafActionHandler {
  name = "create_organization";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name, description, username, visibility } = action.arguments;
    const data = await this.main.orgs.create(name, {
      full_name: name,
      description,
      username,
      visibility,
    });
    console.log({ data });
  }

  get definition(): any {
    return createPublicKey;
  }
}
