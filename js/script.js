document.addEventListener("DOMContentLoaded", () => {
    // Mostrar modal al cargar
    const usernameModal = new bootstrap.Modal(document.getElementById("usernameModal"), {
        backdrop: "static",
        keyboard: false
    });
    usernameModal.show();

    // Guardar nombre de usuario
    document.getElementById("saveUsername").addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();

        if (username) {
            // Llamada a la API para guardar el usuario
            fetch("usuarios.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `nombre=${encodeURIComponent(username)}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "success") {
                        updateUserList();
                        usernameModal.hide(); // Cierra el modal
                    } else {
                        alert(data.message);
                    }
                })
                .catch(err => console.error(err));
        } else {
            alert("Por favor, ingresa un nombre válido.");
        }
    });

    // Actualizar la lista de usuarios
    function updateUserList() {
        fetch("usuarios.php")
            .then(response => response.json())
            .then(users => {
                const userList = document.getElementById("user-list");
                userList.innerHTML = "";

                users.forEach(user => {
                    const li = document.createElement("li");
                    li.className = "list-group-item";
                    li.textContent = `${user.nombre} - ${new Date(user.fecha_ingreso).toLocaleString()}`;
                    userList.appendChild(li);
                });
            })
            .catch(err => console.error(err));
    }

    // Cargar lista al inicio
    updateUserList();
});
