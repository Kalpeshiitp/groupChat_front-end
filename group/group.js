const selectedUsers = [];
const searchResult = [];

function createGroup() {
  document.getElementById('createGroupModel').style.display = 'block';
  document.getElementById('container').style.display = 'none';
}

const handleSearch = async (event) => {
  var search = event.target.value;
  console.log(search);
  if (!search) {
    return;
  }
  try {
    const response = await axios.get(`http://localhost:3000/user?search=${search}`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    console.log("handle search data>>", response.data);
    searchResult.length = 0; 
    response.data.forEach(user => {
      searchResult.push({ id: user.id, name: user.name });
    });
    console.log('searchResult', searchResult);
    populateUserList();

  } catch (error) {
    console.log(error);
  }
};

function populateUserList() {
  const userListContainer = document.getElementById('user-list');
  userListContainer.innerHTML = ''; // Clear previous results

  searchResult.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.textContent = user.name; // Display user name
    userItem.onclick = () => addUserToGroup(user); // Pass user object to addUserToGroup
    userListContainer.appendChild(userItem);
  });
}

function addUserToGroup(user) {
  // Check if the user is already in the selectedUsers array
  const isUserSelected = selectedUsers.some(selectedUser => selectedUser.id === user.id);

  if (!isUserSelected) {
    selectedUsers.push(user);
    populateSelectedUsers();
  }
}
function populateSelectedUsers() {
  const selectedUsersContainer = document.getElementById('selected-users');
  selectedUsersContainer.innerHTML = '';

  selectedUsers.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.id = `userItem-${user.id}`;
    userItem.textContent = `${user.name}`; // Display user name and ID
    selectedUsersContainer.appendChild(userItem);
  });
}


async function handleSubmit() {
  const groupName = document.getElementById('group-name').value;
  if (!groupName || selectedUsers.length === 0) {
    alert('Please fill all the fields.');
    return;
  }
  try {
    const response = await axios.post('http://localhost:3000/api/chat/group', {
      groupName,
      users: selectedUsers.map((user) => ({ id: user.id, name: user.name })),
    },{
      headers: { Authorization: localStorage.getItem('token') }
    });

    // Optionally handle the response from the server

    // Close the modal and reset the UI
    document.getElementById('createGroupModel').style.display = 'none';
    document.getElementById('container').style.display = 'flex';
    document.getElementById('group-name').value = '';
    document.getElementById('add-user').value = '';
    selectedUsers.length = 0;
    populateSelectedUsers();
  } catch (error) {
    console.error('Error creating group:', error);
    alert('Failed to create group. Please try again.');
  }
}



//   let users = [];
//   let groups = [];
// async function createGroup(){
//     const groupName = document.getElementById('groupName').value;

//     try {
//         // Use Axios to post data to the server
//         const token = localStorage.getItem('token')
//         const response = await axios.post('http://localhost:3000/api/group/create', { groupName: groupName },{
//             headers: { Authorization: token },
//           });
//         console.log('response form the server', response)
//         const groupId = response.data.id;

//         // Fetch user data from the server
//         const userResponse = await axios.get('http://localhost:3000/users',{
//             headers: { Authorization: token },
//           });
//         console.log('userResponse>>>>', userResponse)
//         const user = userResponse.data.users;
//         users = users.push(user);
//         // Display members section
//         document.getElementById('group-section').style.display = 'none';
//         document.getElementById('members-section').style.display = 'block';

//         // Populate user list
//         const userList = document.getElementById('userList');
//         users.forEach(user => {
//             const listItem = document.createElement('li');
//             listItem.innerHTML = `<input type="checkbox" id="user_${user.id}">${user.name}`;
//             userList.appendChild(listItem);
//         });
//     } catch (error) {
//         console.error('Error creating group or fetching user data:', error);
//     }
// }

// async function startChat() {
//     const selectedUsers = [];
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
//     checkboxes.forEach(checkbox => {
//         const userId = parseInt(checkbox.id.split('_')[1]);
//         selectedUsers.push(users.find(user => user.id === userId));
//     });
//     console.log('checkboxes', checkboxes);

//     try {
//         // Use Axios to post data to the server
//         const response = await axios.post('http://localhost:3000/startChat', { groupId: groups.length, members: selectedUsers });

//         // Display chat section
//         document.getElementById('members-section').style.display = 'none';
//         document.getElementById('chat-section').style.display = 'block';

//         // Display group name
//         document.getElementById('chat-section').getElementsByTagName('h2')[0].innerText = `Group Chat - ${groups[groups.length - 1].name}`;
//     } catch (error) {
//         console.error('Error starting chat:', error);
//     }
// }


