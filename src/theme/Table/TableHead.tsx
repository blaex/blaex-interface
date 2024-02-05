import { v4 as uuidv4 } from 'uuid'

import Checkbox from 'theme/Checkbox'
import SortAscIcon from 'theme/Icons/SortAscIcon'
import SortDefaultIcon from 'theme/Icons/SortDefaultIcon'
import SortDescIcon from 'theme/Icons/SortDescIcon'
import { Box, Flex, Type } from 'theme/base'
import { SortTypeEnum } from 'utils/config/enums'

import { ColumnData, ColumnDataParameter, ColumnExternalSourceParameter, TableSortProps } from './types'
import { TableSelectHandler } from './useTableSelect'

export default function TableHead<T = ColumnDataParameter, K = ColumnExternalSourceParameter>({
  currentSort,
  changeCurrentSort,
  columns,
  isSelectedAll,
  handleSelectedAll,
}: {
  currentSort: TableSortProps<T> | undefined
  changeCurrentSort: ((sort: TableSortProps<T> | undefined) => void) | undefined
  columns: ColumnData<T, K>[] | undefined
  isSelectedAll?: boolean
  handleSelectedAll?: TableSelectHandler<T>['handleSelectAll']
}) {
  const handleChangeSort = (
    columnSortBy: TableSortProps<T>['sortBy'] | undefined,
    columnSortType?: TableSortProps<T>['sortType'] | undefined
  ) => {
    if (!changeCurrentSort) return
    const isCurrentSort = !!currentSort && currentSort?.sortBy === columnSortBy
    if (!columnSortBy) return
    const theFirstSort = columnSortType ?? SortTypeEnum.DESC
    const theSecondSort = theFirstSort === SortTypeEnum.DESC ? SortTypeEnum.ASC : SortTypeEnum.DESC
    if (!isCurrentSort) {
      changeCurrentSort({
        sortBy: columnSortBy,
        sortType: theFirstSort,
      })
    }
    if (isCurrentSort && currentSort.sortType === theFirstSort) {
      changeCurrentSort({
        sortBy: columnSortBy,
        sortType: theSecondSort,
      })
    }
    if (isCurrentSort && currentSort.sortType === theSecondSort) {
      changeCurrentSort(undefined)
    }
  }

  return (
    <thead style={{ position: 'relative', width: '100%' }}>
      <tr>
        {handleSelectedAll && (
          <th
            style={{
              paddingTop: 4,
              width: '48px',
              verticalAlign: 'middle',
            }}
          >
            <Type.Caption>
              <Checkbox
                checked={isSelectedAll}
                defaultChecked={isSelectedAll}
                onChange={() => handleSelectedAll(!!isSelectedAll)}
              />
            </Type.Caption>
          </th>
        )}
        {columns?.map((column) => {
          const key = column?.key ? column.key : uuidv4()
          const isCurrentSort = currentSort?.sortBy === column.sortBy
          return (
            <Box as="th" key={key.toString()} sx={column.style} data-table-key={column.key}>
              <Box
                width="100%"
                role={column?.sortBy && changeCurrentSort ? 'button' : 'none'}
                onClick={() => {
                  handleChangeSort(column?.sortBy, column?.sortType)
                }}
                sx={{
                  color: column?.sortBy && isCurrentSort ? 'neutral1' : 'neutral5',
                  '&:hover': {
                    color: column?.sortBy ? 'neutral2' : 'neutral5',
                  },
                }}
              >
                {column.sortBy && changeCurrentSort ? (
                  <Type.Small fontWeight={isCurrentSort ? 'bold' : 'normal'} sx={{ width: '100%' }}>
                    <Flex alignItems="center" as="span" sx={{ justifyContent: column.style?.textAlign }}>
                      {column.title}
                      {isCurrentSort ? (
                        currentSort?.sortType === SortTypeEnum.DESC ? (
                          <SortDescIcon />
                        ) : (
                          <SortAscIcon />
                        )
                      ) : (
                        <SortDefaultIcon />
                      )}
                    </Flex>
                  </Type.Small>
                ) : (
                  <Type.Small sx={{ width: '100%' }}>{column.title}</Type.Small>
                )}
              </Box>
            </Box>
          )
        })}
      </tr>
    </thead>
  )
}
