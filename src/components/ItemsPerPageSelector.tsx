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
    <div className="flex items-center gap-2">
      <label className="text-sm font-semibold text-gray-600">
        Mostrar por página:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer"
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
