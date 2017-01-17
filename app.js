require('dotenv').config();
const Telegraf = require('telegraf');
const Util = require('./lib/Util');
const TIH = require('./lib/TelegramInputHandler');

const app = new Telegraf(process.env.BOT_TOKEN);
const Logger = Util.getLogger();

app.command('start', ctx => {
  Logger.info('start', ctx.form);
  ctx.reply('Hola, soy FridaBot, qué quieres que busque?');
});

app.hears('hi', ctx => ctx.reply('Hola amigo!'));

app.on('sticker', ctx => ctx.reply('👍'));

// On messages process them with TelegramInputHandler
app.on('message', TIH.onMessage);

app.startPolling();
