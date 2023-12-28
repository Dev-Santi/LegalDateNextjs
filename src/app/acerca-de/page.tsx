export default function page() {
    return (
        <main className='py-12 gap-5 w-fit flex flex-col min-h-[calc(100vh-5rem)] max-w-[45rem] text-white'>
            <h1 className='font-bold text-2xl uppercase mt-10'>Objetivo y guía de utilización</h1>
            <p>
                La aplicación tiene como objetivo principal el facilitar una gestión eficiente de los plazos,
                permitiendo calcular con precisión las fechas término optimizando así la planificación de
                tareas.
            </p>
            <p>
                La aplicación se apoya en calendarios proporcionados por instituciones académicas y
                profesionales, asegurando la máxima precisión al tener en cuenta eventos y días relevantes
                para la práctica jurídica.
            </p>
            <p>
                <span className='text-red-400'>¿Cómo utilizar la aplicación?</span>
                <br /> <br />
                <ol className='flex flex-col gap-4 list-decimal'>
                    <li>
                        <h2>Ubicar la sección de filtros y seleccionar la opción correspondiente al caso:</h2>
                        <ol className='flex flex-col gap-4 ml-10 mt-2 list-[lower-alpha]'>
                            <li>
                                <span className='font-bold'>Derecho Laboral:</span> Es el filtro por defecto
                                al ingresar al sitio, cuyo plazo se computa solamente en días hábiles.
                            </li>
                            <li>
                                <span className='font-bold'>Derecho Civil: </span>
                                {
                                    'El plazo se computa en días corridos (no suspende durante sábados y domingos).'
                                }
                            </li>
                            <li>
                                <span className='font-bold'>Personalizado: </span>Consiste en modificar
                                manualmente las casillas para ajustar el filtro a las necesidades del caso
                                concreto.
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h2>Ingresar los datos:</h2>
                        <ol className='flex flex-col gap-4 ml-10 mt-2 list-[lower-alpha]'>
                            <li>
                                <span className='font-bold'>Fecha de notificación: </span>
                                Al hacer click sobre el ícono con forma de calendario puede desplegarlo y
                                seleccionar una fecha.
                            </li>
                            <li>
                                <span className='font-bold'>Plazo en días: </span>
                                Se debe ingresar el plazo. Dependiendo del filtro seleccionado, el valor
                                predefinido puede ser de 15 o 30 días.
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h2>
                            Finalmente, volver a revisar que los datos ingresados coincidan con las
                            particularidades de tu caso y ejecutar el programa para obtener el resultado.
                        </h2>
                    </li>
                </ol>
            </p>
        </main>
    );
}
