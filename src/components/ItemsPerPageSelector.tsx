import { FC } from 'react'

interface ItemsPerPageSelectorProps {
  value: number
  onChange: (value: number) => void
  options?: number[]
}

/**
 * ItemsPerPageSelector - Selector para cambiar cantidad de items por página
 */
const ItemsPerPageSelector: FC<ItemsPerPageSelectorProps> = ({
  value,
  onChange,
  options = [3, 6, 9, 12],
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
      <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
        Mostrar por página:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt} productos
          </option>
        ))}
      </select>
    </div>
  )
}

export default ItemsPerPageSelector
