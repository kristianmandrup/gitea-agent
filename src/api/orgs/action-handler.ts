import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildCreateOrganizationHandler } from "./create";
import { buildDeleteOrganizationHandler } from "./delete";
import { buildGetOrganizationHandler } from "./get";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateOrganizationHandler,
      buildDeleteOrganizationHandler,
      buildGetOrganizationHandler,
    ];
  }
}
