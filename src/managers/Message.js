const { Message, Client } = require('discord.js');
const ms = require('ms');
const Application = require('../structures/Application.js');
const cooldownFormater = require('./cooldown.js');

/**
 * 
 * @param {Message} message 
 * @param {client} Client
 * @param {main} Application
 */

module.exports.HandleMessage = async function (message, client, main) {

 const args = message.content.slice(main.prefix.length).split(/ +/g);
 const cmd = args.shift().toLowerCase();
 const command = main["_command$"].get(cmd.toLowerCase());
 if (!command) return;
 if (command.disabed || (command.owners && !main.owners.includes(message.author.id))) return;
 Object.defineProperty(message, "data", { value: main.data, writable: false });

 const cooldown = command.cooldown;
 if (cooldown) {
   const cooldownConfig = main.cooldownConfig;
   const key = `${cmd.name}-${message.author.id}-${message.guild.id}`
   const collection = cooldown.collection;
   const has = collection.get(key);
   if (has) {

   const time = (Date.now() - has.Timer) * -1;
   const msTimer = ms(time, { long: (cooldownConfig? cooldownConfig.long : false)  });
   const cooldownMessage = cooldownConfig? cooldownConfig.message : "{UserMention} wait **{counter}**";
   const content = await cooldownFormater(cooldownMessage, message, msTimer);
   
   if (cooldownConfig && cooldownConfig.Mdelete) return await main.sendTimedMessage(message, {content}, cooldownConfig.reference, cooldownConfig.Mdelete)
   else return (cooldownConfig && cooldownConfig.reference)? message.reply({content}) : message.channel.send({content})

  } else if (!main.owners.includes(message.author.id)) {
    const collection = cooldown.collection;
    collection.set(key, {
      Timer: Date.now() + cooldown.timer
    });
    setTimeout(() => {
      collection.delete(key);
    }, cooldown.timer);
   } 
 }

 const next = async () => {
  command.run.call({ message, args, client });
 };

 if (!main.valids || main.valids.length === 0) return next();
 for await (const valid of main.valids) {
  if (valid.commands.includes(command.name.toLowerCase()) || valid.commands.includes("all")) return await valid.execution(message, next);
 };
 
}