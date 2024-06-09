export interface TaskElement {
  id: number, 
  text: string, 
  label: string,
  showMenu: boolean
}

export const templates = [
    { 
      id: 0, 
      title: 'Birthday Party',
      description: 'Celebrate another year of life with loved ones!',
      imageSrc: '/images/birthday.png',
      tasks: [
        { id: 1, text: 'Make a guest list', label: 'planning', showMenu: false },
        { id: 2, text: 'Create a budget', label: 'planning', showMenu: false },
        { id: 3, text: 'Develop a timeline', label: 'planning', showMenu: false },
        { id: 4, text: 'Send invitations', label: 'communication', showMenu: false },
        { id: 5, text: 'Follow up with guests', label: 'communication', showMenu: false },
        { id: 6, text: 'Create a seating chart', label: 'communication', showMenu: false },
        { id: 7, text: 'Book entertainment venue', label: 'booking', showMenu: false },
        { id: 8, text: 'Hire a band or DJ', label: 'booking', showMenu: false },
        { id: 9, text: 'Reserve rental equipment', label: 'booking', showMenu: false },
        { id: 10, text: 'Order food', label: 'catering', showMenu: false },
        { id: 11, text: 'Arrange beverage service', label: 'catering', showMenu: false },
        { id: 12, text: 'Coordinate with caterer', label: 'catering', showMenu: false },
        { id: 13, text: 'Prepare decorations', label: 'decor', showMenu: false },
        { id: 14, text: 'Create centerpieces', label: 'decor', showMenu: false },
        { id: 15, text: 'Set up lighting', label: 'decor', showMenu: false },
        { id: 16, text: 'Arrange tables', label: 'setup', showMenu: false },
        { id: 17, text: 'Set up chairs', label: 'setup', showMenu: false },
        { id: 18, text: 'Coordinate with venue staff', label: 'setup', showMenu: false },
      ]
    },
    { 
      id: 1, 
      title: 'Game Night',
      description: 'An evening of fun board games and camaraderie.',
      imageSrc: '/images/wedding.jpg', 
      tasks: [
        { id: 1, text: 'Choose games to play', label: 'planning', showMenu: false },
        { id: 2, text: 'Set a date and time', label: 'planning', showMenu: false },
        { id: 3, text: 'Create a budget for snacks and drinks', label: 'planning', showMenu: false },
        { id: 4, text: 'Invite friends', label: 'communication', showMenu: false },
        { id: 5, text: 'Send reminders', label: 'communication', showMenu: false },
        { id: 6, text: 'Confirm attendance', label: 'communication', showMenu: false },
        { id: 7, text: 'Reserve a venue (if needed)', label: 'booking', showMenu: false },
        { id: 8, text: 'Book a game master (optional)', label: 'booking', showMenu: false },
        { id: 9, text: 'Rent or borrow extra games', label: 'booking', showMenu: false },
        { id: 10, text: 'Buy snacks', label: 'catering', showMenu: false },
        { id: 11, text: 'Prepare beverages', label: 'catering', showMenu: false },
        { id: 12, text: 'Order pizza or other food', label: 'catering', showMenu: false },
        { id: 13, text: 'Create a themed atmosphere', label: 'decor', showMenu: false },
        { id: 14, text: 'Set up game-related decorations', label: 'decor', showMenu: false },
        { id: 15, text: 'Prepare prize ribbons or trophies', label: 'decor', showMenu: false },
        { id: 16, text: 'Arrange tables and chairs', label: 'setup', showMenu: false },
        { id: 17, text: 'Set up game stations', label: 'setup', showMenu: false },
        { id: 18, text: 'Test game equipment', label: 'setup', showMenu: false },
      ]
    },
    { 
      id: 2, 
      title: 'Picnic',
      description: 'Celebrate academic achievements with others.',
      imageSrc: '/images/graduation.jpg', 
      tasks: [
        { id: 1, text: 'Choose a location', label: 'planning', showMenu: false },
        { id: 2, text: 'Set a date and time', label: 'planning', showMenu: false },
        { id: 3, text: 'Create a menu', label: 'planning', showMenu: false },
        { id: 4, text: 'Send invitations', label: 'communication', showMenu: false },
        { id: 5, text: 'Confirm RSVPs', label: 'communication', showMenu: false },
        { id: 6, text: 'Share directions and parking information', label: 'communication', showMenu: false },
        { id: 7, text: 'Reserve a picnic area (if needed)', label: 'booking', showMenu: false },
        { id: 8, text: 'Rent tables and chairs (if needed)', label: 'booking', showMenu: false },
        { id: 9, text: 'Book outdoor games or activities', label: 'booking', showMenu: false },
        { id: 10, text: 'Prepare sandwiches', label: 'catering', showMenu: false },
        { id: 11, text: 'Make salads', label: 'catering', showMenu: false },
        { id: 12, text: 'Pack beverages and ice', label: 'catering', showMenu: false },
        { id: 13, text: 'Choose a color scheme', label: 'decor', showMenu: false },
        { id: 14, text: 'Create a themed centerpiece', label: 'decor', showMenu: false },
        { id: 15, text: 'Prepare picnic blankets and pillows', label: 'decor', showMenu: false },
        { id: 16, text: 'Set up tables and chairs', label: 'setup', showMenu: false },
        { id: 17, text: 'Arrange food and beverage stations', label: 'setup', showMenu: false },
        { id: 18, text: 'Set up games and activities', label: 'setup', showMenu: false },
      ]
    },
  ];