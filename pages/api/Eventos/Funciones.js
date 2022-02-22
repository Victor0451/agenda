import excuteQuery from '../../../config/db';
import moment from 'moment';


export default async function handlerEvents(req, res) {

    const { method } = req


    if (method === "GET") {

        if (req.query.f && req.query.f === '1') {
            try {

                const result = await excuteQuery({

                    query: 'SELECT * FROM events ',

                });

                if (result[0]) {

                    res.json({
                        msg: "Eventos Encontrados",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("Evento Inexistente")

                }

            } catch (error) {
                console.log(error);
            }

        } else if (req.query.f && req.query.f === '2') {

            try {
                const result = await excuteQuery({

                    query: 'SELECT * FROM events WHERE id = ?',

                    values: [req.query.usuario],

                });

                if (result[0]) {

                    res.json(result[0])


                } else if (!result[0]) {

                    res.json("Evento Inexistente")

                }

            } catch (error) {
                console.log(error);
            }
        }

    } else if (method === "POST") {


        const event = {

            id: req.body.id,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            allDay: req.body.allDay,
            priority: req.body.priority,
            user: req.body.user,
            detail: req.body.detail,
        };

        try {
            const result = await excuteQuery({
                query: 'INSERT INTO events (id, start, end, allDay, priority, title, user, detail) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
                values: [event.id, event.start, event.end, event.allDay, event.priority, event.title, event.user, event.detail],
            });

            if (result) {
                res.json("Evento Registrado")
            }

        } catch (error) {
            console.log(error);
        }

        return event;

    } else if (method === "PUT") {

        const event = {

            id: req.body.id,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            allDay: req.body.allDay,
            priority: req.body.priority,
            user: req.body.user,
            detail: req.body.detail,
        };

        try {
            const result = await excuteQuery({
                query: `UPDATE events 

                        SET start = '${moment(event.start).format('YYYY-MM-DD HH:mm:ss')}', 
                            end = '${moment(event.end).format('YYYY-MM-DD HH:mm:ss')}', 
                            allDay =${event.allDay},                           
                            title = '${event.title}'
                                                  
                        WHERE id = '${event.id}'`,

                values: [event.start, event.end, event.allDay, event.priority, event.title, event.user, event.detail],
            });


            if (result) {
                res.json("Evento Actualizado")
            }

        } catch (error) {
            console.log(error);
        }

        return event;

    } else if (method === "DELETE") {

        try {
            const result = await excuteQuery({

                query: `DELETE 
                 
                        FROM events                         
                                                  
                        WHERE id = '${req.query.id}'`

            });


            if (result) {

                res.json("Evento Eliminado")
            }

        } catch (error) {
            console.log(error);
        }


    }
}

