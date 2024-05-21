
 /**
  * Renferme les proprietes de l'utilisateur ;
  */

export class User {

    #username

     constructor() {

        let  username = sessionStorage.getItem("username") || null;

        while(!username || username.trim() == '') {

              username = prompt("Entrez un nom d'utilisateur pour votre anonymat") ;
              sessionStorage.setItem("username",username) ;
        }

         this.#username = username  ;

     }

     get username() {

         return this.#username ;
     }

}
