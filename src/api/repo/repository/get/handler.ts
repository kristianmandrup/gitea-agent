import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getRepository } from "./definition";

export const buildGetRepositoryHandler = (main: IMainController) =>
  new GetRepositoryActionHandler(main);

export class GetRepositoryActionHandler extends CompositeActionHandler {
  name = "get_repository";

  async handle(_action: Action) {
    const data = await this.main.repos.getRepo();
    console.log({ data });
  }

  get definition(): any {
    return getRepository;
  }
}
