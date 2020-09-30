module.exports = {
	name: 'say',
	description: 'Para que yo diga algo por ti n.n!',
	aliases: ['di'],
	usage: '<mensaje> <canal donde yo mando el mensaje>',
	execute(message, args) {
		message.delete({ timeout: 0 });
		let channelID = '';
		let msgToSay = '';
		for (let i = 0; i < args.length; i++) {
			if (args[i].startsWith('<#')) {
				const part = args[i].substring(
					args[i].lastIndexOf('<#') + 1,
					args[i].lastIndexOf('>'),
				);
				const digitRegex = /([\d])/g;
				const matched = part.match(digitRegex);
				matched.forEach(element => {
					channelID += element;
				});
				console.log(channelID);
			}
			msgToSay += args[i] + ' ';
		}
		if (channelID === '') {
			return message.channel.send(msgToSay);
		}
		const ChannelToSendMsg = message.guild.channels.cache.find(channel => channel.id == channelID);
		ChannelToSendMsg.send(msgToSay);
	},
};