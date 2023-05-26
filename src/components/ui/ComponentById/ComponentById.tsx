import { find } from 'lodash';
import { useMemo } from 'react';

import { IComponents } from './ComponentById.types';

function ComponentById({ components, selected }: IComponents) {
  const current = useMemo(
    () => find(components, ['id', selected]),
    [components, selected]
  );

  return (
    <>
      {current && current.Comp && (
        <current.Comp key={current.id} id={current.id} />
      )}
    </>
  );
}

export default ComponentById;
