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

export const grabarUsuario = async (nombre, correo, contrasena, genero, edad) => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("contrasena", contrasena);
    formData.append("genero", genero);
    formData.append("edad", edad);

    const response = await fetch("http://localhost:8000/grabarUsuario", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
};