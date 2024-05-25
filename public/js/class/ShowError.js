export class ShowError {

    static #panel = document.querySelector(".message-panel");

    /**
     * 
     * @param {string} error 
     */
        constructor(error) {

            const div = document.createElement("div") ;

             div.className = "error-message" ;

            const span = document.createElement("span") ;

            span.id = "text" ;

            span.innerText = error ;

            div.append(span) ;

            ShowError.#panel.append(div) ;

            setInterval(()=> {

                div.remove() ;
            },5000)

        }
}