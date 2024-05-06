import phrases from './phrases';
import { TBuildPhraseProps } from './types';

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
