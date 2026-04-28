import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Link } from "react-router-dom";

const Estadisticas = () => {

  const ejercicios = ["Sentadilla", "PushUps", "Abdominales"];
  const repeticiones = [15, 20, 12];

  const dataBar = ejercicios.map((ej, i) => ({
    name: ej,
    reps: repeticiones[i]
  }));

  const historial = ejercicios.map((ej, i) => ({
    fecha: "24-06-2025",
    ejercicio: ej,
    reps: repeticiones[i]
  }));

  const topEjercicios = [
    { NombreEjercicio: "PushUps", Repeticiones: 50 },
    { NombreEjercicio: "Sentadilla", Repeticiones: 40 },
    { NombreEjercicio: "Abdominales", Repeticiones: 30 }
  ];

  const progreso = Array.from({ length: 7 }, (_, i) => ({
    dia: i,
    valor: 10 + i * 2
  }));

  return (
    <div className="min-h-screen bg-[#c4d2f4] p-6">

      {/* HEADER */}
      <div className="bg-[#00ADB5] text-white p-4 rounded-xl shadow mb-6">
        <h1 className="text-xl font-bold text-center">
          Estadísticas de Ejercicios
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 space-y-6">

        {/* GRÁFICA */}
        <div className="border rounded-xl ">
          <h2 className="text-lg font-bold text-center mb-4">
            Repeticiones por ejercicio
          </h2>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reps" fill="#00ADB5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HISTORIAL */}
        <div className="bg-[#e6eaf8] rounded-xl p-4">
          <h2 className="text-lg font-bold text-[#393E46] mb-4">
            Historial de sesiones
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {historial.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 shadow flex justify-between items-center"
              >
                <span className="text-gray-500 text-sm">
                  {item.fecha}
                </span>

                <span className="text-[#393E46] font-medium">
                  {item.ejercicio}
                </span>

                <span className="bg-[#00ADB5] text-white text-sm px-2 py-1 rounded-full font-bold">
                  {item.reps} reps
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RANKING */}
        <div className="bg-[#e6eaf8] rounded-xl p-4">
          <h2 className="text-lg font-bold text-[#393E46] mb-4">
            Ranking de ejercicios
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {topEjercicios.map((ej, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 shadow flex items-center gap-4"
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold
                  ${i === 0 ? "bg-[#00ADB5]" : "bg-[#393E46]"}`}>
                  {i + 1}
                </div>

                <div>
                  <p className={`text-sm ${i === 0 ? "font-bold" : "font-medium"} text-[#393E46]`}>
                    {ej.NombreEjercicio}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ej.Repeticiones} repeticiones
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRESO */}
        <div className="bg-[#e6eaf8] rounded-xl p-4">
          <h2 className="text-lg font-bold text-[#393E46] mb-4">
            Progreso semanal
          </h2>

          <div className="w-full h-52">
            <ResponsiveContainer>
              <LineChart data={progreso}>
                <XAxis dataKey="dia" hide />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#00ADB5"
                  strokeWidth={3}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTÓN */}
        <div className="flex justify-center pt-4">
          <Link to="/principal">
            <button className="bg-[#00ADB5] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90">
              Cerrar
            </button>
          </Link> 
        </div>

      </div>
    </div>
  );
};

export default Estadisticas;