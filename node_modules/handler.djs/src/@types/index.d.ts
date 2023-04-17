import { Client, Message, PermissionFlags } from 'discord.js';

declare module "handler.djs" {
  class Application {
    constructor({client: Client, commandsPath: String, EventsPath: String, validationPath: String, owners: Array });
    public setPrefix(prefix: String): any;
    public setCooldown({message: String, reference: boolean, long: Boolean, Mdelete: string });
    public build(): any;
    public setDate(data: Object): any;
    public getCommand(name: String): any;
    public sendTimedMessage(message: Message, options: Message, reference: Boolean, timer: Number);
    private _build(): any
  };
  class Command {
    constructor();
    public setName(name: string): any;
    public setDescription(description: String): any;
    public setUsage(usage: (Array | string)): any;
    public setExample(examples: (Array | string)): any;
    public setExecution(callback: Function): any;
    public setCooldown(cooldown: (String | Number)): any
    public setOwners(owners: Boolean): any;
    public setDisabled(disabed: Boolean): any;
    public setPermissions(permissions: Array<PermissionFlags> | PermissionFlags);
    public setCategory(name: String): any;
  };
  class Validation {
    constructor();
    public setCommnads(commands: (Array<string> | string)): any;
    public setExecution(executionFunction: Function): any;
  }
}