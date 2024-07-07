import { memo } from 'react';
import clsx from 'clsx';

type TScrollDownBtnProps = {
  className?: string;
  onClick?: () => void;
};

function ScrollDownBtn(props: TScrollDownBtnProps) {
  const className = clsx('tooltip', props.className);

  return (
    <div className={className} data-tip="Вниз">
      <button onClick={props.onClick} className="btn btn-md btn-circle">
        <svg
          className="h-6 w-6 fill-current md:h-8 md:w-8 rotate-[-90deg]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
        </svg>
      </button>
    </div>
  );
}

export default memo(ScrollDownBtn);
