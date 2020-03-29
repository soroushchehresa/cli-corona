import cli from 'cli-ux';
import chalk from 'chalk';
// @ts-ignore
import TableCLI from 'cli-table';
import { string } from "@oclif/command/lib/flags";

type ColItem = string[];

export default class Table {
  static async draw({ data }) {
    const cols = this.renderColumns(data);

    const table = new TableCLI({
      head: [
        chalk.blue.bold('title'),
        chalk.blue.bold('count'),
      ],
      colWidths: [30, 20],
      chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│',
      }
    });

    table.push(...cols);

    console.log(table.toString());

    cli.action.stop('Done');
  }

  private static renderColumns(data: any): ColItem[] {
    let cols: ColItem[] = [];
    Object.keys(data).forEach((item: string) => {
      if ((typeof data[item] === ('number' || 'string')) && (item !== 'updated')) {
        cols = [...cols, [chalk.cyanBright.bold(item), chalk.green.bold(this.formatNumber(data[item]))]];
      }
    });
    return cols;
  }

  private static formatNumber(number: number): string {
    return Number((number).toFixed(1)).toLocaleString();
  }
}
