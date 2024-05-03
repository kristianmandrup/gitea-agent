import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listCollaborators } from "./definition";

export const buildListCollaboratorsHandler = (main: IMainController) =>
  new ListCollaboratorActionHandler(main);

export class ListCollaboratorActionHandler extends CompositeActionHandler {
  name = "list_collaborators";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.repos.branches.list();
    console.log({ data });
  }

  get definition(): any {
    return listCollaborators;
  }
}
