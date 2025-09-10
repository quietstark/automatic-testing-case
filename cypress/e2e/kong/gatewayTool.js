export function exist(parentDiv, childDiv){
    cy.get(parentDiv).then((data) => {
      const flag = data.find(childDiv).length > 0
      console.log(typeof(flag))
      return flag
    }) 
}