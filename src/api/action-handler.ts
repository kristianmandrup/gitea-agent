import { ActionHandler } from "./actions";
import { buildRepoHandler } from "./repo/action-handler";

export class MainActionHandler extends ActionHandler {
  get handlers() {
    return [buildRepoHandler];
  }
}
