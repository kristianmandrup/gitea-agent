import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import { Action } from "./action";
import { ActionHandlerType, IActionHandler } from "./handler";

export interface ILeafActionHandler {
  definition(): any;
  handle(action: Action): Promise<void>;
  validate(action: Action): boolean;
}

export class LeafActionHandler
  extends GiteaMainAccessor
  implements IActionHandler
{
  name = "unknown";
  type: ActionHandlerType = "leaf";

  validate(action: Action): boolean {
    return this.validateRequired(action) && this.validateTypes(action);
  }

  protected validateType(type: string, propKey: string, actionValue: any) {
    if (typeof actionValue !== type) {
      return `${propKey} invalid. Must be a ${type} but was a ${typeof actionValue}`;
    }
    return;
  }

  validateSimpleTypes(
    propType: string,
    propKey: string,
    actionValue: any,
    msgs: string[]
  ) {
    const simpleTypes = ["string", "boolean", "number"];
    if (simpleTypes.includes(propType)) {
      const error = this.validateType(propType, propKey, actionValue);
      if (error) {
        msgs.push(error);
      }
    }
  }

  protected validateArrayTypes(
    propType: string,
    propKey: string,
    propValue: any,
    actionValue: any,
    msgs: string[]
  ) {
    if (propType !== "array") return;
    const { type } = propValue.items;
    const validateSimpleTypes = this.validateSimpleTypes.bind(this);
    actionValue.forEach((val: any, index: number) => {
      validateSimpleTypes(type, `${propKey}[${index}]`, val, msgs);
    });
  }

  protected validateObjectTypes(
    propType: string,
    propKey: string,
    actionValue: any,
    msgList: string[]
  ) {
    if (propType !== "object") return;
    msgList.push(`For ${propKey}:`);
    this.validateTypes(actionValue, msgList);
  }

  protected validateTypes(action: Action, msgList: string[] = []): boolean {
    const { parameters } = this.definition;
    const type = parameters.type;
    if (type !== "object") return true;
    const { properties } = parameters;
    for (const propKey of Object.keys(properties)) {
      const prop = properties[propKey];
      const propType = prop.type;
      const actionValue = action.fnArgs[propKey];
      this.validateSimpleTypes(propType, propKey, actionValue, msgList);
      this.validateArrayTypes(propType, propKey, prop, actionValue, msgList);
      this.validateObjectTypes(propType, propKey, actionValue, msgList);
    }
    if (msgList.length > 0) {
      const errors = msgList.join("\n");
      this.notifyError("action:validation:parameter:types", {
        action,
        properties,
        errors,
      });
      return false;
    }
    return true;
  }

  protected validateRequired(action: Action): boolean {
    let isValid = true;
    const { required } = this.definition;
    for (const param of this.definition.required) {
      if (!action.fnArgs[param]) {
        isValid = false;
        this.notifyError("action:parameter:required:missing", {
          action,
          required,
          param,
        });
      }
    }
    return isValid;
  }

  notify(label: string, data: any) {
    this.main.notify(label, data);
  }

  notifyError(label: string, data: any) {
    this.main.notifyError(label, data);
  }

  constructor(main: IMainController) {
    super(main);
    this.initialize();
  }

  get definition(): any {
    throw new Error("Missing definition");
  }

  initialize() {}

  async handle(_action: Action) {
    //
  }
}
