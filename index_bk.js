// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Bot listo!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);

	const command = args.shift().toLowerCase();

	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong');
	}
	else if (message.content === `${prefix}beep`) {
		message.channel.send('Boop');
	}
	else if (message.content === `${prefix}server`) {
		message.channel.send(`Nombre del servidor: ${message.guild.name}\nMiembros totales: ${message.guild.memberCount}`);
	}
	else if (message.content === `${prefix}userinfo`) {
		message.channel.send(`Tu nombre de usuario: ${message.author.username}\nTu ID de usuario: ${message.author.id}`);
	}
	else if (command === 'argsinfo') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if (command === 'kick') {
		const taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		message.channel.send(`${message.author} ha pateado a ${taggedUser}`);
	}
	else if (command === 'prune') {
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
				message.channel.send('Hubo un error tratando de ejecutar el comando');
			});
		}
	}
});

// login to Discord with your app's token
client.login(token);