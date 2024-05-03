import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { editRepository } from "./definition";

export const buildEditRepositoryHandler = (main: IMainController) =>
  new EditRepositoryActionHandler(main);

export class EditRepositoryActionHandler extends CompositeActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.parameters;
    const data = await this.main.repos.branches.create(name);
    console.log({ data });
  }

  get definition(): any {
    return editRepository;
  }
}
