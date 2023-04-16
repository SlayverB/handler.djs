const readPath = require('./readPath.js');
const path = require('node:path');
const Command = require('../structures/Command.js');
const { DiscordjsTypeError, ErrorCodes } = require('discord.js/src/errors');

module.exports = async function(pathManeger) {
  const commands = new Array() || [];
  const files = await readPath(pathManeger);
  for await (const file of files) {
    
    const cmd = require(path.join(file));

    if (!cmd instanceof Command) throw new DiscordjsTypeError(ErrorCodes.InvalidType, `${file}`, `Command Constractor`, true);
    if (!cmd.name) throw new DiscordjsTypeError(ErrorCodes.InvalidType, `cmd Name`, `missing Argument`, true);
    if (!cmd.description) throw new DiscordjsTypeError(ErrorCodes.InvalidType, `cmd description`, `missing Argument`, true);
    if (!cmd.run) throw new DiscordjsTypeError(ErrorCodes.InvalidType, `cmd Execution`, `missing Argument`, true);
    if (cmd.disabed) continue
    const paths = file.toString().split("\\");

    const command = {
      name: cmd.name,
      description: cmd.description,
      usage: cmd.usage || [cmd.name],
      examples: cmd.examples || [cmd.name],
      run: cmd.run,
      cooldown: !cmd?.cooldown?.timer? false : cmd.cooldown,
      owners: cmd.owners || false,
      disabed: cmd.disabed || false,
      permissions: cmd.permissions || ["SendMessages"],
      category: !cmd.category || cmd.category.toLowerCase() === "auto"? paths[paths.length - 2] : cmd.category,
      class: cmd,
      path: file,
    };
    
    if (commands.find(e => e.name.toLowerCase() === cmd.name.toLoweCase()  && cmd.disabed === false)) throw new DiscordjsTypeError(ErrorCodes.InvalidType, `${file}`, "repeated command", true) 
    commands.push(command);
    
  }
  return commands
}