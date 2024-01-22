"use client";

import swal, { SweetAlertIcon } from "sweetalert2";
import { calculateDate } from "@/calendar/functions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Calculator() {
    const { data: session }: any = useSession();
    const [date, setDate] = useState("");
    const [count, setCount] = useState("15");
    const [filters, setFilters] = useState({
        holidays: true, // Filtrar dias feriados
        weekend: true, // Filtrar Sabados y Domingos
        judicialVacation: true, // Filtrar ferias judiciales
        turismo: true, // Filtrar la semana de turismo incluso cuando se filtren los dias corridos
    });
    const [visibleFilters, setVisibleFilters] = useState(false);
    const [preFilter, setPreFilter] = useState(0);

    function setLaboral() {
        setFilters({
            holidays: true,
            weekend: true,
            judicialVacation: true,
            turismo: true,
        });
        setPreFilter(0);
        setCount("15");
    }

    function setCivil() {
        setFilters({
            holidays: true,
            weekend: false,
            judicialVacation: true,
            turismo: true,
        });
        setPreFilter(1);
        setCount("30");
    }

    //Funcion para agregar una fecha al calendario del usuario
    async function saveDate(date: string, description: string) {
        try {
            await axios.post("/api/dates", {
                user: session?.user,
                date: {
                    date: date,
                    description: description,
                    alert: true,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        const response: any = calculateDate(date, count, {
            ...filters,
        });

        let icon: SweetAlertIcon = "success";
        let color = "green";
        let showCancelButton = true;

        if (response.title.includes("Error")) {
            icon = "warning";
            color = "#d4a05b";
            showCancelButton = false;
        }

        const result = await swal.fire({
            title: response.title,
            icon: icon,
            iconColor: color,
            confirmButtonColor: color,
            confirmButtonText: "Cerrar",
            showCancelButton: showCancelButton,
            cancelButtonText: "Guardar",
            cancelButtonColor: "#7066e0",
        });

        // En este caso, es dismissed cuando el usuario pulsa guardar, ya que es el boton de cancelar en Swal
        if (result.isDismissed) {
            const saveResponse = await swal.fire({
                title: "Ingrese una descripción",
                confirmButtonText: "Guardar",
                input: "text",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                inputAutoTrim: true,
            });

            if (saveResponse.isConfirmed) {
                await saveDate(response.date, saveResponse.value);
            }
        }
    }

    const visibleFiltersClass = visibleFilters ? "h-fit md:h-[22rem]" : "h-14";

    return (
        <>
            <form className="text-center flex flex-col gap-4 items-center py-6">
                <div
                    className={
                        "transition-all duration-300 bg-gray-700 text-white w-full p-3 flex flex-col items-center overflow-hidden " +
                        visibleFiltersClass
                    }
                >
                    <h2
                        onClick={() => setVisibleFilters(!visibleFilters)}
                        className="cursor-pointer uppercase w-full flex flex-col items-center font-semibold "
                    >
                        Filtros
                        <span>
                            {visibleFilters ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            )}
                        </span>
                    </h2>

                    <h3 className="my-2 text-left text-white max-w-[22rem]">
                        Selecciona cuándo debe suspenderse el cómputo del plazo.
                    </h3>

                    {/* Opciones predefinidas */}

                    <div className="flex flex-col gap-2 mt-2 sm:gap-0 sm:flex-row justify-between w-full">
                        <div
                            onClick={setLaboral}
                            className={
                                "p-2 border-[2px] hover:bg-gray-600 border-gray-500 cursor-pointer " +
                                (preFilter == 0
                                    ? "bg-gray-500 hover:bg-gray-500"
                                    : "")
                            }
                        >
                            Derecho Laboral
                        </div>
                        <div
                            onClick={setCivil}
                            className={
                                "p-2 border-[2px] hover:bg-gray-600 border-gray-500 cursor-pointer " +
                                (preFilter == 1
                                    ? "bg-gray-500 hover:bg-gray-500"
                                    : "")
                            }
                        >
                            Derecho Civil
                        </div>
                        <div
                            className={
                                "p-2 border-[2px] border-gray-500 opacity-25 " +
                                (preFilter == 2
                                    ? "bg-gray-500 opacity-[100%]"
                                    : "")
                            }
                        >
                            Personalizado
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-between items-center w-full mt-4">
                        <label className="" htmlFor="holidayCheck">
                            Durante feriados
                        </label>
                        <input
                            type="checkbox"
                            onChange={() => {
                                setFilters({
                                    ...filters,
                                    holidays: !filters.holidays,
                                });
                                setPreFilter(2);
                            }}
                            name="feriados"
                            checked={filters.holidays}
                            id="holidayCheck"
                        />
                    </div>

                    <div className="flex justify-between items-center w-full mt-4">
                        <label
                            className={filters.holidays ? "text-gray-500" : ""}
                            htmlFor="turismoCheck"
                        >
                            Durante semana de turismo
                        </label>
                        <input
                            checked={filters.turismo}
                            disabled={filters.holidays}
                            type="checkbox"
                            onChange={() => {
                                setFilters({
                                    ...filters,
                                    turismo: !filters.turismo,
                                });
                                setPreFilter(2);
                            }}
                            name="turismo"
                            id="turismoCheck"
                        />
                    </div>

                    <div className="flex justify-between items-center w-full mt-4">
                        <label className="" htmlFor="weekendCheck">
                            Durante sábados y domingos
                        </label>
                        <input
                            type="checkbox"
                            onChange={() => {
                                setFilters({
                                    ...filters,
                                    weekend: !filters.weekend,
                                });
                                setPreFilter(2);
                            }}
                            name="finDeSemana"
                            checked={filters.weekend}
                            id="weekendCheck"
                        />
                    </div>

                    <div className="flex justify-between items-center w-full mt-4">
                        <label className="" htmlFor="judicialVacationsCheck">
                            Durante ferias judiciales
                        </label>
                        <input
                            type="checkbox"
                            onChange={() => {
                                setFilters({
                                    ...filters,
                                    judicialVacation: !filters.judicialVacation,
                                });
                                setPreFilter(2);
                            }}
                            name="judicialVacations"
                            checked={filters.judicialVacation}
                            id="judicialVacationsCheck"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full md:flex-row items-center gap-4">
                    <label
                        className="bg-orange py-2 md:py-8 md:w-60 w-full"
                        htmlFor="idStartDate"
                    >
                        FECHA NOTIFICACIÓN
                    </label>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        id="idStartDate"
                        className="py-6 md:py-8 w-full md:w-40 text-center rounded-2xl flex items-center justify-center"
                        type="date"
                        min="2023-01-01"
                        max="2024-12-31"
                        value={date}
                        required
                    />
                </div>

                <div className="flex flex-col w-full md:flex-row items-center gap-4">
                    <label
                        className="bg-orange block w-full py-2 md:py-8 md:w-60"
                        htmlFor="idDeadLine"
                    >
                        PLAZO EN DÍAS
                    </label>
                    <input
                        onChange={(e) => setCount(e.target.value)}
                        id="idDeadLine"
                        className="py-6 md:py-8 w-full md:w-40 rounded-2xl text-center"
                        value={count}
                        type="number"
                        required
                    />
                </div>
                <button
                    onClick={handleClick}
                    className="bg-gray-700 border-[1px] border-white mt-2 w-fit text-white rounded-xl py-2 px-14 hover:bg-transparent"
                    type="submit"
                >
                    CALCULAR
                </button>
            </form>
        </>
    );
}
