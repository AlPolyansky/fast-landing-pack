module.exports = params => {


let content = 
`extends ../_template
block variables
  - pageTitle = 'Site Name'
  - page = 'home'
block content
  include ../sections/_header
  .main
    .container
      .main__grid
        .main__part.main__part--first
          include ../sections/_content
          include ../sections/_comments
        .main__part.main__part--last
          include ../sections/_sidebar-right`;

return content;
}