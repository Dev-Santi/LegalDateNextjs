export default function page() {
    return (
        <main className='py-12 gap-5 w-fit flex flex-col min-h-[calc(100vh-5rem)] max-w-[45rem] text-white'>
            <h1 className='font-bold text-2xl uppercase mt-10'>Objetivo y guia de utilización</h1>
            <p>
                La aplicación tiene como objetivo principal el poder facilitar una gestión eficiente de los
                plazos legales, permitiendo calcular con precisión las fechas de término optimizando la
                planificación de tareas.
            </p>
            <p>
                La aplicación se apoya en calendarios suministrados por instituciones académicas y
                profesionales, asegurando la máxima precisión al tener en cuenta eventos y días hábiles
                específicos relevantes para la práctica legal.
            </p>
        </main>
    );
}
