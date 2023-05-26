import { Paper } from '@mui/material';
import { styled } from '@mui/system';

const handleImg =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+';

export const StyledPaper = styled(Paper)({
  '& .react-resizable-handle': {
    '&::after': {
      borderBottom: '2px solid rgba(0, 0, 0, 0.4)',
      borderRight: '2px solid rgba(0, 0, 0, 0.4)',
      bottom: '3px',
      content: "' '",
      height: '5px',
      position: 'absolute',
      right: '3px',
      width: '5px',
    },
    backgroundImage: `url(${handleImg})`,
    backgroundOrigin: 'content-box',
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box',
    height: '12px',
    padding: '0 3px 3px 0',
    position: 'absolute',
    width: '12px',
  },
  '& .react-resizable-handle-e': {
    cursor: 'ew-resize',
    marginTop: '-10px',
    right: 0,
    top: '50%',
    transform: 'rotate(315deg)',
  },
  '& .react-resizable-handle-n': {
    cursor: 'ns-resize',
    left: '50%',
    marginLeft: '-10px',
    top: 0,
    transform: 'rotate(225deg)',
  },
  '& .react-resizable-handle-ne': {
    cursor: 'ne-resize',
    right: 0,
    top: 0,
    transform: 'rotate(270deg)',
  },
  '& .react-resizable-handle-nw': {
    cursor: 'nw-resize',
    left: 0,
    top: 0,
    transform: 'rotate(180deg)',
  },
  '& .react-resizable-handle-s': {
    bottom: 0,
    cursor: 'ns-resize',
    left: '50%',
    marginLeft: '-10px',
    transform: 'rotate(45deg)',
  },
  '& .react-resizable-handle-se': {
    bottom: 0,
    cursor: 'se-resize',
    right: 0,
  },
  '& .react-resizable-handle-sw': {
    bottom: 0,
    cursor: 'sw-resize',
    left: 0,
    transform: 'rotate(90deg)',
  },
  '& .react-resizable-handle-w': {
    cursor: 'ew-resize',
    left: 0,
    marginTop: '-10px',
    top: '50%',
    transform: 'rotate(135deg)',
  },

  '&.react-grid-item': {
    transition: 'all 200ms ease',
    transitionProperty: 'left, top',
  },

  '&.react-grid-item.react-draggable-dragging': {
    transition: 'none',
    willChange: 'transform',
    zIndex: 3,
  },

  '&.react-grid-item.resizing': {
    willChange: 'width, height',
    zIndex: 1,
  },

  '&.static': {
    '& .react-resizable-handle': {
      '&::after': {
        border: 'none',
      },
      backgroundImage: 'none',
    },
  },

  border: '1px solid black',
  overflowY: 'auto',
  position: 'relative',
});
