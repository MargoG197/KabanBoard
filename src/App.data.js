


const dataMock = [
  {
    title: 'Backlog',
    issues: [
           {
    id: 1,
    name: 'Sprint bugfix11',
    description: 'Fix all the bugs'
         },
         {
    id: 3,
    name: 'Shop page – performance issues',
    description: 'Shop page – performance issues Shop page – performance issuesShop page – performance issues'
         }
       ]
  },
  {
    title: 'Ready',
    issues: [
           {
    id: 2,
    name: 'Sprint bugfix22',
    description: 'Fix all the bugs'
           }
       ]
  },
  {
    title: 'In Progress',
    issues: [
           {
    id: 5,
    name: 'Checkout bugfix33',
    description: 'Checkout bugfix Checkout bugfix Fix all the bugs'
           }
       ]
       },
       {
              title: 'Finished',
              issues: [
                     {
              id: 4,
              name: 'Checkout bugfix44',
              description: 'Checkout bugfix Checkout bugfix Fix all the bugs'
                     }
                 ]
            },
  
]

const userMock = {
  name: 'Margo',
  lastName:'Goncharova'
}

export {userMock, dataMock}