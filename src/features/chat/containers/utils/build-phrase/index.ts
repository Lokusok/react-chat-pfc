const phrases = {
  aLotCarbohydrates: 'Хочу продукт с большим количеством углеводов.',
  aLotFats: 'Хочу продукт с большим количеством жиров.',
  aLotProteins: 'Хочу продукт с большим количеством белков.',

  aSmallCarbohydrates: 'Хочу продукт с малым количеством углеводов.',
  aSmallFats: 'Хочу продукт с малым количеством жиров.',
  aSmallProteins: 'Хочу продукт с малым количеством белков.',

  balanced: 'Хочу сбалансированный продукт.',
};

type TBuildPhraseProps = {
  product: TProducts;
  aLot: boolean;
};

/**
 * Получить фразу в соответствии с продуктом и его количеством
 */
function buildPhrase({ product, aLot }: TBuildPhraseProps): string {
  let text = '';

  if (product === 'balanced') {
    text = phrases[product];
    console.log({ product, text });
  } else {
    let key = aLot ? 'aLot' : 'aSmall';

    key += product.charAt(0).toUpperCase() + product.substring(1);
    text = phrases[key as keyof typeof phrases];
  }

  return text;
}

export default buildPhrase;
