import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import _ from 'lodash';
import chalk from 'chalk';
import data from './utils/data';
import table from './utils/table';

class CliCorona extends Command {
  static description = 'Coronavirus statistics by country.';

  static flags = {
    country: flags.string(
      {
        char: 'c',
        description: 'country name',
        required: false,
      }
    ),
  };

  async run() {
    const { flags } = this.parse(CliCorona);
    let covidData: {data: object} = { data: {} };
    if (flags.country) {
      cli.action.start('Fetching Statistics');
      covidData = await data.get(flags.country);
    } else {
      const country: string = await cli.prompt('Country Name', {
        default: 'all',
        required: false
      });
      cli.action.start('Fetching Statistics');
      covidData = await data.get(country);
    }

    const message = _.get(covidData, ['data', 'message']);
    if (message) {
      this.log(chalk.bold.redBright(message));
    } else {
      await table.draw(covidData);
    }
  }
}

export = CliCorona;
