var chatContainer = document.getElementById("chat-container");
var userInput = document.getElementById("user-input");
var clearButton = document.getElementById("clear-button");

var chatbot = new manageChatbotSystem();
var dataTesting = {
    "What is Python?": 
        "Python is a **high-level programming language** that's designed to be **easy to read, easy to write**, and **powerful**." +
        "It was created by **Guido van Rossum** and released in **1991**." +
        "Since then, it's become one of the most popular languages in the world—used everywhere from Google to NASA, and even by AI developers." +
        "<br># Why Python is special?" +
        "<br>Here's a quick, real-world-style breakdown:" + 
        "<br>- **Simple Syntax: **Python code reads almost like English, so it's great for beginners." +
        "<br>- **Versatile: **You can use Python to build websites, automate boring tasks, analyze data, create games, train AI, control robots, and more." +
        "<br>- **Cross-platform: ** It runs on Windows, macOS, Linux, even Raspberry Pi." +
        "<br>- **Huge library support: **From math ($numpy$) to machine learning ($scikit-learn$, $TensorFlow$) to making games ($pygame$), there's a library for _almost everything_." +
        "<br># What does Python code look like?" +
        "<br>Here's a basic syntax of Python:" +
        "<br>$$print(\"Hello World\")$$"
};
for (var question in dataTesting) {
    chatbot.addData(question, dataTesting[question]);
}

function addMessage(message, isUser) {
    var msg = document.createElement("div");
    msg.className = isUser ? "user-message" : "bot-message";
    msg.innerHTML = isUser? message : format(message);
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleUserMessage() {
    var message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = "";
        var response = chatbot.findAnswer(message);
        addMessage(response, false);
    }
}

function handleClearMessage() {
    chatContainer.innerHTML = '';
    alert("Chat history cleared successfully");
}

clearButton.addEventListener("click", handleClearMessage);
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") handleUserMessage();
})