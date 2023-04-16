const { Client, GatewayIntentBits } = require('discord.js');
const path = require('node:path')
const { Application } = require('./src/index.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.app = new Application({
  client: client,
  commandsPath: path.join(__dirname, "./commands"),
  validationPath: path.join(__dirname, "./validation"),
  EventsPath: "./commands",
  owners: [""],
});

client.app.setPrefix("!");
client.app.setCooldown({
  message: "**{Username}**, Cool down (**{counter}** left)",
  reference: true,
  long: true,
  Mdelete: "3s"
});

client.on("ready", async () => {
 client.app.build(); 
 console.log(client.user.tag, "is Ready");
})

client.login("MTA0MTEzODI0MDAyMDgwNzY4MQ.G1Vwko.mVJf6Acer5bQ8pmv3id8YFFPaqLCPH48sPLj5w")