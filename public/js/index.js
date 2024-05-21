const socket = io() ;
import { GetFormMessage } from "./class/Message.js";
import { SideAction } from "./class/SideAction.js";
import { User } from "./class/User.js"; 


    

        addEventListener("DOMContentLoaded", e => {


            /*******Gestion De l'envoi et de la reception de message************/
            /****************************************/
            const user = new User() ;

            const form = document.querySelector("#sender") ;

            form.addEventListener("submit", e => {

                e.preventDefault() ;

                try {

                   // debugger
             
                    const message = new GetFormMessage(user,form) ;
                    
                    socket.emit("message", message.newMessage) ;

                    const messageData = message.newMessage

                    const panel = document.querySelector(".message-panel") ;

                    const messageDiv = document.createElement("div") ;

                    messageDiv.classList.add("message-from-me") ;

                    messageDiv.innerHTML = "<h3>You</h3><p>" + messageData.message + "</p>" ;

                    panel.appendChild(messageDiv) ;

                    //console.log(panel.scrollHeight , messageDiv.scrollHeight) ;
                    console.log(messageDiv) ;

                   panel.scrollTop = panel.scrollHeight ;

                } catch(error) {

                    console.log("error") ;

                }
            }) ;
            /**************************************** */

            /*******Gestion de la side bar************/
            /****************************************/

            const hideSidebar = document.querySelector("#sidebar-hide") ;

            hideSidebar.addEventListener('click', e => {

                e.preventDefault() ;

                new SideAction() ;

            })

           /****************************************** */  
           
           /************Masquer initialement la side-bar pour les petits ecran */

            const witdh  = window.screen.width ;

            if (witdh < 600) new SideAction() ;
           
        })

         



        /*********Affichage des message recus */

        socket.on("message", (data) => {

            console.log(`new message receive from ${data.username}`)
            console.log(`message received from  ${data.username}`) ;

            const panel = document.querySelector(".message-panel") ;

                
            const messageDiv = document.createElement("div") ;

            messageDiv.classList.add("message-from-other") ;

            messageDiv.innerHTML = "<h3>" + data.username + "</h3><p>" + data.message + "</p>" ;

            panel.appendChild(messageDiv) ;

          }) ;


          socket.on("userjoined" , () => {
                console.log("new user joined") ;

               UserStatus.newUser() ;
          }) 

          socket.on("userLeft" , () => {
                console.log("user left") ;
                UserStatus.leftUser() ;
            })