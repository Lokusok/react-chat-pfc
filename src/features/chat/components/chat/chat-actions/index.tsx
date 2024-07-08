import { memo } from 'react';

type TActionsProps = {
  showLarge: boolean;
  onTogglerChange: (val: boolean) => void;
  renderLargeEntities: () => React.ReactNode;
  renderSmallEntities: () => React.ReactNode;
  renderAdditional?: () => React.ReactNode;
  renderDivider?: () => React.ReactNode;
};

function Actions(props: TActionsProps) {
  const {
    showLarge,
    onTogglerChange,
    renderLargeEntities,
    renderSmallEntities,
    renderAdditional,
    renderDivider,
  } = props;

  return (
    <>
      {Boolean(renderDivider) && renderDivider?.()}

      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          {showLarge ? renderLargeEntities() : renderSmallEntities()}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer flex justify-end gap-3">
            <span className="label-text">Мало / Много</span>
            <input
              onChange={(e) => onTogglerChange(e.target.checked)}
              checked={showLarge}
              type="checkbox"
              className="toggle"
            />
          </label>
        </div>

        {Boolean(renderAdditional) && renderAdditional?.()}
      </div>
    </>
  );
}

export default memo(Actions);
