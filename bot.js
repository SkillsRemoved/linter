const config= require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: false});
const superagent = require("superagent");
let version = "1"
let prefix = config.prefix;

client.on("ready", async () => {
  console.log(`Online, with ${client.users.size} users. Version: ${version}`);
  client.user.setActivity(`for ${prefix}help | ${client.users.size} members.`, {type: "WATCHING"});
  client.user.setStatus("online")
});

client.on("guildCreate", guild => {
  let guildembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("New Server: " + guild.name)
  .addField("Owner ID", guild.owner.id,true)
  .addField("Guild ID", guild.id, true)
  .addField("Members", guild.members.size)
  .addField("Roles", guild.roles.size, true)
  .addField("Channels", guild.channels.size, true)
  client.users.get("YOUR_ID_HERE").send(guildembed)
});

client.on("guildDelete", guild => {
  let guildembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("Removed From Server: " + guild.name)
  .addField("Owner ID", guild.owner.id,true)
  .addField("Guild ID", guild.id, true)
  .addField("Members", guild.members.size)
  .addField("Roles", guild.roles.size, true)
  .addField("Channels", guild.channels.size, true)
  client.users.get("YOUR_ID_HERE").send(guildembed)
});

client.on("message", async message => {
  if(message.channel.type === "dm"){
    var dm = true;
  } else {
    var dm = false;
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toUpperCase();
  let args = messageArray.slice(1);
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let secondsalmost = totalSeconds % 60;
  let seconds = Math.round(secondsalmost);
  let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    if(cmd === `${prefix}PING`) {
      message.channel.send("pong!")
  }
});

client.login(config.token)
