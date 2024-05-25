//import { Socket } from "socket.io";
import { ShowError } from "./ShowError.js";
import { User } from "./User.js";

export class SearchImg {

    static #imgInput = document.getElementById('searchImg');

    #socket;

    #user;

    /**
     * 
     * @param {User} user 
     * @param {Socket} socket 
     */
    constructor(user, socket) {


        this.#socket = socket;

        this.#user = user;
        
        SearchImg.#imgInput.click();

        SearchImg.#imgInput.addEventListener('change', e => {

            const reader = new FileReader();

            Array.from(e.target.files).forEach(url => {

                reader.onload = (evt) => {

                    //this.addUrl(evt.target.result);

                    this.emitImageEvent(evt.target.result);
                }

                if(url.size > 500000) return new ShowError("Veillez choisir une image de taille inferieur a 500kb") ;
                reader.readAsDataURL(url);
            });

            SearchImg.#imgInput.value = "";
        })


    }


    /**
     * 
     * @param {ArrayBuffer | string | null} url 
     */
    emitImageEvent(url) {
        // debugger
        const panel = document.querySelector(".message-panel");

        this.#socket.emit("image-message", { url: url, username: this.#user.username });

        try {

            let messageDiv = document.createElement("div");

            messageDiv.classList.add("message-from-me");

            messageDiv.innerHTML = `<h3>You</h3><img src="${url}" alt="image sent by you">`;

            panel.appendChild(messageDiv);

        } catch (error) {
            console.log(error);
        }

        panel.scrollTop = panel.scrollHeight;
    }

}