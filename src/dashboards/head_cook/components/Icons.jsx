import { Beer, Coffee, CupSoda, Sandwich, UtensilsCrossed } from "lucide-react"

export const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

export const ClipboardListIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
)

export const CoffeeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h18v4H3V3zm0 5h12v1H3V8zm0 3h12v1H3v-1zm0 3h12v1H3v-1z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8" />
  </svg>
)

export const UtensilsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h18v4H3V3zm0 5h12v1H3V8zm0 3h12v1H3v-1zm0 3h12v1H3v-1z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8" />
  </svg>
)

export const GlassWaterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19c-4.3 0-7.8-3.4-7.8-7.5 0-2 .8-3.8 2-5.2l5.8-7.3 5.8 7.3c1.2 1.4 2 3.2 2 5.2 0 4.1-3.5 7.5-7.8 7.5z"
    />
  </svg>
)

export const BeerIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v16a2 2 0 002 2h10a2 2 0 002-2V3" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 4h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-4-8h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-4-8h2a2 2 0 012 2v2a2 2 0 01-2 2H8"
    />
  </svg>
)

export const StatusIcons = {
  Pending: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" stroke="#F59E0B" strokeWidth={2} d="M12 8v4l3 3" />
    </svg>
  ),
  Preparing: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" stroke="#3B82F6" strokeWidth={2} d="M12 8v4l3 3" />
    </svg>
  ),
  Prepared: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" stroke="#10B981" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Cancelled: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" stroke="#EF4444" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
}

export const TypeIcons = {
  Breakfast: ({ className }) => (
    <Coffee className="w-5 h-5 text-pink-500 mr-3" />
  ),
  Lunch: ({ className }) => (
    <Sandwich className="w-5 h-5 text-pink-500 mr-3" />
  ),
  Dinner: ({ className }) => (
    <UtensilsCrossed className="w-5 h-5 text-pink-500 mr-3" />
  ),
  Drinks: ({ className }) => (
    <CupSoda className="w-5 h-5 text-pink-500 mr-3" />
  ),
  Party: ({ className }) => (
    <Beer className="w-5 h-5 text-pink-500 mr-3" />
  ),
}
