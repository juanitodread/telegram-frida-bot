const Util = require('./Util');
const GiphyWrapper = require('./GiphyWrapper');
const Logger = Util.getLogger();

class TelegramInputHandler {

  static getMessageCmds() {
    return [
      'frida imagen',
      'frida saluda',
      'frida help'
    ];
  }

  static onMessage(ctx) {
    const msg = ctx.message.text.toLowerCase();
    Logger.info(`Entry onMessage: message => ${msg}`);

    const cmd = TelegramInputHandler.getCommand(msg);
    Logger.debug(`Command: ${cmd}`);

    if (cmd === 'frida saluda') {
      Logger.info('Frida saluda');
    } else if (cmd === 'frida imagen') {
      Logger.info('Frida imagen');
      const realMsg = msg.toLowerCase().replace(cmd, '');
      GiphyWrapper.findImage(realMsg).then(res => {
        const imgUrl = res.data[0].images.looping.mp4;
        ctx.replyWithVideo({
          url: imgUrl
        });
      }).catch(err => {
        console.log(`Error: ${err}`);
        return err;
      });
    } else if (msg.indexOf('jaja') > -1 || msg.indexOf('haha') > -1) {
      Logger.info('Frida risa');
      ctx.reply('jajajajajajaja');
    } else if (cmd === 'frida help') {
      const help = `
      Te puedo ayudar si usas alguno de estos comandos: \n
      * frida imagen <imagen-a-buscar>
      * frida help
      `;
      ctx.reply(help);
    } else { // Just a simple echo
      Logger.info('Frida default');
      const resp = `
      "${ctx.message.text}"

      Gracias por tu mensaje :D"
      `;
      ctx.reply(resp);
    }
  }

  static getCommand(msg) {
    return TelegramInputHandler.getMessageCmds().find(ele => {
      return msg.startsWith(ele);
    });
  }
}

module.exports = TelegramInputHandler;
