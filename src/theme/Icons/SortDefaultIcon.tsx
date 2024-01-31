import { Svg } from 'theme/base'
import { SvgProps } from 'theme/types'

const SortDefaultIcon = ({ size = 16, ...rest }: { size?: number } & SvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M11.2826 9.71997C11.3525 9.78964 11.4079 9.87244 11.4458 9.9636C11.4837 10.0548 11.5031 10.1525 11.5031 10.2512C11.5031 10.3499 11.4837 10.4477 11.4458 10.5388C11.4079 10.63 11.3525 10.7128 11.2826 10.7825L8.28255 13.7825C8.21287 13.8524 8.13008 13.9079 8.03892 13.9457C7.94775 13.9836 7.85001 14.0031 7.7513 14.0031C7.65259 14.0031 7.55485 13.9836 7.46369 13.9457C7.37252 13.9079 7.28973 13.8524 7.22005 13.7825L4.22005 10.7825C4.07915 10.6416 4 10.4505 4 10.2512C4 10.052 4.07915 9.86086 4.22005 9.71997C4.36095 9.57907 4.55204 9.49992 4.7513 9.49992C4.95056 9.49992 5.14165 9.57907 5.28255 9.71997L7.75193 12.1881L10.2213 9.71809C10.2911 9.64848 10.3739 9.59331 10.465 9.55573C10.5561 9.51814 10.6538 9.49889 10.7523 9.49906C10.8509 9.49924 10.9484 9.51884 11.0394 9.55674C11.1304 9.59465 11.213 9.65011 11.2826 9.71997ZM5.28255 6.28247L7.75193 3.81309L10.2213 6.28309C10.3622 6.42399 10.5533 6.50314 10.7526 6.50314C10.9518 6.50314 11.1429 6.42399 11.2838 6.28309C11.4247 6.14219 11.5039 5.9511 11.5039 5.75184C11.5039 5.55258 11.4247 5.36149 11.2838 5.22059L8.2838 2.22059C8.21412 2.15067 8.13133 2.09519 8.04016 2.05734C7.949 2.01949 7.85126 2 7.75255 2C7.65384 2 7.5561 2.01949 7.46494 2.05734C7.37377 2.09519 7.29098 2.15067 7.2213 2.22059L4.2213 5.22059C4.0804 5.36149 4.00125 5.55258 4.00125 5.75184C4.00125 5.9511 4.0804 6.14219 4.2213 6.28309C4.3622 6.42399 4.55329 6.50314 4.75255 6.50314C4.95181 6.50314 5.1429 6.42399 5.2838 6.28309L5.28255 6.28247Z"
        fill="#777E91"
      />
    </Svg>
  )
}

export default SortDefaultIcon
