import { useState, useMemo } from 'react'

interface UsePaginationProps {
  items: any[]
  itemsPerPage?: number
  initialPage?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  paginatedItems: any[]
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

/**
 * usePagination - Hook para manejar paginación
 */
export const usePagination = ({
  items,
  itemsPerPage = 6,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    const endIdx = startIdx + itemsPerPage
    return items.slice(startIdx, endIdx)
  }, [items, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNum)
  }

  const nextPage = () => {
    goToPage(currentPage + 1)
  }

  const prevPage = () => {
    goToPage(currentPage - 1)
  }

  const canGoNext = currentPage < totalPages
  const canGoPrev = currentPage > 1

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  }
}

export default usePagination
