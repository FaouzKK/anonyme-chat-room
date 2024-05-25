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

