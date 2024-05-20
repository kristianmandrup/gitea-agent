import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createUser } from "./definition";

export const buildCreateUserHandler = (main: IMainController) =>
  new CreateUserActionHandler(main);

export class CreateUserActionHandler extends CompositeActionHandler {
  name = "create_user";

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
    return createUser;
  }
}
