import { bot } from './bot.js';

async function setInfo() {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' }
  ]);

}

export default setInfo;