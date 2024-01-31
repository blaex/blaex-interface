import { Svg } from 'theme/base'
import { SvgProps } from 'theme/types'

const SortAscIcon = ({ size = 16, ...rest }: { size?: number } & SvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M5.78252 6.28247L8.2519 3.81309L10.7213 6.28309C10.8622 6.42399 11.0533 6.50314 11.2525 6.50314C11.4518 6.50314 11.6429 6.42399 11.7838 6.28309C11.9247 6.14219 12.0038 5.9511 12.0038 5.75184C12.0038 5.55258 11.9247 5.36149 11.7838 5.22059L8.78377 2.22059C8.71409 2.15067 8.6313 2.09519 8.54014 2.05734C8.44897 2.01949 8.35123 2 8.25252 2C8.15381 2 8.05607 2.01949 7.96491 2.05734C7.87374 2.09519 7.79095 2.15067 7.72127 2.22059L4.72127 5.22059C4.58038 5.36149 4.50122 5.55258 4.50122 5.75184C4.50122 5.9511 4.58038 6.14219 4.72127 6.28309C4.86217 6.42399 5.05326 6.50314 5.25252 6.50314C5.45178 6.50314 5.64288 6.42399 5.78377 6.28309L5.78252 6.28247Z"
        fill="#FCFCFD"
      />
      <path
        d="M5.7813 9.72144L8.25068 12.1908L10.7201 9.72082C10.8609 9.57992 11.052 9.50076 11.2513 9.50076C11.4506 9.50076 11.6417 9.57992 11.7826 9.72082C11.9234 9.86171 12.0026 10.0528 12.0026 10.2521C12.0026 10.4513 11.9234 10.6424 11.7826 10.7833L8.78255 13.7833C8.71287 13.8532 8.63008 13.9087 8.53891 13.9466C8.44775 13.9844 8.35001 14.0039 8.2513 14.0039C8.15259 14.0039 8.05485 13.9844 7.96369 13.9466C7.87252 13.9087 7.78973 13.8532 7.72005 13.7833L4.72005 10.7833C4.57916 10.6424 4.5 10.4513 4.5 10.2521C4.5 10.0528 4.57916 9.86171 4.72005 9.72082C4.86095 9.57992 5.05204 9.50076 5.2513 9.50076C5.45056 9.50076 5.64165 9.57992 5.78255 9.72082L5.7813 9.72144Z"
        fill="#B1B5C4"
      />
    </Svg>
  )
}

export default SortAscIcon
