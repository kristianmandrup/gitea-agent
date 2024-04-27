export interface IRepoNotifier {
  notify(label: string, data: any): Promise<void>;
}

export class RepoNotifier implements IRepoNotifier {
  async notify(label: string, data: any) {
    // TODO
  }
}
