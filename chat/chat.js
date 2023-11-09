async function fetchAndDisplayMessages() {
  try {
    const token = localStorage.getItem("token");
    const oldMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const lastMessageId =
      oldMessages.length > 0 ? oldMessages[oldMessages.length - 1].id : 0;
    const response = await axios.get(
      `http://localhost:3000/api/messages?lastMessageId=${lastMessageId}`,
      {
        headers: { Authorization: token },
      }
    );
    const newMessages = response.data.messages;
    const names = response.data.messages.user || [];
    const allMessages = [...oldMessages, ...newMessages];
    updateChatContainer(allMessages, names);
    localStorage.setItem("chatMessages", JSON.stringify(allMessages));
  } catch (err) {
    console.error(err);
  }
}
function updateChatContainer(messages) {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = "";

  messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>You:</strong> ${message.message}`;
    chatMessages.appendChild(messageDiv);
  });
}
setInterval(fetchAndDisplayMessages, 1000);
document.addEventListener("DOMContentLoaded", fetchAndDisplayMessages);

async function postMsg() {
  try {
    const inputMsg = document.getElementById("message").value;
    const inputMsgObj = {
      message: inputMsg,
    };
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/message", inputMsgObj, {
      headers: { Authorization: token },
    });
    fetchAndDisplayMessages();
    document.getElementById("message").value = "";
  } catch (err) {
    console.error(err);
  }
}
document.getElementById("send").addEventListener("click", postMsg);
