import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";

export const buildDeleteBranchHandler = (main: IMainController) =>
  new DeleteBranchActionHandler(main);

export class DeleteBranchActionHandler extends CompositeActionHandler {
  name = "delete_branch";
  async handle(action: Action) {
    const data = await this.main.repos.branches.delete(action.name);
    console.log({ data });
  }
}
