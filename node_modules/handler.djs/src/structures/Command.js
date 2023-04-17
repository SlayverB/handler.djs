const Base = require('./Base.js');
const ms = require('ms');
const { DiscordjsTypeError, ErrorCodes } = require('discord.js/src/errors');
const { PermissionsBitField, Collection } = require('discord.js');
const Application = require('./Application.js');

class Command extends Base {
  constructor() {
    super()
    this._patch(this, "data", {});
    // this._patch(this, "cooldown", new Collection());
  }

  setName(name) {
    if (typeof name !== "string") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command name", "string", true);
    }
    this._patch(this.data, "name", name);
    return this;
  };

  setDescription(description) {
    if (typeof description !== "string") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command description", "string", true);
    }
    this._patch(this.data, "description", description);
    return this;
  };

  setUsage(usage) {
    if (!Array.isArray(usage) && typeof usage !== "string") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command usage", "string or array", true);
    }

    if (Array.isArray(usage)) {
      usage.forEach((element) => {
        if (typeof element !== "string") {
          throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Element in command usage array", "string", true);
        }
      });
    }

    this._patch(this.data, "usage", usage);
    return this;
  };

  setExample(examples) {
    if (!Array.isArray(examples) && typeof examples !== "string") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command examples", "string or array", true);
    }

    if (Array.isArray(examples)) {
      examples.forEach((element) => {
        if (typeof element !== "string") {
          throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Element in command examples array", "string", true);
        }
      });
    }

    this._patch(this.data, "examples", examples);
    return this;
  };

  setExecution(executionFunction) {
    if (typeof executionFunction !== "function") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command execution function", "function", true);
    }
    this._patch(this.data, "run", executionFunction);
    return this;
  };

  setCooldown(cooldown) {
    if (typeof cooldown === "string") {
      cooldown = ms(cooldown);
      if (typeof cooldown !== "number") {
        throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command cooldown", "number or valid string", true);
      }
    } else if (typeof cooldown !== "number") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command cooldown", "number or valid string", true);
    }
    this._patch(this.data, "cooldown", {
      collection: new Collection(),
      timer: cooldown,
    })
    return this;
  };

  setOwners(owners) {
    if (typeof owners !== "boolean") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command owners", "boolean", true);
    }
    this._patch(this.data, "owners", owners);
    return this;
  };
  
  setDisabled(disabed) {
    if (typeof disabed !== "boolean") {
      throw new DiscordjsTypeError(ErrorCodes.InvalidType, "Command disabed", "boolean", true);
    }
    this._patch(this.data, "disabed", disabed);
    return this;
  };
  
  setPermissions(permissions) {
    if (!permissions) throw new DiscordjsTypeError(ErrorCodes.InvalidType,  "command permissions", "a valid permission or array of valid permissions", true);
    if (!Array.isArray(permissions)) permissions = [permissions];
    const validPermissions = Object.keys(PermissionsBitField.Flags);

    permissions.forEach((permission) => {
      if (!validPermissions.includes(permission)) throw new DiscordjsTypeError(ErrorCodes.InvalidType, "command permissions", `A valid permission or array of valid permissions (${validPermissions.join(", ")})`, true); 
    });
    
    this._patch(this.data, "permissions", permissions);
    return this;
  };

  setCategory(name = "auto") {
    const category = typeof name !== "string"? "auto" : name;
    this._patch(this, "category", category);
    return this;
  };

}

module.exports = Command;
