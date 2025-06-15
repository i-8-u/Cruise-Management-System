import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  FileText,
  Package,
  FileIcon as FileDescription,
  IndianRupee,
  LayoutList,
  UserRoundPen,
  ListTodo,
} from "lucide-react"
import Header from "../components/Header"

const AddEditStationeryItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    supplier: "",
    reorderLevel: "",
    description: "",
  })

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Simulate API call to get item data
      setTimeout(() => {
        const mockItem = {
          id: Number.parseInt(id),
          name: "Ballpoint Pen",
          category: "Writing",
          price: "1.99",
          stock: "150",
          supplier: "Office Supplies Inc.",
          reorderLevel: "30",
          description: "Smooth writing ballpoint pen with blue ink.",
        }
        setFormData(mockItem)
        setLoading(false)
      }, 500)
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call to save data
    setTimeout(() => {
      setSaving(false)
      // Show success message
      alert(`${isEditing ? "Updated" : "Added"} stationery item successfully!`)
      // Redirect back to stationery items list
      navigate("/stationery")
    }, 800)
  }

  const user = {
    name: "Admin User",
    role: "System Administrator",
    avatar: "A",
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        <p className="mt-2 text-gray-500">Loading item data...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={isEditing ? "Edit Stationery Item" : "Add New Stationery Item"}
        subtitle={isEditing ? "Update stationery item details" : "Create a new stationery product"}
        user={user}
      />

      <button onClick={() => navigate("/admin/stationery")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Stationery Items
      </button>

      <form onSubmit={handleSubmit}>
        
        {/* Basic Information */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <FileText className="w-5 h-5 mr-2 text-pink-500" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Item Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <UserRoundPen className="w-4 h-4 mr-1 text-gray-500" />
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                <LayoutList className="w-4 h-4 mr-1 text-gray-500" />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a category</option>
                <option value="Writing">Writing</option>
                <option value="Paper">Paper</option>
                <option value="Office Equipment">Office Equipment</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>

          </div>
        </div>

        {/* Inventory & Pricing */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Package className="w-5 h-5 mr-2 text-pink-500" />
            Inventory & Pricing
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price" className="form-label flex items-center">
                <IndianRupee className="w-4 h-4 mr-1 text-gray-500" />
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              />
            </div>

            {/* Current Stock */}
            <div className="form-group">
              <label htmlFor="stock" className="form-label">
                <ListTodo className="w-4 h-4 mr-1 text-gray-500" />
                Current Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-input"
                min="0"
                placeholder="0"
                required
              />
            </div>

          </div>

        </div>

        {/* Description */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <FileDescription className="w-5 h-5 mr-2 text-pink-500" />
            Description
          </h3>

          <div className="form-group">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe the stationery item..."
              rows="4"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Include details about the item's features, materials, and usage.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/stationery")} className="btn-secondary" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : isEditing ? (
              "Update Item"
            ) : (
              "Save Item"
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddEditStationeryItem
