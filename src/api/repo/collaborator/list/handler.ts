import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listCollaborators } from "./definition";

export const buildListCollaboratorsHandler = (main: IMainController) =>
  new ListCollaboratorActionHandler(main);

export class ListCollaboratorActionHandler extends CompositeActionHandler {
  name = "list_branch";

  async handle(_action: Action) {
    const data = await this.main.repos.branches.list();
    console.log({ data });
  }

  get definition(): any {
    return listCollaborators;
  }
}
