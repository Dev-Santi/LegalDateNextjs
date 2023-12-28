export default function page() {
    return (
        <main className='py-12 gap-5 w-fit flex flex-col min-h-[calc(100vh-5rem)] max-w-[45rem] text-white'>
            <h1 className='font-bold text-2xl uppercase mt-10'>Objetivo y guia de utilización</h1>
            <p>
                La aplicación tiene como objetivo principal el facilitar una gestión eficiente de los plazos,
                permitiendo calcular con precisión las fechas término optimizando así la planificación de
                tareas.
            </p>
            <p>
                La aplicación se apoya en calendarios proporcionados por instituciones académicas y
                profesionales, asegurando la máxima precisión al tener en cuenta eventos y días hábiles
                específicos relevantes para la práctica jurídica.
            </p>
            <p>
                <span className='text-red-400'>¿Cómo se utiliza la aplicación?</span>
                <br /> <br />
                <ol className='flex flex-col gap-4 list-decimal'>
                    <li>
                        <h2>Seleccione la opción correspondiente a su caso:</h2>
                        <ol className='ml-10 mt-2' type='a'>
                            <li>Derecho Laboral: Es el filtro por defecto al ingresar al sitio, </li>
                        </ol>
                    </li>
                    <li>
                        <h2>-</h2>
                    </li>
                    <li>
                        <h2>-</h2>
                    </li>
                </ol>
            </p>
        </main>
    );
}
