const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let eUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  if(!eUser) return message.reply("Couldn't find user.");

  message.channel.send(`go kys i smash your mom dab kys gfys you suck mario sucks ligma balls edgy edgy shadow <@${eUser.id}>`);
}

module.exports.help = {
 name: "edgy"
}
