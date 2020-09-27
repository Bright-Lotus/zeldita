const Discord = require('discord.js');

module.exports = {
	name: 'suggest',
	description: 'Para sugerir algo sea para mejorar el servidor o mejorarme a mi n.n',
	usage: '<sugerencia> (Sin los "<>")',
	execute(message, args) {
		const channel = message.guild.channels.cache.get('758081717213986887');
		let suggestion = '';
		args.forEach(element => {
			suggestion += element + ' ';
		});
		const suggestionEmbed = new Discord.MessageEmbed()
			.setColor('#5f73ff')
			.setTitle('Sugerencia #1')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }), '')
			.setDescription(suggestion);
		channel.send(suggestionEmbed).then(msg => {
			msg.react('⬆');
			msg.react('⬇');
		});
		message.delete({ timeout: 0 });
		console.log(suggestion);
	},
};