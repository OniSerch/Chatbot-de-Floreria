async function sendMessage() {

    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const message = input.value.trim();

    if (message === "") {
        return;
    }
    // Mostrar mensaje del usuario
    chat.innerHTML += `
        <div class="message user">
            <div class="bubble">${message}</div>
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

    input.value = "";
    // Indicador de escritura
    chat.innerHTML += `
        <div class="message bot" id="typing">
            <div class="bubble">
                Escribiendo...
            </div>
        </div>
    `;
    chat.scrollTop = chat.scrollHeight;
    try {
        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        // Eliminar "Escribiendo..."
        document.getElementById("typing").remove();

        // Mostrar respuesta de la IA
        chat.innerHTML += `
            <div class="message bot">
                <div class="bubble">
                    ${data.reply}
                </div>
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        console.error(error);

        document.getElementById("typing").remove();

        chat.innerHTML += `
            <div class="message bot">
                <div class="bubble">
                     No pude conectarme con el servidor.
                </div>
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    }

}


document.getElementById("input").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});
function toggleChat() {

    const chatbot = document.getElementById("chatbot");

    chatbot.classList.toggle("active");

}