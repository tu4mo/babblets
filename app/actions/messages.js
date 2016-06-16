import axios from 'axios'

export function getMessages() {
  const request = axios.get(`/api/messages?user=${babblets.user}&token=${babblets.token}`)

  return {
    type: 'GET_MESSAGES',
    payload: request
  }
}

export function newMessage(message) {
  return {
    type: 'NEW_MESSAGE',
    payload: message
  }
}
