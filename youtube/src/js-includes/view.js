// import _ from 'lodash';
const videoTemplate = '<div class="youtube-item"><p class="title"><%= snippet.title %></p><p class="description">snippet.description</p></div>'
export const render = (templateName, model) => {
  templateName = `${templateName}Template`;
  // const renderFn = _.template(videoTemplate);
  // return renderFn(model[0]);
  const renderFn = _.template(document.getElementById('list-template'));
  return renderFn({count: 5});
}
