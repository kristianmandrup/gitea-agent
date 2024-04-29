import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildAddCollaboratorHandler } from "./add";
import { buildCheckCollaboratorHandler } from "./check";
import { buildDeleteCollaboratorHandler } from "./delete";
import { buildListCollaboratorsHandler } from "./list";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildAddCollaboratorHandler,
      buildCheckCollaboratorHandler,
      buildDeleteCollaboratorHandler,
      buildListCollaboratorsHandler,
    ];
  }
}
