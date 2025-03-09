document.addEventListener("DOMContentLoaded", () => {
    const chatLog = document.getElementById("chat-log");
    const userMessageInput = document.getElementById("user-message");
    const sendBtn = document.getElementById("send-btn");
  
    sendBtn.addEventListener("click", () => {
      const userMessage = userMessageInput.value.trim();
      if (userMessage) {
        addMessage(userMessage, "user");
        userMessageInput.value = "";
        sendMessageToBot(userMessage);
      }
    });
  
    userMessageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendBtn.click();
      }
    });
  
    function addMessage(message, sender) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", `${sender}-message`);
      messageElement.textContent = message;
      chatLog.appendChild(messageElement);
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  
    async function sendMessageToBot(userMessage) {
      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        });
  
        const data = await response.json();
        addMessage(data.response, "bot");
      } catch (error) {
        console.error("Error:", error);
        addMessage("Sorry, something went wrong. Please try again.", "bot");
      }
    }
  });
  