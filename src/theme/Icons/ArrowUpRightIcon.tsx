import { Svg } from 'theme/base'
import { SvgProps } from 'theme/types'

const ArrowUpRightIcon = ({ size = 24, ...rest }: { size?: number } & SvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M18.7499 5.99794C18.7498 5.97395 18.7486 5.94999 18.7463 5.92607C18.7452 5.91476 18.7431 5.90378 18.7415 5.89261C18.7396 5.87951 18.7381 5.86642 18.7355 5.85347C18.733 5.84079 18.7295 5.82852 18.7263 5.81607C18.7235 5.80481 18.721 5.7935 18.7176 5.78233C18.7139 5.77011 18.7094 5.75834 18.7051 5.7464C18.7011 5.73523 18.6975 5.72401 18.6929 5.71302C18.6883 5.70199 18.6829 5.69146 18.6779 5.6807C18.6725 5.66921 18.6674 5.65763 18.6613 5.64642C18.6559 5.6363 18.6498 5.62673 18.6439 5.61689C18.6373 5.60572 18.6309 5.59436 18.6236 5.58347C18.6165 5.57285 18.6086 5.56282 18.6009 5.55262C18.5939 5.54323 18.5874 5.53362 18.5799 5.52446C18.5659 5.50748 18.5511 5.49123 18.5357 5.47553C18.5338 5.4736 18.5322 5.47154 18.5303 5.46962C18.5282 5.46751 18.5258 5.46573 18.5237 5.46362C18.5082 5.44851 18.4922 5.43382 18.4755 5.42004C18.4665 5.41267 18.457 5.40622 18.4477 5.3993C18.4374 5.39157 18.4272 5.38355 18.4165 5.37632C18.4058 5.36918 18.3947 5.363 18.3838 5.35646C18.3737 5.35041 18.3638 5.3441 18.3535 5.33856C18.3426 5.33275 18.3314 5.32785 18.3203 5.32258C18.3092 5.31732 18.2982 5.31178 18.2868 5.30702C18.2763 5.30272 18.2657 5.29924 18.255 5.29544C18.2425 5.29091 18.2302 5.2861 18.2174 5.28225C18.2072 5.27914 18.1968 5.27694 18.1864 5.27429C18.173 5.27085 18.1598 5.26714 18.1461 5.26444C18.1348 5.2622 18.1233 5.26092 18.1119 5.25922C18.0991 5.2573 18.0865 5.25497 18.0735 5.25368C18.0546 5.25185 18.0356 5.25121 18.0166 5.2508C18.011 5.25073 18.0056 5.25 18 5.25H8.25002C8.0511 5.25 7.86034 5.32902 7.71969 5.46967C7.57904 5.61032 7.50002 5.80109 7.50002 6C7.50002 6.19891 7.57904 6.38968 7.71969 6.53033C7.86034 6.67098 8.0511 6.75 8.25002 6.75H16.1893L5.4697 17.4696C5.32904 17.6103 5.25001 17.8011 5.25 18C5.24999 18.1989 5.329 18.3897 5.46965 18.5303C5.6103 18.671 5.80107 18.75 5.99998 18.75C6.1989 18.75 6.38967 18.671 6.53034 18.5304L17.25 7.81069V15.75C17.25 15.9489 17.329 16.1397 17.4697 16.2803C17.6103 16.421 17.8011 16.5 18 16.5C18.1989 16.5 18.3897 16.421 18.5303 16.2803C18.671 16.1397 18.75 15.9489 18.75 15.75V6L18.7499 5.99794Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default ArrowUpRightIcon
