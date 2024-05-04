import { memo } from 'react';

import { useSnackbarsStore } from '../../store';

function AllSnackbars() {
  const snackbarsStore = useSnackbarsStore();

  return (
    <>
      {Boolean(snackbarsStore.errorSnack) && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{snackbarsStore.errorSnack?.bodyText}</span>

            {Boolean(snackbarsStore.errorSnack?.buttonText) && (
              <button
                onClick={() => snackbarsStore.setErrorSnack(null)}
                className="btn btn-sm"
              >
                {snackbarsStore.errorSnack?.buttonText}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AllSnackbars);
