const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let bUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.reply("Couldn't find user.");

  message.channel.send(`I believe in you, <@${bUser.id}>`);
}

module.exports.help = {
 name: "believe"
}
