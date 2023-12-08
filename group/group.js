const selectedUsers = [];
const searchResult = [];

function createGroup() {
  document.getElementById("createGroupModel").style.display = "block";
  document.getElementById("container").style.display = "none";
}
const handleSearch = async (event) => {
  var search = event.target.value;
  if (!search) {
    return;
  }
  try {
    const response = await axios.get(
      `http://localhost:3000/user?search=${search}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    searchResult.length = 0;
    response.data.forEach((user) => {
      searchResult.push({ id: user.id, name: user.name });
    });
    populateUserList();
  } catch (error) {
    console.log(error);
  }
};

function populateUserList() {
  const userListContainer = document.getElementById("user-list");
  userListContainer.innerHTML = "";

  searchResult.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.textContent = user.name;
    userItem.onclick = () => addUserToGroup(user);
    userListContainer.appendChild(userItem);
  });
}

function addUserToGroup(user) {
  const isUserSelected = selectedUsers.some(
    (selectedUser) => selectedUser.id === user.id
  );
  if (!isUserSelected) {
    selectedUsers.push(user);
    populateSelectedUsers();
  }
}

function populateSelectedUsers() {
  const selectedUsersContainer = document.getElementById("selected-users");
  selectedUsersContainer.innerHTML = "";
  selectedUsers.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.id = `userItem-${user.id}`;
    userItem.textContent = `${user.name}`;
    selectedUsersContainer.appendChild(userItem);
  });
}
async function handleSubmit() {
  const groupName = document.getElementById("group-name").value;
  if (!groupName || selectedUsers.length === 0) {
    alert("Please fill all the fields.");
    return;
  }
  try {
    await axios.post(
      "http://localhost:3000/api/chat/group",
      {
        groupName,
        users: selectedUsers.map((user) => ({ id: user.id, name: user.name })),
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    getGroupChat();
    document.getElementById("createGroupModel").style.display = "none";
    document.getElementById("container").style.display = "flex";
    document.getElementById("group-name").value = "";
    document.getElementById("add-user").value = "";
    selectedUsers.length = 0;
    window.location.reload();
  } catch (error) {
    console.error("Error creating group:", error);
    alert("Failed to create group. Please try again.");
  }
}
async function openChatBox(groupId, groupName) {
  const groupNameDiv = document.getElementById("chatName");
  groupNameDiv.innerHTML = "";
  groupNameDiv.innerText = `${groupName}`;
  document.getElementById("select-chat-msg").style.display = "none";
  document.getElementById("sendMsg").style.display = "block";

  // Clear existing messages
  const messageDiv = document.getElementById("message");
  messageDiv.innerHTML = '';

  const chatData = await axios.get(
    `http://localhost:3000/api/messages/${groupId}`,
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );
  console.log("chatData", chatData);
  var loggedInUserId = chatData.data.loggedInUser;
  if (chatData.data.messages && chatData.data.messages.length > 0) {
    chatData.data.messages.forEach((msg) => {
      const messageContainer = document.createElement("div");
      // Display sender's name along with the message
      const senderName = document.createElement("span");
      if (msg.userId === loggedInUserId) {
        senderName.innerText = "You: ";
      } else {
        senderName.innerText = `${msg.user.name}: `;
      }
      messageContainer.appendChild(senderName);

      const message = document.createElement("span");
      message.innerText = `${msg.message}`;
      messageContainer.appendChild(message);

      messageDiv.append(messageContainer);
      messageDiv.scrollTop = messageDiv.scrollHeight;
    });
  } else {
    const noMessageSpan = document.createElement("span");
    noMessageSpan.innerText = "No messages yet.";
    messageDiv.append(noMessageSpan);
  }
  const sendButton = document.getElementById("send-button");
  // Remove existing event listener
  sendButton.removeEventListener("click", sendMessage);

  // Add new event listener
  sendButton.addEventListener("click", function () {
    sendMessage(groupId); // Passing groupId to sendMessage function
  });

  // Clear message input field
  document.getElementById("write-message").value = "";
  console.log(`Opening chat box for group with ID: ${groupId}-${groupName}`);
}
async function getGroupChat() {
  try {
    const response = await axios.get("http://localhost:3000/api/chat/group", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const chatUl = document.getElementById("chatGroup");
    chatUl.innerHTML = "";
    if (Array.isArray(response.data.groupNames)) {
      response.data.groupNames.forEach((name) => {
        const chatItem = document.createElement("li");
        chatItem.id = name.groupId;
        chatItem.innerText = name.groupName;
        chatItem.addEventListener("click", () =>
          openChatBox(name.groupId, name.groupName)
        );
        chatUl.appendChild(chatItem);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

window.onload = getGroupChat;

async function sendMessage(groupId) {
  try {
    var newMessage = document.getElementById("write-message").value;
    message = {
      message: newMessage,
      groupId: groupId,
    };
    const messageContainer = document.getElementById("message");
    // Display the new message before posting
    const newMessageElement = document.createElement("div");
    newMessageElement.innerText = `You: ${newMessage}`;
    messageContainer.appendChild(newMessageElement);
    const response = await axios.post(
      "http://localhost:3000/api/message",
      message,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    document.getElementById("write-message").value = "";
    console.log("response for message", response);
  } catch (err) {
    console.log(err);
  }
}
