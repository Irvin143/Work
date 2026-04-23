import React from "react";
import iconLogin from "./assets/loginWorkout.png";
import iconMegafono from "./assets/campanaWorkout.png";
import fondoPrincipal from "./assets/fondoWorkoutEye.png";
import estadisticas from "./assets/estadisticas.png";
import mancuerna from "./assets/mancuerna.webp";

export default function Principal() {
    return (
        <div>
            <header >
                <h1 className="bg-[#2798F5] p-3 text-white">WORKOUT EYE</h1>
            </header>
            <nav className="flex justify-between items-center p-4 w-[90%] bg-[#CCC] mx-auto rounded-xl mt-4">
                <article className="flex justify-center items-center">
                    <img src={iconLogin} alt="Login" />
                    <p>Hola</p>
                </article>
                <img src={iconMegafono} alt="Megafono" />
            </nav>
            <article className="w-[90%] mx-auto mt-4 rounded-xl overflow-hidden">
                <img src={fondoPrincipal} alt="Fondo Principal" />
            </article>
            <section className="flex w-[90%] mx-auto mt-4 justify-evenly
             items-start">
                <article className="flex flex-col  items-center  ">
                    <Button text="Subir Video" color="bg-[#2798F5] mb-5" />
                    <article className="bg-[#0DB6D6] p-4 rounded-[20px] justify-center items-center flex flex-col">
                        <Button text="Estadisticas" color="bg-[#15778A]" />
                        <img src={estadisticas} alt="Estadisticas" className="w-[200px]" />
                    </article>
                </article>
                <article className="flex flex-col items-center ">
                    <Button text="Iniciar Camara" color="bg-[#179927]" />
                    <article className="bg-[#DEA207] p-4 rounded-[20px] justify-center items-center flex flex-col">
                        <Button text="Rutinas" color="bg-[#8A6915]" />
                        <img src={mancuerna} alt="Mancuerna" className="w-[200px]" />
                    </article>
                </article>
            </section>
        </div>
    )
}

function Button({ text, color }) {
    return (
        <button className={`${color} w-full py-2 text-white rounded-[20px]`}>{text}</button>
    )
}