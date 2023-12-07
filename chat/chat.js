async function  getUserList (){
const userList = document.getElementById('user-list');
userList.innerHTML='';
const req = await axios.get('http://localhost:3000/users',      {
headers: { Authorization: token },
       });
       console.log('users>>>>',users)
}

// async function fetchAndDisplayMessages() {
//   try {
//     const token = localStorage.getItem("token");
//     const oldMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
//     const lastMessageId =
//       oldMessages.length > 0 ? oldMessages[oldMessages.length - 1].id : 0;
//     const response = await axios.get(
//       `http://localhost:3000/api/messages?lastMessageId=${lastMessageId}`,
//       {
//         headers: { Authorization: token },
//       }
//     );
//     const newMessages = response.data.messages;
//     const names = response.data.messages.user || [];
//     const allMessages = [...oldMessages, ...newMessages];
//     updateChatContainer(allMessages, names);
//     localStorage.setItem("chatMessages", JSON.stringify(allMessages));
//   } catch (err) {
//     console.error(err);
//   }
// }

// function updateChatContainer(messages, names) {
//   const chatMessages = document.getElementById("chat-messages");
//   chatMessages.innerHTML = "";

//   messages.forEach((message) => {
//     const messageDiv = document.createElement("div");
//     messageDiv.innerHTML = `<strong>You:</strong> ${message.message}`;
//     chatMessages.appendChild(messageDiv);
//   });
// }

// // setInterval(fetchAndDisplayMessages, 1000);

// document.addEventListener("DOMContentLoaded", ()=>{
//   fetchAndDisplayMessages()
//   displayGroupName()
// });

// async function postMsg() {
//   try {
//     const inputMsg = document.getElementById("message").value;
//     const inputMsgObj = {
//       message: inputMsg,
//     };
//     const token = localStorage.getItem("token");
//     await axios.post("http://localhost:3000/api/message", inputMsgObj, {
//       headers: { Authorization: token },
//     });
//     fetchAndDisplayMessages();
//     document.getElementById("message").value = "";
//   } catch (err) {
//     console.error(err);
//   }
// }

// document.getElementById("send").addEventListener("click", postMsg);

// function parseJwt(token) {
//   if (!token) {
//     return null;
//   }
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }

// async function createGroup() {
//   try {
//     const groupName = document.getElementById("groupName").value;
//     const token = localStorage.getItem("token");
//     const decodeToken = parseJwt(token);
//     const userId = decodeToken.userId;
//     console.log('userId>>>>>>>>>>>>>>>', userId);
//     console.log('name', groupName)
//     const response = await axios.post("http://localhost:3000/api/group/create", {
//       groupName,
//       userId,
//     }, {
//       headers: { Authorization: token },
//     });
//     console.log('response for create group>>>>', response)
//     if (response.data.success) {
//       alert(`Group created successfully! Group ID: ${response.data.newGroup
//         .groupId}, Group Name: ${response.data.newGroup.groupName}`);
//         displayGroupName()
//     } else {
//       alert(`Failed to create group: ${response.data.message}`);
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Error creating group. Please check the console for details.");
//   }
// }

// async function displayGroupName() {
//   const groupNameElement = document.getElementById('group-name') || [];

//   groupNameElement.innerHTML = '';

//   const token = localStorage.getItem('token');

//   try {
//     const response = await axios.get('http://localhost:3000/api/group', {
//       headers: { Authorization: token },
//     });

//     const groups = response.data.groupNames;

//     groups.forEach((group) => {
//       const groupItem = document.createElement('div');
//       groupItem.className= 'group-button'
//       groupItem.innerHTML = `<button> Group Name: ${group.groupName}</button>`;
//       groupNameElement.appendChild(groupItem);
//     });
//   } catch (error) {
//     console.error('Error fetching group names:', error);
//   }
// }










