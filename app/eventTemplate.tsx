export interface TaskElement {
  id: string, 
  text: string, 
  completed: boolean,
  showMenu: boolean
}

export const templates = [
    { 
      id: 1, 
      title: 'Birthday Party',
      description: 'Celebrate another year of life with loved ones!',
      imageSrc: '/images/birthday.png',
      tasks: [
        { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
        { id: 2, text: 'Send invitations', completed: false, showMenu: false },
        { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
        { id: 4, text: 'Order food', completed: false, showMenu: false },
        { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
        { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
      ]
    },
    { 
      id: 2, 
      title: 'Wedding',
      description: 'Unite two hearts in love, surrounded by family & friends.',
      imageSrc: '/images/wedding.jpg', 
      tasks: [
        { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
        { id: 2, text: 'Send invitations', completed: false, showMenu: false },
        { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
        { id: 4, text: 'Order food', completed: false, showMenu: false },
        { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
        { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
        { id: 7, text: 'Buy suits', completed: false, showMenu: false },
      ]
    },
    { 
      id: 3, 
      title: 'Graduation',
      description: 'Celebrate academic achievements with others.',
      imageSrc: '/images/graduation.jpg', 
      tasks: [
        { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
        { id: 2, text: 'Send invitations', completed: false, showMenu: false },
        { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
        { id: 4, text: 'Order food', completed: false, showMenu: false },
        { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
        { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
        { id: 7, text: 'Buy gowns', completed: false, showMenu: false },
      ]
    },
    { 
      id: 4, 
      title: 'Baby Shower',
      description: 'Welcome a little bundle of joy with heartfelt celebrations!',
      imageSrc: '/images/baby-shower.png', 
      tasks: [
        { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
        { id: 2, text: 'Send invitations', completed: false, showMenu: false },
        { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
        { id: 4, text: 'Order food', completed: false, showMenu: false },
        { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
        { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
        { id: 7, text: 'Buy baby', completed: false, showMenu: false },
      ]
    },
    { 
      id: 5, 
      title: 'Housewarming',
      description: 'Embrace a fresh start in a new home together!',
      imageSrc: '/images/housewarming.png', 
      tasks: [
        { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
        { id: 2, text: 'Send invitations', completed: false, showMenu: false },
        { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
        { id: 4, text: 'Order food', completed: false, showMenu: false },
        { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
        { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
        { id: 7, text: 'Buy house', completed: false, showMenu: false },
      ]
    },
    { 
      id: 6, 
      title: 'Retirement',
      description: 'Celebrate a lifetime of hard work and new beginnings!',
      imageSrc: '/images/retirement.png',  
      tasks: [
        { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
        { id: 2, text: 'Send invitations', completed: false, showMenu: false },
        { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
        { id: 4, text: 'Order food', completed: false, showMenu: false },
        { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
        { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
        { id: 7, text: 'Buy job', completed: false, showMenu: false },
      ]
    },
  ];