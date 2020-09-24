module.exports = {
	name: 'purge',
	description: 'Purga mensajes! [ADMIN ONLY]',
	aliases: ['pg', 'prune'],
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('ese no es un numero valido.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('necesitas proporcionar un numero entre 1 y 100');
		}

		if (message.member.roles.cache.some(role => role.name === 'Princesa del agua')) {
			message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				message.channel.send('Oh no, paso un error mientras ejecutaba el comando unu');
			});
			message.channel.send(`**${amount - 1}** mensaje(s) fueron **eliminados!**`)
				.then(msg => {
					msg.delete({ timeout: 2000 });
				});
		}
	},
};