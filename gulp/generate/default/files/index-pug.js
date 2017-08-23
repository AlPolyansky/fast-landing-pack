module.exports = params => {


let content = 
`extends ../_template
block variables
  - pageTitle = 'Site Name'
block content
  include ../sections/_header`;

return content;
}