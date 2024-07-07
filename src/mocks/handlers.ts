import { http, HttpResponse } from 'msw';
import products from './products.json';
import getRandomFromArray from './utils/get-random-from-array';

export const handlers = [
  http.get('/carbohydrates', ({ request }) => {
    const url = new URL(request.url);
    const aLot = url.searchParams.get('aLot') === 'true';

    console.log('aLot ===', aLot);

    const arrayToChoice = aLot
      ? products.carbohydrates.aLot
      : products.carbohydrates.notALot;

    return HttpResponse.json(getRandomFromArray(arrayToChoice));
  }),

  http.get('/fats', ({ request }) => {
    const url = new URL(request.url);
    const aLot = url.searchParams.get('aLot') === 'true';

    console.log('aLot ===', aLot);

    const arrayToChoice = aLot ? products.fats.aLot : products.fats.notALot;

    return HttpResponse.json(getRandomFromArray(arrayToChoice));
  }),

  http.get('/proteins', ({ request }) => {
    const url = new URL(request.url);
    const aLot = url.searchParams.get('aLot') === 'true';

    console.log('aLot ===', aLot);

    const arrayToChoice = aLot
      ? products.proteins.aLot
      : products.proteins.notALot;

    return HttpResponse.json(getRandomFromArray(arrayToChoice));
  }),

  http.get('/balanced', () => {
    const arrayToChoice = products.balanced;
    return HttpResponse.json(getRandomFromArray(arrayToChoice));
  }),
];
