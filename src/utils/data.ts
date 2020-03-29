import * as covid from 'novelcovid';

export default class Data {
  static async get(country: string) {
    let covidData = null;
    if (country === 'all') {
      covidData = await covid.getAll();
    } else {
      covidData = await covid.getCountry({ country });
    }
    return { data: covidData };
  }
}
