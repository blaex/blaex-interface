import { SystemStyleObject } from '@styled-system/css'
import { ReactNode, RefObject } from 'react'
import { GridProps } from 'styled-system'

import { ApiResponseMeta } from 'apis/types'
import { TableSelectHandler } from './useTableSelect'
import { SortTypeEnum } from 'utils/config/enums'

export interface TableSortProps<T> {
  sortBy: keyof T
  sortType: SortTypeEnum
}

export type ColumnData<T = Record<string, any>, K = unknown> = {
  title: ReactNode
  dataIndex: keyof T | undefined
  key: keyof T | undefined
  style: Record<string, any>
  render?: (data: T, index?: number, externalSource?: K) => ReactNode
  numDigit?: number
  sortBy?: keyof T
  sortType?: SortTypeEnum
}
type ExtractDataType<Type> = Type extends ColumnData<infer T> ? T : never
type ExtractExternalSourceType<Type> = Type extends ColumnData<any, infer K> ? K : never
export type ColumnDataParameter = ExtractDataType<ColumnData>
export type ColumnExternalSourceParameter = ExtractExternalSourceType<ColumnData>
export interface TableProps<T, K> {
  data: T[] | undefined
  dataMeta?: ApiResponseMeta
  isLoading: boolean
  columns: ColumnData<T, K>[]
  footer?: ReactNode
  wrapperSx?: any
  borderWrapperSx?: any
  onClickRow?: (data: T) => void
  renderRowBackground?: (data: T, index: number) => string
  currentSort?: TableSortProps<T>
  changeCurrentSort?: (sort: TableSortProps<T> | undefined) => void
  externalSource?: K
  visibleColumns?: (keyof T)[]
  handleToggleVisibleColumn?: (key: keyof T) => void
  isSelectedAll?: boolean
  handleSelectAll?: TableSelectHandler<T>['handleSelectAll']
  checkIsSelected?: TableSelectHandler<T>['checkIsSelected']
  handleSelect?: TableSelectHandler<T>['handleSelect']
  restrictHeight?: boolean
  containerSx?: any
  scrollRef?: RefObject<HTMLDivElement> | null
  loadingSx?: any
  rowSx?: SystemStyleObject & GridProps
  isInfiniteLoad?: boolean
  tableHeadSx?: any
  tableBodySx?: any
  tableBodyWrapperSx?: any
  checkIsTop?: (data: T) => boolean
  scrollToTopDependencies?: any[]
  noDataMessage?: ReactNode
  // topIndex?: number
  // title?: ReactNode
  // subTitle?: ReactNode
}
export type InfiniteTableProps<T, K> = Omit<TableProps<T, K>, 'data'> & { data: T[] | undefined }
