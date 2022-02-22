import React from 'react'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import es from "@fullcalendar/core/locales/es"

const HomeScreen = ({
    edit,
    events,
    handleDateSelect,
    selEvent,
    editEnable,
    delet,
    deleteEnable,

}) => {
    return (
        <div className='mt-4 container border border-dark'>

            <h2 className='mt-4 mb-4'>
                <strong>
                    <u>
                        Agenda
                    </u>
                </strong>
            </h2>


            <div className=" border border-dark mt-4 mb-4 p-4">
                <h3 className="text-center mb-4 font-weight-bold">Opciones</h3>
                <div className="row d-flex justify-content-center">
                    <button className='btn btn-warning' onClick={() => { editEnable() }}>
                        Editar
                    </button>
                    <button className='btn btn-danger ml-1' onClick={() => { deleteEnable() }}>
                        Eliminar
                    </button>
                </div>
            </div>


            {edit === true ? (
                <>
                    <div className='alert alert-warning border border-dark mt-4 mb-4 text-center text-uppercase'>
                        Activaste el modo edicion, ahora puedes editar la fecha y hora de tus eventos registrados
                    </div>
                    <div className='alert alert-info border border-dark mt-4 mb-4 text-center text-uppercase'>
                        Puedes cambiar la fecha y hora del evento simplemente arrastrandolo y/o expandiendolo.
                        Para registrar la modificacion solo deberas hacer click en el evento y se te notificara cuando se haya realizado exitosamente
                    </div>


                </>
            ) : null}

            {delet === true ? (
                <>
                    <div className='alert alert-danger border border-dark mt-4 mb-4 text-center text-uppercase'>
                        Activaste el modo eliminacion, ahora puedes editar la fecha y hora de tus eventos registrados
                    </div>
                    <div className='alert alert-info border border-dark mt-4 mb-4 text-center text-uppercase'>
                        Puedes cambiar la fecha y hora del evento simplemente arrastrandolo y/o expandiendolo.
                        Para registrar la modificacion solo deberas hacer click en el evento y se te notificara cuando se haya realizado exitosamente
                    </div>


                </>
            ) : null}


            <div className='  m-4 border border-dark p-4'>

                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='timeGridWeek'
                    editable={edit}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateSelect}
                    events={events}
                    locale={es}
                    eventClick={selEvent}


                />
            </div>
        </div>
    )
}

export default HomeScreen