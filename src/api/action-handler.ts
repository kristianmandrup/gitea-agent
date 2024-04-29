import { CompositeActionHandler } from "./actions";
import { buildRepoHandler } from "./repo/action-handler";

export class MainActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildRepoHandler];
  }
}
