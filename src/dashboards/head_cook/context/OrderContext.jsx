"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Sample data
const initialOrders = [
  {
    id: "1001",
    voyager: {
      name: "Emma Johnson",
      cabin: "A204",
    },
    date: "6/15/2023",
    time: "8:30:00 AM",
    type: "Breakfast",
    status: "Pending",
    items: [
      { name: "Continental Breakfast", quantity: 2 },
      { name: "Fresh Orange Juice", quantity: 2 },
      { name: "Croissant", quantity: 4 },
    ],
    specialInstructions: "Please deliver at 9:00 AM",
  },
  {
    id: "1002",
    voyager: {
      name: "Michael Smith",
      cabin: "B118",
    },
    date: "6/15/2023",
    time: "9:15:00 AM",
    type: "Dinner",
    status: "Preparing",
    items: [
      { name: "Seafood Platter", quantity: 1 },
      { name: "Bottle of Champagne", quantity: 1 },
      { name: "Chocolate Dessert", quantity: 2 },
    ],
    specialInstructions: "",
  },
  {
    id: "1003",
    voyager: {
      name: "Sophia Garcia",
      cabin: "A315",
    },
    date: "6/15/2023",
    time: "10:45:00 AM",
    type: "Lunch",
    status: "Prepared",
    items: [
      { name: "Vegetarian Lunch", quantity: 1 },
      { name: "Green Salad", quantity: 1 },
      { name: "Fruit Smoothie", quantity: 1 },
    ],
    specialInstructions: "No onions please",
  },
  {
    id: "1004",
    voyager: {
      name: "James Wilson",
      cabin: "C102",
    },
    date: "6/15/2023",
    time: "11:20:00 AM",
    type: "Lunch",
    status: "Pending",
    items: [
      { name: "Burger and Fries", quantity: 2 },
      { name: "Soft Drinks", quantity: 2 },
    ],
    specialInstructions: "",
  },
  {
    id: "1005",
    voyager: {
      name: "Olivia Brown",
      cabin: "B220",
    },
    date: "6/15/2023",
    time: "12:00:00 PM",
    type: "Drinks",
    status: "Cancelled",
    items: [
      { name: "Afternoon Tea Set", quantity: 1 },
      { name: "Assorted Pastries", quantity: 1 },
    ],
    specialInstructions: "",
  },
  {
    id: "1006",
    voyager: {
      name: "William Davis",
      cabin: "A112",
    },
    date: "6/15/2023",
    time: "2:30:00 PM",
    type: "Dinner",
    status: "Pending",
    items: [
      { name: "Steak Dinner", quantity: 2 },
      { name: "Red Wine", quantity: 1 },
    ],
    specialInstructions: "Medium rare steaks",
  },
]

const OrderContext = createContext()

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Load orders from localStorage or use initial data
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      setOrders(initialOrders)
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  }, [orders])

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getOrdersByType = (type) => {
    if (type === "All") {
      return orders
    }
    return orders.filter((order) => order.type === type)
  }

  const getOrderById = (id) => {
    return orders.find((order) => order.id === id)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        updateOrderStatus,
        getOrdersByType,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
