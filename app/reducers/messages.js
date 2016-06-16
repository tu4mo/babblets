export default function(state = [], action) {
  switch (action.type) {
    case 'GET_MESSAGES':
      return [...action.payload.data.messages]
    case 'NEW_MESSAGE':
      return [...state, action.payload]
  }

  return state
}
