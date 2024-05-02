import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
// import {  } from "./list_keys";
// import {  } from "./list_repos";
// import {  } from "./tokens";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [];
  }
}
