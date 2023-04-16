
# GET STRATED

# Installing
 ```bash
  $ npm init
  $ npm i discord.js@latest
  $ npm i handler.djs
 ```

<h6>You can Handle Files with this package</h6>

# SetUp
```js
const { Client, GatewayIntentBits } = require('discord.js');
const path = require('node:path')
const { Application } = require('handler.djs');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
    ] 
});

client.app = new Application({
  client: client,
  commandsPath: path.join(__dirname, "./commands"), // commands path
  validationPath: path.join(__dirname, "./validation"), // validation path
  owners: ["ownerId"],
});

client.app.setPrefix("!"); // set Bot Prefix
client.app.setCooldown({ // set Golbal cooldown settings
  message: "**{Username}**, Cool down (**{counter}** left)", // message send when user use the command again [{UserName} {UserId} {UserMention} {UserTag} {counter}]
  reference: true, //mention user
  long: true, // false return "s" true return "secouns"
  Mdelete: "3s" // delete message after (optional)
});


client.on("ready", async () => {
 client.app.build(); // build the app
 client.app.setDate({
    name: client.user.username
 })
 console.log(client.user.tag, "is Ready"); 
})

client.login(yourToken)
```
### commands Setup

```js
const { Command } = require('handler.djs');

module.exports = new Command() 
.setName("ping") // command name
.setDescription("Test Bot ws Ping") // command description
.setExample(["ping"]) 
.setUsage(["ping (bot)", "ping (user)"])
.setCooldown("10s") // cooldown 
.setPermissions(["SendMessages"]) // user permissons
.setExecution(run) // execution code 
.setCategory("auto") // command catefogry auto means set automaticly
.setOwners(true) // means only owners can use this

async function run() {
  const { message, client, args } = this;
  message.reply({content: message.data.get("name")}); // will send client username
}
```

# validation setUp
```js
const { Validation } = require('../src/index.js');

module.exports = new Validation()
.setCommnads(["all"]) // all commands or select only unique commands ["ping"]
.setExecution( (message, next) => {
   if (message.content.includes("password")) return next() // next mean run the command
   else message.reply({content: "bruuh"});
})
```
