import { Action } from "./action";
import { IActionHandler } from "./handler";

export interface IActionValidator {
  validate(action: Action): boolean;
}

export class ActionValidator implements IActionValidator {
  handler: IActionHandler;
  msgList: string[] = [];

  constructor(handler: IActionHandler) {
    this.handler = handler;
  }

  notifyError(label: string, data: any) {
    this.handler.notifyError(label, data);
  }

  reset() {
    this.msgList = [];
    return this;
  }

  get definition(): any {
    return this.handler.definition;
  }

  public validate(action: Action): boolean {
    this.reset();
    return this.validateRequired(action) && this.validateTypes(action);
  }

  protected validateType(type: string, propKey: string, actionValue: any) {
    if (typeof actionValue !== type) {
      return `${propKey} invalid. Must be a ${type} but was a ${typeof actionValue}`;
    }
    return;
  }

  addError(error?: string) {
    if (!error) return;
    this.msgList.push(error);
  }

  validateSimpleTypes(propType: string, propKey: string, actionValue: any) {
    const simpleTypes = ["string", "boolean", "number"];
    if (simpleTypes.includes(propType)) {
      const error = this.validateType(propType, propKey, actionValue);
      this.addError(error);
    }
  }

  protected validateArrayTypes(
    propType: string,
    propKey: string,
    propValue: any,
    actionValue: any
  ) {
    if (propType !== "array") return;
    const { type } = propValue.items;
    const validateSimpleTypes = this.validateSimpleTypes.bind(this);
    actionValue.forEach((val: any, index: number) => {
      validateSimpleTypes(type, `${propKey}[${index}]`, val);
    });
  }

  protected validateObjectTypes(
    propType: string,
    propKey: string,
    actionValue: any
  ) {
    if (propType !== "object") return;
    this.addError(`For ${propKey}:`);
    this.validateTypes(actionValue);
  }

  protected validateTypes(action: Action): boolean {
    const { parameters } = this.definition;
    const type = parameters.type;
    if (type !== "object") return true;
    const { properties } = parameters;
    for (const propKey of Object.keys(properties)) {
      const prop = properties[propKey];
      const propType = prop.type;
      const actionValue = action.parameters[propKey];
      this.validateSimpleTypes(propType, propKey, actionValue);
      this.validateArrayTypes(propType, propKey, prop, actionValue);
      this.validateObjectTypes(propType, propKey, actionValue);
    }
    if (this.msgList.length > 0) {
      const errors = this.msgList.join("\n");
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
      if (!action.parameters[param]) {
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
}
