async function login(event) {
    try {  event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const loginObj = {
        email: email,
        password: password,
      };
      console.log(loginObj)
        const response = await axios.post(
          "http://localhost:3000/user/login",
          loginObj
        );
        console.log('response from server>>>>',response)
        if(response.status===200){
            alert(response.data.message)
            localStorage.setItem('token',response.data.token)
            window.location.href='../chat/chat.html'
            }
        
      } catch (err) {
        if (err.response) {
          console.log("Response Status:", err.response.status);
        }
      }
    }