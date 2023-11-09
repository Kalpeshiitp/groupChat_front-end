async function fetchMessages() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/messages", {
      headers: { Authorization: token },
    });
    const messages = response.data.messages;
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = '';
    messages.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.innerHTML = `<strong>You:</strong> ${message.message}`;
      chatMessages.appendChild(messageDiv);
    });
  } catch (err) {
    console.error(err);
  }
}
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
    fetchMessages();
    document.getElementById("message").value = "";
  } catch (err) {
    console.error(err);
  }
}
document.getElementById("send").addEventListener("click", postMsg);
window.addEventListener("load", fetchMessages);
