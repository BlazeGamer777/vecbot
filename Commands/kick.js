const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
 let kickedUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
 if(!kickedUser) return message.reply("Couldn't find user.");
 let reason = args.join(" ").slice(22);

 if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have permission!");
 if(kickedUser.hasPermission("MANAGE_MESSAGES"))
  return message.reply("This person cannot be kicked!");
 
 let kickedChannel = message.guild.channels.find(`name`, "log");
 if(kickedChannel){
  let kickedEmbed = new Discord.RichEmbed().setTitle("Kicked" + kickedUser).setColor("#ff0000").addField("Kicked By", message.author).addField("Reason", reason);
  kickedChannel.send(kickedEmbed);
 }

 message.guild.member(kickedUser).kick(reason);
}

module.exports.help = {
 name: "kick"
}