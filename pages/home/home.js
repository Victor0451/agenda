import React, { useEffect, useState } from 'react'
import UserContext from "../../context/UserContext";
import Layout from '../../components/Layouts/Layout';
import Router from 'next/router';
import jsCookie from 'js-cookie';
import toastr from 'toastr';
import HomeScreen from '../../components/home/HomeScreen';
import { v4 as uuidv4 } from 'uuid';
import ModalEvent from '../../components/home/ModalEvent';
import axios from 'axios';


const Home = () => {

  let titleRef = React.createRef()
  let priorityRef = React.createRef()
  let userRef = React.createRef()
  let detailRef = React.createRef()



  const [events, saveEvents] = useState([])
  const [eventSelected, saveEventSelected] = useState([])
  const [edit, saveEdit] = useState(false)
  const [delet, saveDelete] = useState(false)



  // FUNCIONES CALENDARIO

  const handleDateSelect = (selectInfo) => {

    let title = prompt('Ingresa el titulo del evento')
    let priority = prompt('Identifica su nivel de prioridad ingresando: 1 para "NORMAL", 2 para "IMPORTANTE" o 3 para "URGENTE"')
    let detail = prompt('Puedes ingresar si es necesario, una descripcion mas detallada de este evento')

    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title != null) {

      let ev = {
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        user: jsCookie.get("usuario"),
        priority,
        detail
      }

      console.log(ev)

      saveEvents([...events, ev])

      postEvent(ev)

    } else {
      toastr.warning("No registraste el evento", "ATENCION")
    }

  }

  const editEnable = () => {
    if (edit === true) {
      saveEdit(false)
      toastr.info("Modo edicion desactivado", "ATENCION")
    } else if (edit === false) {
      saveEdit(true)
      toastr.info("Modo edicion activado", "ATENCION")
    }
  }

  const deleteEnable = () => {
    if (delet === true) {
      saveDelete(false)
      toastr.info("Modo eliminacion desactivado", "ATENCION")
    } else if (delet === false) {
      saveDelete(true)
      toastr.info("Modo eliminacion activado", "ATENCION")
    }
  }

  const selEvent = (eventInfo) => {

    if (edit === true && delet === false) {

      let evE = {
        id: eventInfo.event.id,
        title: eventInfo.event.title,
        start: eventInfo.event.start,
        end: eventInfo.event.end,
        allDay: eventInfo.event.allDay,

      }

      putEvent(evE)

    } else if (edit === false && delet === false) {

      saveEventSelected(eventInfo.event)

      let myModal = new bootstrap.Modal(document.getElementById('modalVista'))
      myModal.show()

    } else if (edit === false && delet === true) {

      deleteEvents(eventInfo.event.id)

    }
  }

  // --------------------------------------

  // APIS

  const postEvent = async (data) => {
    await axios.post('/api/Eventos/Funciones', data)
      .then(res => {

        if (res.data === "Evento Registrado") {
          toastr.success("El evento se registro correctamente", "ATENCION")
        }

      })
      .catch(error => {
        console.log(error)

        toastr.danger("Ocurrio un error al registrar el evento", "ATENCION")
      })
  }

  const getEvents = async () => {

    await axios.get('/api/Eventos/Funciones', {
      params: {
        f: '1'
      }
    })
      .then(res => {

        if (res.data.msg === "Eventos Encontrados") {

          toastr.info("Actualizando eventos en la agenda", "ATENCION")

          saveEvents(res.data.body)

        }
      })
      .catch(error => {
        console.log(error)

        toastr.danger("Ocurrio un error al cargar los eventos", "ATENCION")
      })
  }

  const putEvent = async (data) => {
    await axios.put('/api/Eventos/Funciones', data)
      .then(res => {

        if (res.data === "Evento Actualizado") {
          toastr.success("El evento se actualizo correctamente", "ATENCION")
        }

      })
      .catch(error => {
        console.log(error)

        toastr.danger("Ocurrio un error al registrar el evento", "ATENCION")
      })
  }

  const deleteEvents = async (id) => {

    await axios.delete(`/api/Eventos/Funciones`, {
      params: {
        id: id
      }
    })
      .then(res => {
        if (res.data === "Evento Eliminado") {

          toastr.success("Evento eliminado correctamente", "ATENCION")

          let index = events.map(function (item) {

            return item.id;

          }).indexOf(id);

          let ev = events.splice(index, 1);

          saveEvents([...events, ev])

        }
      })
      .catch(error => {
        console.log(error)
        toastr.error("Ocurrio un error al eliminar el evento", "ATENCION")
      })

  }

  // --------------------------------------


  let token = jsCookie.get("token")

  useEffect(() => {

    if (!token) {
      Router.push("/redirect");
    }
    getEvents()

  }, [token]);


  return (
    <UserContext.Consumer>
      {({ usuario }) => {
        return (
          <Layout>

            <HomeScreen
              events={events}
              edit={edit}
              handleDateSelect={handleDateSelect}
              selEvent={selEvent}
              editEnable={editEnable}
              priorityRef={priorityRef}
              userRef={userRef}
              detailRef={detailRef}
              delet={delet}
              deleteEnable={deleteEnable}
            />

            <ModalEvent
              evento={eventSelected}
            />



          </Layout>
        );
      }}
    </UserContext.Consumer>
  )
}

export default Home