const dotenv   = require('dotenv').config();
const Telegraf = require('telegraf');

const app = new Telegraf(process.env.BOT_TOKEN);

app.command('start', (ctx) => {
  console.log('start', ctx.form);
  ctx.reply('Welcome, my name is JuanBot but currently Im using a Frida :D profile picture');
});

app.hears('hi', (ctx) => ctx.reply('Hey there!'));

app.on('sticker', (ctx) => ctx.reply('👍'));

const msg = '...\n\nI will be giving you a smarter answer when my creator improve me :D - FridaBot';

app.on('message', (ctx) => {
  console.log(ctx.message);
  ctx.message.text += msg;
  console.log(ctx.message);
  ctx.telegram.sendCopy(ctx.from.id, ctx.message);
});

app.startPolling();
