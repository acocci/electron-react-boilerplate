/* eslint-disable react/jsx-props-no-spreading */
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

function CirclePlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <g color="white">
        <circle
          fill="currentcolor"
          fillOpacity={0.5}
          cx="11.8"
          cy="11.8"
          r="10.4"
        />
      </g>
      <g>
        <path
          d="M12,1.3C6.1,1.3,1.3,6.1,1.3,12c0,5.9,4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7C22.7,6.1,17.9,1.3,12,1.3z
	 M17.8,13.9h-3.9v3.9h-3.8v-3.9H6.2v-3.7h3.9V6.3h3.8v3.9h3.9V13.9z"
        />
      </g>
    </SvgIcon>
  );
}

export default CirclePlusIcon;
