export const SET_COPY_NODE = "SET_COPY_NODE";
export const SET_SELECT_NODE = "SET_SELECT_NODE";


export const setCopyNode = (obj) => ({
  type: SET_COPY_NODE,
  payload: obj
})

export const setSelectNode = (name, id) => ({
  type: SET_SELECT_NODE,
  payload: name,
  payload_id: id
})
