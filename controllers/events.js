const {response} = require('express');
const Event = require('../models/EventModel');

const getEvents = async (req, res= response) => {

    try {
        const events = await Event.find().populate('user','name');
        
        res.status(200).json({
            ok: true,
            events
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
};

const createEvent = async (req, res = response) => {

    const event  = new Event(req.body);

    try {

        event.user = req.uid;
        
        const savedEvent = await event.save()

        res.status(201).json({
            ok: true,
            event: savedEvent
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
        
    };
};

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that ID'
            })
        };

        if(event.user.toString() !== uid){
             return res.status(401).json({
                 ok: false,
                 msg: "You are not authorized to modify this event"
             })
        };

        const newEvent = {
            ...req.body,
            uid
        };

        // El tercer parametro {new: true}, lo hacemos para que retorne el documento actualizado, no el viejo
        //documento (retornado por defecto)
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true} );

        res.status(200).json({
            ok: true,
            eventUpdated
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    };
};

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event  = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that ID'
            });
        };

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You are not authorized to delete this event"
            })
       };

        await Event.findByIdAndDelete(eventId);

       res.json({
           ok: true,
           msg: 'Event deleted'
       })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    };
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
