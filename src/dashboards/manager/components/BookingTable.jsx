import { useState } from "react"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"

function BookingTable({ bookings, columns, title }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingBooking, setViewingBooking] = useState(null)
  const [editingBooking, setEditingBooking] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const itemsPerPage = 10

  const searchedBookings = bookings.filter((booking) =>
    Object.values(booking).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentBookings = searchedBookings.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(searchedBookings.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleViewBooking = (booking) => {
    setViewingBooking(booking)
    setEditingBooking(null)
  }

  const handleEditBooking = (booking) => {
    setEditingBooking(booking)
    setEditFormData(booking)
    setViewingBooking(null)
  }

  const handleCloseModal = () => {
    setViewingBooking(null)
    setEditingBooking(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  const handleSaveEdit = () => {
    alert("Booking updated successfully!")
    setEditingBooking(null)
  }

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentBookings.length > 0 ? (
              currentBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {column.accessor === "status" ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      ) : (
                        booking[column.accessor]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* <button
                      className="text-pink-600 hover:text-pink-900 mr-3"
                      onClick={() => handleViewBooking(booking)}
                    >
                      View
                    </button> */}
                    <button
                      className="text-pink-600 hover:text-pink-900"
                      onClick={() => handleEditBooking(booking)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-sm text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, searchedBookings.length)}</span> of{" "}
                <span className="font-medium">{searchedBookings.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? "z-10 bg-pink-50 border-pink-500 text-pink-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {editingBooking && (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Edit Booking</h3>
            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium text-gray-500">Booking ID:</label>
              <div className="col-span-2 text-sm text-gray-900">#{editingBooking.id}</div>
            </div>
            {columns.map((column, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center">
                <label htmlFor={column.accessor} className="text-sm font-medium text-gray-500">
                  {column.header}:
                </label>
                {column.accessor === "status" ? (
                  <select
                    id={column.accessor}
                    name={column.accessor}
                    value={editFormData[column.accessor] || ""}
                    onChange={handleInputChange}
                    className="col-span-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  <input
                    id={column.accessor}
                    name={column.accessor}
                    type="text"
                    className="col-span-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={editFormData[column.accessor] || ""}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      )}

    </div>
  )
}

export default BookingTable
