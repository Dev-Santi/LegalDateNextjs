import Link from 'next/link';
import { FaLinkedin, FaWhatsappSquare, FaGithubSquare, FaEnvelope } from 'react-icons/fa';

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
                <h3 className='text-xl font-semibold mt-4 mb-4'>¿Cómo utilizar la aplicación?</h3>
                <ol className='flex flex-col gap-8 list-decimal'>
                    <li>
                        <h2 className='text-orange font-bold'>
                            Seleccionar el filtro correspondiente al caso:
                        </h2>
                        <ul className='flex flex-col gap-4 ml-10 mt-2 list-disc'>
                            <li>
                                <span className='font-semibold'>Derecho Laboral:</span> Es el filtro por
                                defecto al ingresar al sitio, cuyo plazo se computa solamente en días hábiles.
                            </li>
                            <li>
                                <span className='font-semibold'>Derecho Civil: </span>
                                {
                                    'El plazo se computa en días corridos (no suspende durante sábados y domingos).'
                                }
                            </li>
                            <li>
                                <span className='font-semibold'>Personalizado: </span>Consiste en modificar
                                manualmente las casillas para ajustar el filtro a las necesidades del caso
                                concreto.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h2 className='text-orange font-bold'>Ingresar los datos:</h2>
                        <ul className='flex flex-col gap-4 ml-10 mt-2 list-disc'>
                            <li>
                                <span className='font-semibold'>Fecha de notificación: </span>
                                Al hacer click sobre el ícono con forma de calendario puede desplegarlo y
                                seleccionar una fecha.
                            </li>
                            <li>
                                <span className='font-semibold'>Plazo en días: </span>
                                Se debe ingresar el plazo. Dependiendo del filtro seleccionado, el valor
                                predefinido puede ser de 15 o 30 días.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h2 className='text-orange font-bold'>
                            Finalmente, volver a revisar que los datos ingresados coincidan con las
                            particularidades de tu caso y ejecutar el programa para obtener el resultado.
                        </h2>
                    </li>
                </ol>
            </p>
            <h2 className='text-lg text-white mt-4 mb-[-0.75rem]'>Contacto:</h2>
            <div className='flex text-4xl gap-3 items-center text-blue-400'>
                <Link className='hover:text-white' target='_blank' href='https://wa.me/+59897111899'>
                    <FaWhatsappSquare />
                </Link>
                <Link
                    className='hover:text-white'
                    target='_blank'
                    href='https://www.linkedin.com/in/santiago-larrosa-bauz%C3%A1-99b740251/'
                >
                    <FaLinkedin />
                </Link>
                <Link target='_blank' className='hover:text-white' href='https://github.com/Dev-Santi'>
                    <FaGithubSquare />
                </Link>
                <Link
                    target='_blank'
                    className='ml-1 hover:text-white'
                    href='mailto:bauzalarrosasantiago@gmail.com'
                >
                    <FaEnvelope />
                </Link>
            </div>
            <Link
                target='_blank'
                className='text-lg hover:text-white underline gap-2 items-center text-blue-400'
                href='https://www.santiagolarrosa.tech/'
            >
                Visitar sitio web
            </Link>
        </main>
    );
}
