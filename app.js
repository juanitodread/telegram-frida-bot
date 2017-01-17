require('dotenv').config();
const Telegraf = require('telegraf');
const GiphyWrapper = require('./lib/GiphyWrapper');

const app = new Telegraf(process.env.BOT_TOKEN);

app.command('start', ctx => {
  console.log('start', ctx.form);
  ctx.reply('Hola, soy FridaBot, qué quieres que busque?');
});

app.hears('hi', ctx => ctx.reply('Hey there!'));

app.on('sticker', ctx => ctx.reply('👍'));

app.on('message', ctx => {
  const queryMsg = ctx.message.text;

  if (queryMsg.toLowerCase().startsWith('frida busca')) {
    const realMsg = ctx.message.text.toLowerCase().replace('frida busca', '');
    ctx.telegram.sendCopy(ctx.from.id, ctx.message);

    console.log(`IMAGEeeeee: ${GiphyWrapper.findImage(realMsg)}`);

    GiphyWrapper.findImage(realMsg).then(res => {
      console.log('Entrando a findImage promise');
      const imgUrl = res.data[0].images.looping.mp4;
      console.log(`Image to RETURN: ${imgUrl}`);
      console.log(`Context: ${ctx}`);
      ctx.replyWithVideo({
        url: imgUrl
      });
    }).catch(err => {
      console.log(`Error: ${err}`);
      return err;
    });
  } else {
    ctx.reply('Prueba buscando algo escribiendo: frida busca');
  }

});

app.startPolling();
