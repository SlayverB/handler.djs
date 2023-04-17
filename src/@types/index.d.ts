import { Client, Message, PermissionFlags, Sticker } from 'discord.js';


interface Application {
  public setPrefix(prefix: String): Application;
  public setCooldown({message: String, reference: boolean, long: Boolean, Mdelete: string }): Application;
  public build(): Application;
  public setDate(data: Object): Application;
  public getCommand(name: String): Application;
  public sendTimedMessage(message: Message, options: Message, reference: Boolean, timer: Number): Application;
  private _build(): Application
}

interface Command {
  public setName(name: string): Command;
  public setDescription(description: String): Command;
  public setUsage(usage: (Array | string)): Command;
  public setExample(examples: (Array | string)): Command;
  public setExecution(callback: Function): Command;
  public setCooldown(cooldown: (String | Number)): Command
  public setOwners(owners: Boolean): Command;
  public setDisabled(disabed: Boolean): Command;
  public setPermissions(permissions: Array<PermissionFlags> | PermissionFlags): Command;
  public setCategory(name: String): Command;
}

interface Validation {
  public setCommnads(commands: (Array<string> | string)): Validation;
  public setExecution(executionFunction: Function): Validation;
}

interface CommandStructur {
  name: String,
  description: String,
  usage: String | Array<String>,
  examples: String | Array<String>,
  run: Function,
  cooldown: Boolean,
  owners: Boolean,
  disabed: Boolean,
  permissions: Array<PermissionFlags>,
  category: String,
  class: any,
  path: String,
}

declare module "handler.djs" {

  class Base {
    public _patch(obj: Object, key: string, value: any): void;
    public toJSON(): JSON
  };

  class Application extends Base {
    constructor({client: Client, commandsPath: String, EventsPath: String, validationPath: String, owners: Array });
    public app_commands: Array<CommandStructur>
    readonly prefix: String
    public setPrefix(prefix: String): Application;
    public setCooldown({message: String, reference: boolean, long: Boolean, Mdelete: string }): Application;
    public build(): Application;
    public setDate(data: Object): Application;
    public getCommand(name: String): Application;
    public sendTimedMessage(message: Message, options: Message, reference: Boolean, timer: Number): Application;
    private _build(): Application
  };

  class Command extends Base {
    public setName(name: string): Command;
    public setDescription(description: String): Command;
    public setUsage(usage: (Array | string)): Command;
    public setExample(examples: (Array | string)): Command;
    public setExecution(callback: Function): Command;
    public setCooldown(cooldown: (String | Number)): Command
    public setOwners(owners: Boolean): Command;
    public setDisabled(disabed: Boolean): Command;
    public setPermissions(permissions: Array<PermissionFlags> | PermissionFlags): Command;
    public setCategory(name: String): Command;
  };

  class Validation extends Base {
    public setCommnads(commands: (Array<string> | string)): Validation;
    public setExecution(executionFunction: Function): Validation;
  };

}