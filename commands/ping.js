module.exports = {
	name: 'ping',
	description: 'Te respondere pong n.n!',
	execute(message) {
		message.channel.send('Pong!');
	},
};