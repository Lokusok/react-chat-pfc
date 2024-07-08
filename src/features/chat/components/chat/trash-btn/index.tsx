import { memo } from 'react';
import { Trash2 } from 'lucide-react';

type TTrashBtnProps = {
  className?: string;
  tooltipText?: string;
  disabled?: boolean;
  onClick?: () => void;
};

function TrashBtn(props: TTrashBtnProps) {
  return (
    <div className={props.className}>
      <div className="tooltip" data-tip={props.tooltipText}>
        <button
          onClick={props.onClick}
          disabled={props.disabled || false}
          className="btn btn-md btn-square"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}

export default memo(TrashBtn);
