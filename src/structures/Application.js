const fs = require('node:fs');
const path = require('node:path');
const ms = require('ms');
const { Collection, Client, Events } = require('discord.js');
const { DiscordjsTypeError, ErrorCodes } = require('discord.js/src/errors');
const Base = require('./Base.js');
const readCommands = require('../util/readCommands.js');
const readValidation = require('../util/readValidation.js');
const Message = require('../managers/Message.js');

class Application extends Base {
  
  constructor({ client, commandsPath, EventsPath, validationPath, owners = [] } = {}) {
    super()
    const main = this;
    this.prefix = "?"
    this.main = main;
    this._patch(main, "client", client);    
    this._patch(main, "commandsPath", commandsPath);    
    this._patch(main, "EventsPath", EventsPath);
    this._patch(main, "owners", owners);
    this._patch(main, "validationPath", validationPath);
    this._patch(main, "paths", new Object());
    this._patch(main, "data", new Collection());
    this._patch(main, "_command$", new Collection());    
    this._patch(main, "cooldowns", new Collection());
    this._patch(main, "replys", new Object());
    if (!Array.isArray(this.owners)) throw new DiscordjsTypeError(ErrorCodes.InvalidType, "owners" , "array only", true); 
  }
  
  async setPrefix(prefix = "?") {
   if (typeof prefix !== "string") this.prefix = "?"
   else this.prefix = prefix;
   return this;
  };

  async setCooldown({message, reference = "true",  long = true, Mdelete = null}) {

    if (!message || typeof message !== "string") throw new Error("Content must be an String only");
    if (!reference || typeof reference !== "boolean") throw new Error("reference must be an Boolean only");
    if (!long || typeof long !== "boolean") throw new Error("long must be an Boolean only");
    
    let timer = null
    if (Mdelete && typeof Mdelete === "string") timer = ms(Mdelete) ?? 5000;
    if (Mdelete && typeof Mdelete === "number") timer = Mdelete
    
    this._patch(this.main, "cooldownConfig", {
      message,
      long,
      reference,
      Mdelete: timer
    });
    return this;
  };

  async setBaseReply(Object) {
    
  }

  async build() {
   await this._build();
   const commands = await readCommands(this.paths.commandsPath);
   commands.forEach(cmd => this["_command$"].set(cmd.name.toLowerCase(), cmd));
   this._patch(this.main, "valids", []);
   if (this.validationPath) await readValidation(this.validationPath, this.main);
   return this;
  };
  
  setData(data = {}) {
    if (typeof data !== "object") throw new DiscordjsTypeError(ErrorCodes.InvalidType, "data", "Object");
    Object.keys(data).forEach(key => {
      this.data.set(key, data[key]);
    })
  };

  async _build() {
      if (!this.client) throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Client", "parameters", true);
      if (!this.commandsPath) throw new DiscordjsTypeError(ErrorCodes.InvalidType, "commandsPath","parameters", true);
      if (!this.EventsPath) throw new DiscordjsTypeError(ErrorCodes.InvalidType, "EventsPath", "parameters", true);
      if (!(this.client instanceof Client)) throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Client", " discord.js Client");
      if (!this.client.user) throw new DiscordjsTypeError(ErrorCodes.TokenMissing);
      
      await fs.readdirSync(this.commandsPath);
      await fs.readdirSync(this.EventsPath);
      if (this.validationPath) await fs.readdirSync(this.validationPath);
    
      this.paths.commandsPath = this.commandsPath;
      this.paths.EventsPath = this.EventsPath;
     
      this.client.on(Events.MessageCreate, (message) => {
        Message.HandleMessage(message, this.client, this.main)
      });
  };

  async sendTimedMessage(message, options, reference, timer) {
    if (reference) {
     await message.reply(options).then(m => {
      setTimeout(() => m.delete(), timer)
     })
    } else {
      await message.channel.send(options).then(m => {
        setTimeout(() => m.delete(), timer)
      });
    }
  }
   
}

module.exports = Application;