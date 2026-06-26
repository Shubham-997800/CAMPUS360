// ============================================
// LostFound data - Mock data for Lost & Found page
// categories: dropdown filter options (minus 'All' for form dropdown)
// lostItems: items reported as lost, each with gradient/icon for card display
// foundItems: items reported as found, same shape as lostItems
// gradients and icons arrays provide visual variety for item cards
// ============================================

export const categories = ['All', 'Electronics', 'Accessories', 'Books', 'Clothing', 'ID Cards', 'Bottles', 'Other']

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
]

const icons = ['📱', '🎧', '📚', '👕', '🪪', '🧴', '🎒', '⌚']

export const lostItems = [
  {
    id: 1,
    name: 'Samsung Galaxy Buds 2',
    category: 'Electronics',
    date: '2026-07-24',
    location: 'Library, 2nd Floor Reading Hall',
    description: 'Lost my Samsung Galaxy Buds 2 in the library reading hall around 3 PM. Black color, with a grey case. Reward for return.',
    gradient: gradients[1],
    icon: icons[1],
    status: 'lost',
  },
  {
    id: 2,
    name: 'Blue Hoodie (Nike)',
    category: 'Clothing',
    date: '2026-07-23',
    location: 'Sports Complex, Basketball Court',
    description: 'Left my Nike blue hoodie near the basketball court benches after practice. Size M, has a small logo on the chest.',
    gradient: gradients[3],
    icon: icons[3],
    status: 'lost',
  },
  {
    id: 3,
    name: 'Student ID Card - 2024CS056',
    category: 'ID Cards',
    date: '2026-07-22',
    location: 'CS Block, Ground Floor Corridor',
    description: 'Lost my student ID card somewhere near the CS block ground floor. Name: Rahul Sharma. Roll No: 2024CS056.',
    gradient: gradients[4],
    icon: icons[4],
    status: 'lost',
  },
  {
    id: 4,
    name: 'HP Laptop Charger',
    category: 'Electronics',
    date: '2026-07-21',
    location: 'Seminar Hall B',
    description: 'Forgot my HP laptop charger in Seminar Hall B after the AI workshop. It is a 65W USB-C charger.',
    gradient: gradients[0],
    icon: icons[0],
    status: 'lost',
  },
  {
    id: 5,
    name: 'Introduction to Algorithms (CLRS)',
    category: 'Books',
    date: '2026-07-20',
    location: 'Cafeteria, Table 7',
    description: 'Left my CLRS textbook on table 7 near the west window in the cafeteria. Has my name on the first page.',
    gradient: gradients[2],
    icon: icons[2],
    status: 'lost',
  },
]

export const foundItems = [
  {
    id: 101,
    name: 'Black Metal Water Bottle',
    category: 'Bottles',
    date: '2026-07-25',
    location: 'Main Auditorium, Row F',
    description: 'Found a black metal water bottle under seat F-12 after the Tech Symposium. Milton brand, 1L capacity.',
    gradient: gradients[5],
    icon: icons[5],
    status: 'found',
  },
  {
    id: 102,
    name: 'Wireless Mouse (Logitech)',
    category: 'Electronics',
    date: '2026-07-24',
    location: 'Computer Lab 4',
    description: 'Found a Logitech wireless mouse on desk 12 in Computer Lab 4. Grey color, needs one AA battery.',
    gradient: gradients[6],
    icon: icons[1],
    status: 'found',
  },
  {
    id: 103,
    name: 'Grey Backpack',
    category: 'Accessories',
    date: '2026-07-23',
    location: 'Library, 1st Floor',
    description: 'A grey backpack was found near the self-issue kiosk. Contains a few notebooks and a pencil case. Claim at the library counter.',
    gradient: gradients[7],
    icon: icons[6],
    status: 'found',
  },
  {
    id: 104,
    name: 'Casio Digital Watch',
    category: 'Accessories',
    date: '2026-07-22',
    location: 'Open Air Theatre, Stage Area',
    description: 'Found a Casio digital watch near the stage area after the cultural fest rehearsal. Black dial with blue accents.',
    gradient: gradients[1],
    icon: icons[7],
    status: 'found',
  },
  {
    id: 105,
    name: 'Python Programming Notebook',
    category: 'Books',
    date: '2026-07-21',
    location: 'Hostel Block C, Common Room',
    description: 'Found a spiral-bound notebook with Python programming notes. Written by "Ananya" on the first page.',
    gradient: gradients[2],
    icon: icons[2],
    status: 'found',
  },
  {
    id: 106,
    name: 'College ID Card - 2023ME042',
    category: 'ID Cards',
    date: '2026-07-20',
    location: 'Main Gate, Parking Area',
    description: 'Found an ID card near the parking lot. Name: Priya Patel, Roll No: 2023ME042, Mechanical Engineering.',
    gradient: gradients[4],
    icon: icons[4],
    status: 'found',
  },
]
