import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildAddCollaboratorHandler } from "./add";
import { buildCheckCollaboratorHandler } from "./check";
import { buildDeleteCollaboratorHandler } from "./delete";
import { buildListCollaboratorsHandler } from "./list";

export const buildCollaboratorHandler = (main: IMainController) =>
  new RepoCollaboratorActionHandler(main);

export class RepoCollaboratorActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildAddCollaboratorHandler,
      buildCheckCollaboratorHandler,
      buildDeleteCollaboratorHandler,
      buildListCollaboratorsHandler,
    ];
  }
}
