const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lista todos mis comandos o informacion sobre uno en especifico',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const botAvatar = 'https://cdn.discordapp.com/avatars/758378764610175008/64d856fb130afa3028442113d2d5c5e1.png?size=1024';
		const helpEmbed = new Discord.MessageEmbed()
			.setColor('#14c6fc')
			.setTitle('**Comandos**')
			.setAuthor('Zeldita', botAvatar, '')
			.setDescription('Estos son los comandos que puedo hacer por ti n.n')
			.setThumbnail(botAvatar)
			.setTimestamp()
			.setFooter('z!help', botAvatar);

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));

			commands.forEach(element => {
				helpEmbed.addField(`**Comando "${element.name}"**`, element.description);
			});

			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(helpEmbed).then(() => {
				if (message.channel.type === 'dm') return;
				message.author.send(`\n Puedes mandar\`${prefix}help [command name]\` para obtener info en un comando especifico`);
				message.reply('te he mandado un MD con toda la info').then(msg => {
					msg.delete({ timeout: 2500 });
				});
			}).catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply('parece que no te puedo mandar un MD, ¿tienes los MD desactivados?');
			});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Ese no es un comando valido');
		}

		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripcion:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Enfriamiento:** ${command.cooldown || 3} segundo(s)`);

		message.channel.send(data, { split: true });
	},
};