const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Muestra el hermoso avatar de una persona, la tuya o la de otro',
	aliases: ['icon', 'pfp', 'av'],
	usage: '<user> (No pongas el usuario y mostrara el tuyo)',
	execute(message) {
		const botAvatar = 'https://cdn.discordapp.com/avatars/758378764610175008/64d856fb130afa3028442113d2d5c5e1.png?size=1024';
		if (!message.mentions.users.size) {
			message.react('👌');
			const avatarEmbed = new Discord.MessageEmbed()
				.setColor('#2ec65e')
				.setTitle(`Avatar de ${message.author.username}`)
				.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }), '')
				.setImage(`${message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
				.setTimestamp()
				.setFooter('z!', botAvatar);

			if (message.author.username === '!Princesa del agua, Zelda Zamora') {
				message.channel.send(avatarEmbed);
				return message.channel.send(':0, esa es mi mamá n.n');
			}

			return message.channel.send(avatarEmbed);
		}

		const userArray = message.mentions.users;
		const user = userArray.first();

		const avatarEmbed = new Discord.MessageEmbed()
			.setColor('#2ec65e')
			.setTitle(`Avatar de ${user.username}`)
			.setAuthor(`${user.tag}`, user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }), '')
			.setImage(`${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			.setTimestamp()
			.setFooter('z!', botAvatar);

		message.channel.send(avatarEmbed);
		if (user.username === '!Princesa del agua, Zelda Zamora') {
			message.channel.send(':0, esa es mi mamá n.n');
		}
	},
};