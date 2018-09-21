const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
 let bannedUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
 if(!bannedUser) return message.reply("Couldn't find user.");
 let reason = args.join(" ").slice(22);

 if(!message.member.hasPermission("MANAGE_CHANNELS"))
  return message.reply("You don't have permission!");
 if(bannedUser.hasPermission("MANAGE_CHANNELS"))
  return message.reply("This person cannot be kicked!");

 let bannedChannel = message.guild.channels.find(`name`, "log");
 if(bannedChannel){
  let bannedEmbed = new Discord.RichEmbed().setTitle("Banned").setColor("#ff0000").addField("Banned By", message.author).addField("Reason", reason);
  bannedChannel.send(bannedEmbed);
 }

 message.guild.member(bannedUser).ban(reason);
}

module.exports.help = {
 name: "ban"
}
