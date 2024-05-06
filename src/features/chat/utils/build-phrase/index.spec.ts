import { test, expect } from 'vitest';
import buildPhrase from '.';

import { TBuildPhraseProps } from './types';
import phrases from './phrases';

test('[balanced продукт]: Должна выдаваться корректная фраза', () => {
  const propsIn: TBuildPhraseProps = {
    aLot: false,
    product: 'balanced',
  };
  const expectedPhrase = phrases['balanced'];
  const phrase = buildPhrase(propsIn);

  expect(phrase).toBe(expectedPhrase);
});

test('[carbohydrates продукт (мало)]: Должна выдаваться корректная фраза', () => {
  const propsIn: TBuildPhraseProps = {
    aLot: false,
    product: 'carbohydrates',
  };
  const expectedPhrase = phrases['aSmallCarbohydrates'];
  const phrase = buildPhrase(propsIn);

  expect(phrase).toBe(expectedPhrase);
});

test('[carbohydrates продукт (много)]: Должна выдаваться корректная фраза', () => {
  const propsIn: TBuildPhraseProps = {
    aLot: true,
    product: 'carbohydrates',
  };
  const expectedPhrase = phrases['aLotCarbohydrates'];
  const phrase = buildPhrase(propsIn);

  expect(phrase).toBe(expectedPhrase);
});
