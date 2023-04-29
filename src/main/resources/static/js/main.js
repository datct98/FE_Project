document.getElementById('login').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        username: email,
        password: password,
    };

    axios.post("http://localhost:8082/api/signing", data)
        .then(function(response) {
            // Xử lý phản hồi từ API khi đăng nhập thành công
            localStorage.setItem('jwtToken', response.data);
            console.log(response.data);
            window.location.href = "http://localhost:8080/product/all";

        })
        .catch(function(error) {
            console.error(error);
        });
});