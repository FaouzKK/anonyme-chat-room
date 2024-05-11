import { User } from "./User.js";

export class GetFormMessage {

    #message ;
    #user ;
     
    /**
     * @param {User} user 
     * @param {HTMLFormElement} form 
     */
      constructor(user,form) {

        const formData = new FormData(form) ;

        const message = formData.get("message") ;

        form.reset() ;

        if (message.trim() === "") return new Error("Veillez entrez un message") ;
      
         this.#message = message ;
         
         this.#user = user ;

      }
      

     get newMessage() {

         return {username : this.#user.username , message : this.#message } ;

     }
}


export class Message {

     /**
      * 
      * @param {User} user 
      * @param {String} message 
      */

     #user ; 
     #message ;
      constructor (user , message) {

            this.#user = user ;
            this.#message = message ;
      }

    get username() {

         return this.#user.username ;
    }
}