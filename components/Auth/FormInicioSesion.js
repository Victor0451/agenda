import React from 'react'
import Link from 'next/link'

const FormInicioSesion = ({
    iniciarSesion,
    usuarioRef,
    contrasenaRef,
    errores
}) => {
    return (
        <div className='mt-4 container border border-dark p-4 col-md-4'>

            <h2>
                <strong>
                    <u>
                        Iniciar Sesion
                    </u>
                </strong>
            </h2>


            <div className='d-flex justify-content-center'>
                <div className='mt-4 col-md-12 border border-dark p-4 '>
                    <div className='col-md-12'>
                        <label>
                            <u>
                                Usuario
                            </u>
                        </label>
                        <input className='form-control' type="text" placeholder='Usuario' ref={usuarioRef} />
                    </div>

                    <div className='col-md-12 mt-4'>
                        <label>
                            <u>
                                Contraseña
                            </u>
                        </label>
                        <input className='form-control' type="password" placeholder='Contraseña' ref={contrasenaRef} />
                    </div>


                    {errores ? (
                        <div className='mt-4 mb-4 border border-dark alert alert-danger text-center text-uppercase'>
                            {errores}
                        </div>
                    ) : null}

                    <div className='row border border-dark p-4 d-flex justify-content-center mt-4'>
                        <div className=' '>
                            <button className='btn btn-primary' onClick={() => iniciarSesion()}>
                                Iniciar Session
                            </button>
                        </div>


                        <div className='ml-2 '>
                            <Link href='/auth/registrar'>
                                <a className='btn btn-secondary' >
                                    Registrarme
                                </a>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormInicioSesion