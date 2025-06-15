import { useState } from "react"
import { Link } from "react-router-dom"
import { Edit, Trash2, MoreHorizontal, Filter, Search } from "lucide-react"

const DataTable = ({ data, columns, onDelete, editPath, searchPlaceholder = "Search...", filters = [] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({})
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  // Filter data based on search term and active filters
  const filteredData = data.filter((item) => {
    // Search filter
    const matchesSearch = Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Apply all active filters
    const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true // Skip empty filters
      return item[key] === value
    })

    return matchesSearch && matchesFilters
  })

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table controls */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full md:w-64"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {filters.length > 0 && (
          <div className="relative">
            <button
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-3">
                  <h3 className="font-medium text-gray-700 mb-2">Filter by</h3>
                  {filters.map((filter) => (
                    <div key={filter.name} className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{filter.label}</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={activeFilters[filter.name] || ""}
                        onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                      >
                        <option value="">All</option>
                        {filter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <div className="flex justify-between mt-3">
                    <button
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      onClick={() => setActiveFilters({})}
                    >
                      Clear all
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600"
                      onClick={() => setShowFilterMenu(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={`${editPath}/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block border border-gray-200">
                          <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              View Details
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Duplicate
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredData.length}</span> of{" "}
              <span className="font-medium">{filteredData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
