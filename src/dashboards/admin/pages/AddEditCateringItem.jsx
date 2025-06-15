import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Utensils, Info, Tag, Flame, UtensilsCrossed, IndianRupee, LayoutList, UserRoundPen } from "lucide-react"
import Header from "../components/Header"

const AddEditCateringItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    available: true,
    calories: "",
    dietaryInfo: "",
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
          name: "Grilled Salmon",
          category: "Main Course",
          price: "24.99",
          available: true,
          calories: "450",
          dietaryInfo: "Gluten-Free",
          description: "Fresh Atlantic salmon grilled to perfection with lemon and herbs.",
        }
        setFormData(mockItem)
        setLoading(false)
      }, 500)
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call to save data
    setTimeout(() => {
      setSaving(false)
      // Show success message
      alert(`${isEditing ? "Updated" : "Added"} catering item successfully!`)
      // Redirect back to catering items list
      navigate("/catering")
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
        title={isEditing ? "Edit Catering Item" : "Add New Catering Item"}
        subtitle={isEditing ? "Update menu item details" : "Create a new menu item"}
        user={user}
      />

      <button onClick={() => navigate("/admin/catering")} className="flex items-center btn-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Catering Items
      </button>

      <form onSubmit={handleSubmit}>

        {/* Basic Information */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Utensils className="w-5 h-5 mr-2 text-pink-500" />
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
                <option value="Appetizer">Appetizer</option>
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

          </div>

        </div>

        {/* Details & Pricing */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center">
            <Info className="w-5 h-5 mr-2 text-pink-500" />
            Details & Pricing
          </h3>

          {/* Price, Category and Dietary Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

            {/* Calories */}
            <div className="form-group">
              <label htmlFor="calories" className="form-label flex items-center">
                <Flame className="w-4 h-4 mr-1 text-gray-500" />
                Calories
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="form-input"
                min="0"
                placeholder="0"
              />
            </div>

            {/* Dietary Info */}
            <div className="form-group">
              <label htmlFor="dietaryInfo" className="form-label flex items-center">
                <Tag className="w-4 h-4 mr-1 text-gray-500" />
                Dietary Information
              </label>
              <input
                type="text"
                id="dietaryInfo"
                name="dietaryInfo"
                value={formData.dietaryInfo}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Vegetarian, Gluten-Free, Contains Nuts"
              />
            </div>

          </div>

          {/* Is available */}
          <div className="form-group mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="form-checkbox"
              />
              <label htmlFor="available" className="form-checkbox-label flex items-center">
                <UtensilsCrossed className={`w-4 h-4 mr-1 ${formData.available ? "text-green-500" : "text-red-500"}`} />
                Item is {formData.available ? "available" : "unavailable"} on the menu
              </label>
            </div>
          </div>

        </div>

        {/* Description */}
        <div className="form-section">
          <h3 className="form-section-title">Description</h3>

          <div className="form-group">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe the menu item..."
              rows="4"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Provide a detailed description of the menu item including ingredients and preparation method.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/admin/catering")} className="btn-secondary" disabled={saving}>
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

export default AddEditCateringItem
