export class SideAction {


     static sidebarDiv = document.querySelector(".sidebar") ;
     static icons = document.querySelector("#sidebar-hide > i") ;
     static message_side = document.querySelector(".message-side") ;

      constructor() {

          if (this.#isHide) {

              SideAction.sidebarDiv.classList.remove("hide") ;
              SideAction.icons.className = "bi bi-x-lg" ;
              
              
              if (window.screen.width > 600) {

                  SideAction. message_side.style.paddingLeft = "250px" ;
              }
                
          } else {

              SideAction.sidebarDiv.classList.add("hide") ;
              SideAction.icons.className = "bi bi-list" ;

              if (window.screen.width > 600) {

                SideAction.message_side.style.paddingLeft = "0" ;
           }
          }
         
      }

    get #isHide() {
        
         if (Array.from(SideAction.sidebarDiv.classList).includes("hide")) return true ;

         return false ;
    }
}