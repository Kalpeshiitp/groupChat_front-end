async function login(event) {
    try {  event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const loginObj = {
        email: email,
        password: password,
      };
        const response = await axios.post(
          "http://localhost:3000/user/login",
          loginObj
        );
        
      } catch (err) {
        if (err.response) {
          console.log("Response Status:", err.response.status);
        }
      }
    }