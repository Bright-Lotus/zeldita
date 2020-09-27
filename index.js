const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const logsChannel = client.channels.cache.find(channel => channel.id == '759041872407822376');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	client.user.setActivity('z!help');
	console.log('Estoy lista n.n');
});

client.on('message', message => {

	welcomeFunc(message);

	if (message.content.includes(':v') && message.author.bot) {
		message.delete({ timeout: 0 });
	}

	if (message.content === 'Ping' || message.content === 'ping') {
		message.channel.send('Pong!');
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('No puedo ejecutar ese comando en MDs, lo siento.');
	}

	if (command.args && !args.length) {
		let reply = `No me diste ningun argumento con el cual pueda trabajar, ${message.author}!`;

		if (command.usage) {
			reply += `\nEl uso adecuado del comando seria: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`por favor espera ${timeLeft.toFixed(1)} segundos antes de usar otra vez el comando \`${command.name}\``);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
	catch (error) {
		logsChannel.send(error.toString());
		console.error(error);
		message.reply('Hubo un error mientras ejecutaba ese comando unu');
	}
});

function welcomeFunc(message) {
	if (message.content.includes('bienvenido a') && message.channel.id === '758047065619169300') {
		message.react('🎉');
	}
	else if (message.content.includes('nos acaba de dejar') && message.channel.id === '758047065619169300') {
		message.react('😔');
	}
	else if (message.content.includes('sol y fue baneado') && message.channel.id === '758047065619169300') {
		// Reacts with a ban hammer
		message.react('759020250666106881');
	}
}

client.on('guildCreate', async (guild) => {
	try {
		const canal = client.channels.cache.find(channel => channel.id == 759041872407822376);
		const embed = new Discord.MessageEmbed()
			.setThumbnail(guild.iconURL)
			.setTitle('Me añadieron en un nuevo servidor :3')
			.addField('Servidor', guild.name, true)
			.addField('Region', guild.region, true)
			.addField('Roles', guild.roles.size, true)
			.addField('Miembros', guild.memberCount, true)
			.addField('Dueño', `${guild.owner.user.username}#${guild.owner.user.discriminator}`, true)
			.setTimestamp()
			.setColor('42f58a')
			.setImage(guild.iconURL.toString);
		console.log(guild.iconURL.toString);

		canal.send(embed);
	}
	catch (error) {
		const Canal = client.channels.cache.find(channel => channel.id == 759041872407822376);
		Canal.send('Error en **"guildCreate"** <@&734599009414676551>');
		Canal.send(error.toString());
		console.log(error);
	}
});


client.login(token);