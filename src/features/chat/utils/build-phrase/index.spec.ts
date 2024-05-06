import { test, expect, describe } from 'vitest';
import buildPhrase from '.';

import { TBuildPhraseProps } from './types';
import phrases from './phrases';

describe('Выдача корректной пользовательской фразы', () => {
  test('[balanced продукт]', () => {
    const propsIn: TBuildPhraseProps = {
      aLot: false,
      product: 'balanced',
    };
    const expectedPhrase = phrases['balanced'];
    const phrase = buildPhrase(propsIn);

    expect(phrase).toBe(expectedPhrase);
  });

  test('[carbohydrates продукт (мало)]', () => {
    const propsIn: TBuildPhraseProps = {
      aLot: false,
      product: 'carbohydrates',
    };
    const expectedPhrase = phrases['aSmallCarbohydrates'];
    const phrase = buildPhrase(propsIn);

    expect(phrase).toBe(expectedPhrase);
  });

  test('[carbohydrates продукт (много)]', () => {
    const propsIn: TBuildPhraseProps = {
      aLot: true,
      product: 'carbohydrates',
    };
    const expectedPhrase = phrases['aLotCarbohydrates'];
    const phrase = buildPhrase(propsIn);

    expect(phrase).toBe(expectedPhrase);
  });
});
