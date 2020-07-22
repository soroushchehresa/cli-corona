import api from 'novelcovid';

api.settings({ baseUrl: 'https://disease.sh' });

export default class Data {
  static async get(country: string): Promise<{data: object}> {
    let covidData: object = {};
    if (country === 'all') {
      covidData = await api.all();
    } else {
      covidData = await api.countries({
        allowNull: false,
        sort: 'cases',
        strict: false,
        country,
      });
    }
    return { data: covidData };
  }
}
