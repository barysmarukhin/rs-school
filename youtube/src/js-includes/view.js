import _ from 'lodash';

const templates = {
  markupTemplate:
    '<header class="header">' +
    '<h1 class="header__title">YouTube Search Application</h1>' +
      '<form id="submitForm" action="#">' +
        '<p><input type="text" class="form-control" id="searchField" placeholder="type something"></p>' +
        '<p><input type="submit" value="search" class="form-control" id="submitButton"></p>' +
      '</form>' +
    '</header>' +
    '<div id="resultsWrapper"></div>',
  videoTemplate:
    '<%' +
    '_.each(items,function(item,key,list){' +
    'const date = new Date(Date.parse(item.snippet.publishedAt))%>' +
    '<div class="youtube-item">' +
      '<h2 class="yotube-item__title"><a href="https://youtu.be/<%- item.id.videoId%>" class="youtube-item__link">' +
        '<%= item.snippet.title %></a>' +
      '<img class="youtube-item__img" src="<%= item.snippet.thumbnails.medium.url %>"></p>' +
      '<p class="youtube-item__date fa fa-calendar"><%=date.getDate()%>.<%=date.getMonth() + 1%>.<%=date.getFullYear()%></p>' +
      '<p class="youtube-item__author"><%=item.snippet.channelTitle%></p>' +
      '<p class="youtube-item__description"><%=item.snippet.description%></p>' +
    '</div>' +
    '<%' +
      '});' +
    '%>'
  // otherTemplate:
  //   <%
  //     // repeat items
  //     _.each(items,function(item,key,list){
  //       // create variables
  //       var f = item.name.split("").shift().toLowerCase();
  //   %>
  //     <tr>
  //       <!-- use variables -->
  //       <td><%= key %></td>
  //       <td class="<%= f %>">
  //         <!-- use %- to inject un-sanitized user input (see 'Demo of XSS hack') -->
  //         <h3><%- item.name %></h3>
  //         <p><%- item.interests %></p>
  //       </td>
  //     </tr>
  //   <%
  //     });
  //   %>
}
export const render = (templateName, model) => {
  templateName = `${templateName}Template`;
  const renderFn = _.template(templates[templateName]);
  return renderFn({items: model});
}
