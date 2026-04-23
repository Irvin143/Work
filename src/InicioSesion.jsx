import React from "react";
import logoWork from './assets/logoWorkout.png';
export default function Principal() {
    return (
        <>
            <div className="bg-[#D5ECF0] h-[105vh] flex flex-col"> 
                <button className="self-start p-5 text-[1.2em] hover:cursor-pointer"> ← Regresar</button>
                <article className="bg-white w-[90%] h-[70%] flex flex-col justify-center  items-center mt-12 mx-auto rounded-2xl">
                    <img src={logoWork} alt="" />
                    <span className="font-bold text-[1.4em]">Bienvenido</span>
                    <form action="" className="flex flex-col justify-center items-center m-5">
                        <Input tipo="text" text="Usuario"/>
                        <Input tipo="password" text="Contraseña"/>
                        <button className="my-8 bg-[#12B09A] px-7 py-3 rounded-xl text-white text-[1.2em]">
                            Iniciar Sesion
                        </button>
                    </form>
                </article>
                {/* <article className="bg-white w-[90%] h-[80%] flex flex-col justify-center items-center py-15 mx-auto">
                    <img src={logoWork} alt="" />
                    <span className="font-bold">Registro</span>
                    <form action="" className="flex flex-col justify-center m-5">
                        <label htmlFor="" className="">Nombre</label>
                        <Btn tipo="text" text="Nombres"/>
                        <label htmlFor="">Apellidos</label>
                        <Btn tipo="text" text="Apellidos"/>
                        <label htmlFor="">Edad</label>
                        <Btn text="Edad"/>
                        <label htmlFor="">Sexo</label>
                        <input type="checkbox" name="" id="" />
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Correo electronico</label>
                        <Btn tipo="email" text="Correo"/>
                        <label htmlFor="">Contraseña</label>
                        <Btn tipo="password" text="Contraseña"/>
                        <label htmlFor="">Confirmar contraseña</label>
                        <Btn tipo="password" text="Confirma contraseña"/>
                        <button className="my-8 bg-[#12B09A] px-7 py-3 rounded-xl text-white text-[1.2em]">
                            Registrarse
                        </button>
                    </form>
                </article> */}
            </div>
        </>
    )
}

function Input({ tipo,text }){
    return(
        <input type={tipo} className="my-2 px-4 py-2 rounded-lg bg-[#D5ECF0]" placeholder={text}/>
    )
}