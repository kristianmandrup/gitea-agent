import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { generateFromTemplate } from "./definition";

export const buildGenerateRepositoryHandler = (main: IMainController) =>
  new GenerateRepositoryActionHandler(main);

export class GenerateRepositoryActionHandler extends CompositeActionHandler {
  name = "generate_branch";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { templateOwner, templateName, newName } = action.arguments;
    const data = await this.main.repos.generateFromTemplate(
      templateOwner,
      templateName,
      newName
    );
    console.log({ data });
  }

  get definition(): any {
    return generateFromTemplate;
  }
}
