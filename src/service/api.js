export const verificarUsuario = async (correo, contrasena) => {
    const formData = new FormData();
    formData.append("correo", correo);
    formData.append("contrasena", contrasena);

    const response = await fetch("http://localhost:8000/verificar-usuario", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
};