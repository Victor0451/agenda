import Link from 'next/link'
import React from 'react'

const FormRegistro = ({
    usuarioRef,
    contrasenaRef,
    nombreRef,
    apellidoRef,
    registrarUsuario,
    errores
}) => {
    return (
        <div className='mt-4 container border border-dark p-4 col-md-10'>

            <h2>
                <strong>
                    <u>
                        Registrar Usuario
                    </u>
                </strong>
            </h2>


            <div className='row mt-4 border border-dark p-4 '>

                <div className='col-md-4'>
                    <label>
                        <u>
                            Usuario
                        </u>
                    </label>
                    <input className='form-control' type="text" placeholder='Usuario' ref={usuarioRef} />
                </div>

                <div className='col-md-4'>
                    <label>
                        <u>
                            Contraseña
                        </u>
                    </label>
                    <input className='form-control' type="password" placeholder='Contraseña' ref={contrasenaRef} />
                </div>


                <div className='col-md-4'>
                    <label>
                        <u>
                            Apellido
                        </u>
                    </label>
                    <input className='form-control' type="text" placeholder='Apellido' ref={apellidoRef} />
                </div>

                <div className='col-md-4 mt-4'>
                    <label>
                        <u>
                            Nombre
                        </u>
                    </label>
                    <input className='form-control' type="text" placeholder='Nombre' ref={nombreRef} />
                </div>
            </div>

            {errores ? (
                <div className='mt-4 mb-4 border border-dark alert alert-danger text-center text-uppercase'>
                    {errores}
                </div>
            ) : null}

            <div className='row d-flex justify-content-center border border-dark p-4 mt-4'>
                <div className=''>
                    <button className='btn btn-primary' onClick={() => registrarUsuario()}>
                        Registrar Usuario
                    </button>
                </div>


                <div className='ml-1'>
                    <Link href='/'>
                        <a className='btn btn-danger' >
                            Cancelar
                        </a>
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default FormRegistro