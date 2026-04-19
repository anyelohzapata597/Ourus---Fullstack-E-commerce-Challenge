import { FC } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  canGoNext: boolean
  canGoPrev: boolean
}

/**
 * Pagination - Componente de paginación visual
 */
const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  canGoNext,
  canGoPrev,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Mostrar con ellipsis
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8 flex-wrap">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          canGoPrev
            ? 'bg-primary text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-50'
        }`}
      >
        ← Anterior
      </button>

      {/* Números de página */}
      <div className="flex gap-1 flex-wrap justify-center">
        {generatePageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`
              px-3 py-2 rounded-lg font-semibold transition
              ${
                page === '...'
                  ? 'cursor-default text-gray-400'
                  : currentPage === page
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          canGoNext
            ? 'bg-primary text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-50'
        }`}
      >
        Siguiente →
      </button>

      {/* Info de página */}
      <div className="text-sm text-gray-600 font-semibold ml-4">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  )
}

export default Pagination
