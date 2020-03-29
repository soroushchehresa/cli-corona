import { Command } from '@oclif/command';
import cli from 'cli-ux';
import data from './utils/data';
import table from './utils/table';

class CliCorona extends Command {
  static description = 'describe the command here';

  async run() {
    const country: string = await cli.prompt('country name', {
      default: 'all',
      required: false
    });
    cli.action.start('Fetching Statistics');
    const all = await data.get(country);
    await table.draw(all);
  }
}

export = CliCorona;
