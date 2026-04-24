import React from "react";
import { useState } from "react";
import logoWork from './assets/logoWorkout.png';
import { verificarUsuario } from "./service/api";
import { grabarUsuario } from "./service/api";
import { Link, useNavigate } from "react-router-dom";


export default function Principal() {
    const navigate = useNavigate();
    
    const irAPrincipal = (usuario) => {
        navigate(`/principal/${usuario}`);
    };
    const [isRegister,setRegister] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        apellidos: "",
        edad: "",
        sexo: "",
        correo: "",
        password: "",
        confirmPassword: ""
    });

    const [formLogin, setFormLogin] = useState({
        correo: "",
        password: ""
    });

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        });
    }

    const validateLogin = () => {
        let newErrors = {};

        if (!formLogin.correo) {
        newErrors.correo = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(formLogin.correo)) {
        newErrors.correo = "Correo inválido";
        }

        if (!formLogin.password || formLogin.password.length < 6) {
        newErrors.password = "La contraseña es obligatoria y debe tener al menos 6 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [errors, setErrors] = useState({});

    // Manejar cambios
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
            });
        };

        // Validación
        const validate = () => {
            let newErrors = {};

            if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
            if (!form.apellidos) newErrors.apellidos = "Los apellidos son obligatorios";

            if (!form.edad) newErrors.edad = "La edad es obligatoria";
            else if (form.edad < 1) newErrors.edad = "Edad inválida";

            if (!form.sexo) newErrors.sexo = "Selecciona un sexo";

            if (!form.correo) {
            newErrors.correo = "El correo es obligatorio";
            } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
            newErrors.correo = "Correo inválido";
            }

            if (!form.password) {
            newErrors.password = "La contraseña es obligatoria";
            } else if (form.password.length < 6) {
            newErrors.password = "Mínimo 6 caracteres";
            }

            if (!form.confirmPassword) {
            newErrors.confirmPassword = "Confirma la contraseña";
            } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
            }

            setErrors(newErrors);

            return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
        console.log("Formulario válido:", form);
        try {
            const data = await grabarUsuario(
                form.nombre,
                form.correo,
                form.password,
                form.sexo,
                form.edad
            );

            console.log("Usuario ID:", data.usuarioId);
            setRegister(false);
        } catch (error) {
            console.error(error.message);
        }
        }
    };

    const handleIniciarSesion = async (e) => {
        e.preventDefault();

        if (!validateLogin()) return;
        console.log("Formulario de login válido:", form);
        try {
            const data = await verificarUsuario(
                formLogin.correo,
                formLogin.password
            );

            console.log("Usuario ID:", data.usuarioId);
            irAPrincipal(data.usuarioId);
            // aquí puedes redirigir o guardar sesión
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            <div className="bg-[#D5ECF0]  flex flex-col"> 
                <Link to="/principal" className="self-start p-5 text-[1.2em] hover:cursor-pointer" > ← Regresar</Link>
                <article className={` ${isRegister ? 'hidden' : 'flex'} bg-white w-[90%] h-[70%] flex flex-col justify-center  items-center mt-12 mx-auto mb-15 rounded-2xl`}>
                    <img src={logoWork} alt="" />
                    <span className="font-bold text-[1.4em]">Bienvenido</span>
                    <form action="" className="flex flex-col justify-center items-center m-5" onSubmit={handleIniciarSesion}>
                        <Input tipo="text" text="Usuario" name="correo" onChange={handleChangeLogin} value={formLogin.correo} />
                        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
                        <Input tipo="password" text="Contraseña" name="password" onChange={handleChangeLogin} value={formLogin.password} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        <button type="button" className="mt-8 bg-[#12B09A] px-7 py-3 rounded-xl text-white text-[1.2em]" onClick={handleIniciarSesion}>
                            Iniciar Sesion
                        </button>
                        <button type="button" className="my-4 bg-[#fff] text-[#12B09A] border border-[#12B09A] px-7 py-3 rounded-xl text-[1.2em]" onClick={() => setRegister(true)}>
                            Crear Cuenta
                        </button>
                    </form>
                </article>
                <article className={`${isRegister ? 'flex' : 'hidden'} bg-white w-[90%]  flex-col justify-center  items-center mt-12 mx-auto rounded-2xl`}>
                    <img src={logoWork} alt="" />
                    <span className="font-bold">Registro</span>
                    <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center m-5 max-w-md"
                    >
                        <label>Nombre</label>
                        <Input
                            text="Nombres"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

                        <label>Apellidos</label>
                        <Input
                            text="Apellidos"
                            name="apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                        />
                        {errors.apellidos && (
                            <p className="text-red-500 text-sm">{errors.apellidos}</p>
                        )}

                        <label>Edad</label>
                        <Input
                            tipo="number"
                            text="Edad"
                            name="edad"
                            value={form.edad}
                            onChange={handleChange}
                        />
                        {errors.edad && <p className="text-red-500 text-sm">{errors.edad}</p>}

                        <label>Sexo</label>
                        <div className="flex gap-4 my-2">
                            <label>
                            <input
                                type="radio"
                                name="sexo"
                                value="M"
                                onChange={handleChange}
                            />{" "}
                            Hombre
                            </label>

                            <label>
                            <input
                                type="radio"
                                name="sexo"
                                value="F"
                                onChange={handleChange}
                            />{" "}
                            Mujer
                            </label>
                        </div>
                        {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo}</p>}

                        <label>Correo electrónico</label>
                        <Input
                            tipo="email"
                            text="Correo"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                        />
                        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}

                        <label>Contraseña</label>
                        <Input
                            tipo="password"
                            text="Contraseña"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}

                        <label>Confirmar contraseña</label>
                        <Input
                            tipo="password"
                            text="Confirma contraseña"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                            {errors.confirmPassword}
                            </p>
                        )}

                        <button type="submit" className="my-8 bg-[#12B09A] px-7 py-3 rounded-xl text-white text-[1.2em]">
                            Registrarse
                        </button>
                    </form>
                </article>
            </div>
        </>
    )
}

function Input({ tipo = "text", text, ...props }) {
    return (
        <input
            type={tipo}
            placeholder={text}
            className="my-3 mb-5 px-4 py-2 rounded-lg bg-[#D5ECF0] w-full outline-none" 
            {...props}
        />
    );
}