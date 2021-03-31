
const students = {
  1: {
    id: '1',
    username: 'Gefy aqiilah aqshal',
    email: 'gefy@gmail.com'
  },
  2: {
    id: '2',
    username: 'sahira',
    email: 'sahira@gmail.com'
  }
}
const me = {
  1: {
    id: '1',
    username: 'Gefy aqiilah',
    email: 'gefy@gmail.com'
  },
  2: {
    id: '2',
    username: 'sahira',
    email: 'sahira@gmail.com'
  }
}
const messages = {
  1: {
    id: "1",
    text: 'hello world'
  },
  2: {
    id: '2',
    text: 'lorem ipsum'
  },
  3: {
    id: '3',
    text: 'dolor sit amet'
  },
}


export const resolvers = {
  Query: {
    students: () => {
      return Object.values(students)
    },
    me: (parent, args, { me }) => {
      return me
    },
    student: (parent, { id }) => {
      return students[id]
    },
    messages: () => {
      return Object.values(messages)
    },
    message: (parent, { id }) => {
      return messages[id]
    }
  },
  Message: {
    user: (parent, args, { me }) => {
      return students[1]
    }
  },
  Mutation: {
    createMessage: (parent, {text, id}, { models }) => {
      console.log(`models.me`, models.me[id])
      const message = {
        id: Math.floor(Math.random()*100),
        text
      }
      console.log(`message`, message)
      return message
    }
  }
}

export default resolvers