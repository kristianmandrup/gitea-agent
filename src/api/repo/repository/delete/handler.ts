import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteRepository } from "./definition";

export const buildDeleteRepositoryHandler = (main: IMainController) =>
  new DeleteRepositoryActionHandler(main);

export class DeleteRepositoryActionHandler extends CompositeActionHandler {
  name = "delete_branch";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.arguments;
    const data = await this.main.repos.branches.delete(name);
    console.log({ data });
  }

  get definition(): any {
    return deleteRepository;
  }
}
