import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { test, expect, vi, describe, beforeEach } from 'vitest';
import Chat from '.';
import { TMessage } from '../../store/chat/types';

const dialog: TMessage[] = [
  {
    id: crypto.randomUUID(),
    from: 'bot',
    type: 'default',
    text: 'Я - бот, который поможет Вам подобрать продукты под Ваши предпочтения БЖУ!',
  },
  {
    id: crypto.randomUUID(),
    from: 'bot',
    type: 'default',
    text: 'Внизу расположены кнопки. Нажмите на них, чтобы получить продукт под желаемый запрос.',
  },
];

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  window.ResizeObserver = mockIntersectionObserver;
});

describe('Компонент <Chat />', () => {
  test('Корректная работа при малых количествах', async () => {
    const user = userEvent.setup();
    const callbacks = {
      getLargeCarbohydrates: vi.fn(),
      getLargeFats: vi.fn(),
      getLargeProteins: vi.fn(),

      getSmallCarbohydrates: vi.fn(),
      getSmallFats: vi.fn(),
      getSmallProteins: vi.fn(),

      getBalanced: vi.fn(),
    };

    const renderer = render(
      <Chat showLargeDefault={false} dialog={dialog} callbacks={callbacks} />
    );

    waitFor(async () => {
      const res = await renderer.findByText(dialog[0].text);
      expect(res).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('action-a-small-carbohydrates'));
    expect(callbacks.getSmallCarbohydrates).toBeCalledTimes(1);

    await user.click(screen.getByTestId('action-a-small-fats'));
    expect(callbacks.getSmallFats).toBeCalledTimes(1);

    await user.click(screen.getByTestId('action-a-small-proteins'));
    expect(callbacks.getSmallProteins).toBeCalledTimes(1);
  });

  test('Корректная работа при больших количествах', async () => {
    const user = userEvent.setup();
    const callbacks = {
      getLargeCarbohydrates: vi.fn(),
      getLargeFats: vi.fn(),
      getLargeProteins: vi.fn(),

      getSmallCarbohydrates: vi.fn(),
      getSmallFats: vi.fn(),
      getSmallProteins: vi.fn(),

      getBalanced: vi.fn(),
    };

    const renderer = render(
      <Chat showLargeDefault={true} dialog={dialog} callbacks={callbacks} />
    );

    waitFor(async () => {
      const res = await renderer.findByText(dialog[0].text);
      expect(res).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('action-a-lot-carbohydrates'));
    expect(callbacks.getLargeCarbohydrates).toBeCalledTimes(1);

    await user.click(screen.getByTestId('action-a-lot-fats'));
    expect(callbacks.getLargeFats).toBeCalledTimes(1);

    await user.click(screen.getByTestId('action-a-lot-proteins'));
    expect(callbacks.getLargeProteins).toBeCalledTimes(1);
  });
});
