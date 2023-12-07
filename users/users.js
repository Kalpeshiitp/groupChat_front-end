let selectedUserId = null; // Variable to store the selected user ID

async function getUsers() {
    try {
        const response = await axios.get('http://localhost:3000/users', {
            headers: { Authorization: localStorage.getItem('token') },
        });
        console.log('response from server>>>>', response);
        const users = response.data.users;
        const userSelect = document.getElementById('select-user');
        userSelect.innerHTML = '';
        users.forEach(user => {
            const userList = document.createElement('option');
            userList.value = user.id;
            userList.textContent = `${user.id}- ${user.name}`;
            userSelect.appendChild(userList);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function createGroup() {
    console.log('Selected user ID:', selectedUserId);
    const groupName = document.getElementById('group').value;
    console.log('group name>>', groupName);

    const groupDataObj = {
        groupName,
        UserId,
        
    }

    const response =  await axios.post('http://localhost:3000/api/group/create',groupDataObj,{
        headers: { Authorization: localStorage.getItem('token') },
    })
    console.log('response to create the group>>>', response)
}

function handleUserSelection() {
    const userSelect = document.getElementById('select-user');
    UserId = userSelect.value;
}

document.addEventListener('DOMContentLoaded', getUsers);

// document.getElementById('load-users-button').addEventListener('click', getUsers);

