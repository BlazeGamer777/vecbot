const Discord = require('discord.js');
const Config = require('./config.json');
const Token = require('./auth.json');
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
 if(err) console.log(err)
 let jsfile = files.filter(f => f.split(".").pop() === "js");
 if(jsfile.length <= 0){
  console.log("Could not find command.")
  return;
 };

 jsfile.forEach((f, i) =>{
  let props = require(`./Commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
 });
});

bot.on("ready", async () =>{
 console.log(`${bot.user.username} is online! It's running on ${bot.guilds.size} servers!`);
 bot.user.setActivity(`Being a bot on ${bot.guilds.size} servers. `, {type: "STREAMING"});
});

bot.on("guildMemberAdd", async member => {
 let welcomeChannel = member.guild.channels.find(`name`, "welcome")
 if(!welcomeChannel) return;
 welcomeChannel.send(`Welcome ${member} to the server!`);
 // send a dm
 member.send("Welcome to the server! Please read the rules!").catch(O_o=>{ welcomeChannel.send("This user does not have dm's enabled.")});
});

bot.on("guildMemberRemove", async member => {
 let welcomeChannel = member.guild.channels.find(`name`, "welcome")
 if(!welcomeChannel) return;
 welcomeChannel.send(`Goodbye ${member}.`);
 // send a dm
 member.send("Goodbye. We will miss you!").catch(O_o=>{ welcomeChannel.send("This user does not have dm's enabled.")});
});

bot.on("message", async message =>{
 if(message.author.bot) return;
 if(message.channel.type === "dm") return;
 let prefix = Config.prefix;
 let msgArray = message.content.split(" ");
 let cmd = msgArray[0];
 if(cmd.slice(0, prefix.length) !== prefix) return;
 let args = msgArray.slice(1);
 let cmdFile = bot.commands.get(cmd.slice(prefix.length));
 if(cmdFile) cmdFile.run(bot,message,args);
});

bot.login(Token.token);
