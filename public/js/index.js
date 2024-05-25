const socket = io();
import { Links } from "./class/Link.js";
import { GetFormMessage } from "./class/Message.js";
import { SearchImg } from "./class/SearchImg.js";
import { ShowError } from "./class/ShowError.js";
import { SideAction } from "./class/SideAction.js";
import { User } from "./class/User.js";
import { UserAction } from "./class/UserAction.js";



addEventListener("DOMContentLoaded", e => {


    /*******Gestion De l'envoi et de la reception de message************/
    /****************************************/
    const user = new User();

    socket.emit("ready", user.username);

    const form = document.querySelector("#sender");

    form.addEventListener("submit", e => {

        e.preventDefault();

        try {

            //debugger
            const message = new GetFormMessage(user, form);

            socket.emit("message", message.newMessage);

            const messageData = message.newMessage

            const panel = document.querySelector(".message-panel");

            const messageDiv = document.createElement("div");

            messageDiv.classList.add("message-from-me");

            messageDiv.innerHTML = "<h3>You</h3><p>" + messageData.message + "</p>";

            panel.appendChild(messageDiv);


            panel.scrollTop = panel.scrollHeight;

        } catch (error) {

            console.error(error);

        }
    });
    /**************************************** */




    /*******Gestion de la side bar************/
    /****************************************/

    const hideSidebar = document.querySelector("#sidebar-hide");

    hideSidebar.addEventListener('click', e => {

        e.preventDefault();

        new SideAction();

    })

    /****************************************** */


    /*********************Gestion du Menu Links */

    const link = document.querySelector("#link");

    link.addEventListener('click', e => {

        e.preventDefault();

        // target = e.currentTarget ;

        new Links();

    })

    const imgBtn = document.querySelector("#getImg");

    imgBtn.addEventListener('click', e => {

        e.stopPropagation();
        e.preventDefault();

        new Links() ;
        new SearchImg(user, socket);
       
    })

    const videoBtn = document.querySelector("#getVideo") ;

    videoBtn.addEventListener("click" ,e =>{

        e.stopPropagation() ;
        e.preventDefault() ;

        new Links() ;
        return new ShowError("Les videos ne sont pas supporter pour le moment.. Veillez nous excuser :)") ;

    })

    /**************************************** */

    /************************************Gestion du Texte Area */
    /********************************************************* */

    const textarea = document.getElementById('message');

    function autoResize() {

        if (textarea.innerHTML.trim() == "") {
            textarea.style.height = '40px';
        } else {

            textarea.style.height = 'auto';

        }
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    textarea.addEventListener('input', autoResize);

    autoResize();

})

/************************************************* */



/*********Affichage des message recus */

socket.on("message", (data) => {

    console.log(`new message receive from ${data.username}`)
    console.log(`message received from  ${data.username}`);

    const panel = document.querySelector(".message-panel");


    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message-from-other");

    messageDiv.innerHTML = "<h3>" + data.username + "</h3><p>" + data.message + "</p>";

    panel.appendChild(messageDiv);

});

socket.on('image-message-by-user', imageMessage => {

    console.log("chargement d'une image");
    const panel = document.querySelector(".message-panel");

    try {


        let messageDiv = document.createElement("div");

        messageDiv.classList.add("message-from-other");

        messageDiv.innerHTML = `<h3>${imageMessage.username}</h3><img src="${imageMessage.url}" alt="image sent by ${imageMessage.username}">`;

        panel.appendChild(messageDiv);

    } catch (error) {
        console.log(error);
    }
})

/**************************************************** */


/********************Affichage Du Nombre de Connecter */
/***************************************************** */

socket.on("update-users", e => {

    try {

        console.log(e);
        const span = document.querySelector("#online");
        span.innerText = e.count;

        new UserAction(e);

    } catch (error) {

        console.log(error);
    }
})
