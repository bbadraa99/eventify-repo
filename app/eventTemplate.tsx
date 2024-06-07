export interface TaskElement {
  id: number, 
  text: string, 
  completed: boolean,
  showMenu: boolean
}

export const templates = [
    { 
      id: 0, 
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
      id: 1, 
      title: 'Game Night',
      description: 'An evening of fun board games and camaraderie.',
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
      id: 2, 
      title: 'Picnic',
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
  ];