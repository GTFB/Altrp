export default function prepareContext({ title, model_data = {}, altrpRouting }) {
  let context = {
    ...model_data,
    altrpuser: altrpRouting.__altrp_global__?.currentUser || {},
    altrppage: {
      title,
      params: altrpRouting.__altrp_global__.altrpSettings.page_params,
      url: altrpRouting.__altrp_global__.url,
    },
  };

  return context;
}
