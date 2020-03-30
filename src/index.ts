import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
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

    cli.action.start('Fetching Statistics');

    if (flags.country) {
      covidData = await data.get(flags.country);
    } else {
      const country: string = await cli.prompt('Country Name', {
        default: 'all',
        required: false
      });
      covidData = await data.get(country);
    }

    await table.draw(covidData);
  }
}

export = CliCorona;
