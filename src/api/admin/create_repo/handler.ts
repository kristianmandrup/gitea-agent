import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { createRepository } from "./definition";

export const buildCreateRepoHandler = (main: IMainController) =>
  new CreateRepoActionHandler(main);

export class CreateRepoActionHandler extends CompositeActionHandler {
  name = "create_repo";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { username, ...rest } = action.fnArgs;
    const data = await this.main.admin.createRepo(username, rest);
    console.log({ data });
  }

  get definition(): any {
    return createRepository;
  }
}
