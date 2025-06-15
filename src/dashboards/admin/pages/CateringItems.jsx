import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import Header from "../components/Header"
import DataTable from "../components/DataTable"


const CateringItems = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Grilled Salmon",
          category: "Main Course",
          price: 24.99,
          available: true,
          calories: 450,
          dietaryInfo: "Gluten-Free",
        },
        {
          id: 2,
          name: "Caesar Salad",
          category: "Appetizer",
          price: 12.99,
          available: true,
          calories: 320,
          dietaryInfo: "Vegetarian",
        },
        {
          id: 3,
          name: "Chocolate Mousse",
          category: "Dessert",
          price: 8.99,
          available: true,
          calories: 380,
          dietaryInfo: "Contains Dairy",
        },
        {
          id: 4,
          name: "Beef Wellington",
          category: "Main Course",
          price: 34.99,
          available: false,
          calories: 720,
          dietaryInfo: "Contains Gluten",
        },
        {
          id: 5,
          name: "Shrimp Cocktail",
          category: "Appetizer",
          price: 16.99,
          available: true,
          calories: 210,
          dietaryInfo: "Shellfish",
        },
        {
          id: 6,
          name: "Tiramisu",
          category: "Dessert",
          price: 9.99,
          available: true,
          calories: 420,
          dietaryInfo: "Contains Alcohol",
        },
        {
          id: 7,
          name: "Vegetable Curry",
          category: "Main Course",
          price: 18.99,
          available: true,
          calories: 380,
          dietaryInfo: "Vegan",
        },
        {
          id: 8,
          name: "Lobster Bisque",
          category: "Soup",
          price: 14.99,
          available: true,
          calories: 320,
          dietaryInfo: "Shellfish",
        },
      ]
      setItems(mockData)
      setLoading(false)
    }, 500)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const columns = [
    { key: "name", header: "Item Name" },
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (item) => `$${item.price.toFixed(2)}`,
    },
    {
      key: "available",
      header: "Availability",
      render: (item) => (
        <span className={`badge ${item.available ? "badge-success" : "badge-danger"}`}>
          {item.available ? "Available" : "Unavailable"}
        </span>
      ),
    },
    { key: "calories", header: "Calories" },
    { key: "dietaryInfo", header: "Dietary Info" },
  ]

  const filters = [
    {
      name: "category",
      label: "Category",
      options: [
        { value: "Main Course", label: "Main Course" },
        { value: "Appetizer", label: "Appetizer" },
        { value: "Dessert", label: "Dessert" },
        { value: "Soup", label: "Soup" },
      ],
    },
    {
      name: "available",
      label: "Availability",
      options: [
        { value: "true", label: "Available" },
        { value: "false", label: "Unavailable" },
      ],
    },
  ]

  const user = {
    name: "Admin User",
    role: "System Administrator",
    avatar: "A",
  }

  return (
    <div>
      <Header title="Catering Items" subtitle="Manage menu items for your cruise" user={user} />

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">All Catering Items</h2>
        <Link to="/admin/catering/add" className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Add New Item
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <p className="mt-2 text-gray-500">Loading items...</p>
        </div>
      ) : (
        <DataTable
          data={items}
          columns={columns}
          onDelete={handleDelete}
          editPath="/admin/catering/edit"
          searchPlaceholder="Search menu items..."
          filters={filters}
        />
      )}
    </div>
  )
}

export default CateringItems
