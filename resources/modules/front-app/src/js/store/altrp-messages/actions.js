export const ADD_MESSAGES_CONTAINER = "ADD_MESSAGES_CONTAINER";

export function addMessagesContainer(payload) {
  return {
    type: ADD_MESSAGES_CONTAINER,
    payload
  };
}
