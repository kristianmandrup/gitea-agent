import { Action } from "./action";
import { IActionHandler } from "./handler";

export interface IActionValidator {
  validate(action: Action): boolean;
}

const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

export class ActionValidator implements IActionValidator {
  handler: IActionHandler;
  msgList: string[] = [];
  prefixList: string[] = [];

  constructor(handler: IActionHandler) {
    this.handler = handler;
  }

  addToPrefix(propKey: string) {
    this.prefixList.push(propKey);
  }

  get prefix() {
    return this.prefixList.join(".");
  }

  idFor(propKey: string) {
    return `${this.prefix}${propKey}`;
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
      const propId = this.idFor(propKey);
      return `${propId} invalid. Must be a ${type} but was a ${typeof actionValue}`;
    }
    return;
  }

  addError(error?: string) {
    if (!error || error.length === 0) return;
    this.msgList.push(error);
  }

  validateSimpleTypes(
    prop: any,
    propType: string,
    propKey: string,
    actionValue: any
  ) {
    const simpleTypes = ["string", "boolean", "number"];
    const propId = this.idFor(propKey);
    if (simpleTypes.includes(propType)) {
      const error = this.validateType(propType, propKey, actionValue);
      if (propType === "string") {
        if (
          Number.isInteger(prop.minLength) &&
          actionValue.length < prop.minLength
        ) {
          this.addError(`${propId} length must be > ${prop.minLength}`);
        }
        if (
          Number.isInteger(prop.maxLength) &&
          actionValue.length > prop.maxLength
        ) {
          this.addError(`${propId} length must be < ${prop.maxLength}`);
        }
      }
      if (propType === "number") {
        if (prop.positive && actionValue <= 0) {
          this.addError(`${propId} must be > 0`);
        }
        if (prop.notNegative && actionValue < 0) {
          this.addError(`${propId} must be >= 0`);
        }
      }
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
    if (!Array.isArray(actionValue)) {
      const propId = this.idFor(propKey);
      this.addError(
        `${propId} must be an array of ${type} but is a ${typeof actionValue}`
      );
      return;
    }

    const validateSimpleTypes = this.validateSimpleTypes.bind(this);
    actionValue.forEach((val: any, index: number) => {
      validateSimpleTypes({}, type, `${propKey}[${index}]`, val);
    });
  }

  protected validateObjectTypes(
    propType: string,
    propKey: string,
    actionValue: any
  ) {
    if (propType !== "object") return;
    if (!isObject(actionValue)) {
      const propId = this.idFor(propKey);
      this.addError(
        `${propId} must be an object but is a ${typeof actionValue}`
      );
      return;
    }
    this.addToPrefix(propKey);
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
      const propDefault = prop.default;
      let actionValue = action.parameters[propKey];
      // set to actionValue to default value if undefined
      if (actionValue === undefined) {
        actionValue = propDefault;
      }
      // if action value not set, ignore type validation
      if (actionValue === undefined) {
        return true;
      }
      this.validateSimpleTypes(prop, propType, propKey, actionValue);
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
