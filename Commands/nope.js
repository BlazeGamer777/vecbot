const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let nUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  if(!nUser) return message.reply("Couldn't find user.");

  message.channel.send(`Nope, sorry <@${nUser.id}>`);
}

module.exports.help = {
 name: "nope"
}
