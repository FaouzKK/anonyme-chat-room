
 /**
  * Renferme les proprietes de l'utilisateur ;
  */

export class User {

    #username

     constructor() {

        let  username = sessionStorage.getItem("username") || null;

        if (!username) {

              username = prompt("Entrez un nom d'utilisateur pour votre anonymat") ;
              sessionStorage.setItem("username",username) ;
        }

         this.#username = username  ;

     }

     get username() {

         return this.#username ;
     }

}


// export  class UserStatus {

//      static ConnectedUser = 0 ;

//     static newUser() {

//          UserStatus.ConnectedUser += 1;
//          UserStatus.updateOnlineUsers() ;
//      }

//    static  leftUser() {

//          UserStatus.ConnectedUser -= 1;
//          UserStatus.updateOnlineUsers() ;
//      }


//     static updateOnlineUsers() {
         
//             const span = document.querySelector("#online") ;

//             span.innerText = UserStatus.ConnectedUser ; 
//      }

     
// }