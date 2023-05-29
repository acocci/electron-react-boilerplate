import { Box } from '@mui/material';
import { intersection, isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';

import { ComponentById, DashboardControlOverlay } from '../../../components/ui';
import {
  getStorage,
  parseStorage,
  setStorageObject,
  setStorageString,
} from '../../../helpers/storage';

import { StyledPaper } from './Dashboard.styles';
import {
  allRoles,
  defaultGridProps,
  IResponsiveGridLayout,
  RequiredLayout,
} from './Dashboard.types';

const Dashboard = ({
  breakpoints,
  cols,
  components,
  disableSave,
  editable,
  layouts,
  roles,
  rowHeight,
  type,
}: IResponsiveGridLayout) => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [currentLayouts, setCurrentLayouts] = useState<Layouts | undefined>(
    layouts
  );
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [hasRole, setHasRole] = useState<boolean>(false);
  const editMode = useMemo(() => hasRole && editable, [hasRole, editable]);
  const unLocked = useMemo(
    () => hasRole && editable && canEdit,
    [hasRole, editable, canEdit]
  );
  const orginalLayout = layouts;

  // TODO: Value to come from state
  const currentRole = parseStorage('Role').split(',');
  const currentStorage = useMemo(() => {
    if (!getStorage('Dashboard')) {
      setStorageString(
        'Dashboard',
        JSON.stringify({ [`${type}`]: currentLayouts })
      );
    }
    return parseStorage('Dashboard') || '';
  }, [currentLayouts, type]);

  useEffect(() => {
    // if currentRole array has any matches in roles array
    if (!isEmpty(intersection(currentRole, roles)) || roles === allRoles) {
      setHasRole(true);
    }
  }, [currentRole, editable, roles]);

  const onLayoutChange = (layout: Layout[]): void => {
    setCurrentLayouts({ [RequiredLayout]: layout });
  };

  return (
    <Box>
      <ResponsiveGridLayout
        allowOverlap={false}
        breakpoints={breakpoints || defaultGridProps.breakpoints}
        cols={cols || defaultGridProps.cols}
        isDraggable={unLocked}
        isResizable={unLocked}
        layouts={currentLayouts}
        measureBeforeMount={true}
        rowHeight={rowHeight || defaultGridProps.rowHeight}
        onLayoutChange={onLayoutChange}
        resizeHandles={unLocked ? ['se'] : []}
        useCSSTransforms={true}
      >
        {components &&
          components.map((item) => (
            <StyledPaper key={item.id} elevation={2} square>
              <ComponentById components={components} selected={item.id} />
            </StyledPaper>
          ))}
      </ResponsiveGridLayout>
      {editMode && (
        <DashboardControlOverlay
          disableSave={disableSave}
          onEdit={() => setCanEdit(!canEdit)}
          onReset={() => setCurrentLayouts(orginalLayout)}
          onSave={() => {
            // Type will be used for either local or database storage as an identifier
            setStorageObject('Dashboard', {
              ...currentStorage,
              [`${type}`]: currentLayouts,
            });
          }}
        />
      )}
    </Box>
  );
};

export default Dashboard;
