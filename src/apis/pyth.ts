import axios from 'axios'

import { getAxiosErrorMessage } from 'utils/helpers/handleError'

const pythRequester = axios.create({
  baseURL: 'https://benchmarks.pyth.network/v1/shims/tradingview',
  timeout: 300000,
})

pythRequester.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(getAxiosErrorMessage(error))
  }
)

export default pythRequester
