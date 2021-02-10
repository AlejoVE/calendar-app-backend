/*
    Rutass de eventos /events
    host + api/events
*/


const express = require('express');
const {check} = require('express-validator');
const {validateInputs} = require('../middlewares/validate-inputs');

const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const {validateJWT} = require('../middlewares/validate-jwt');
const {isDate} = require('../helpers/isDate')

const router = express.Router();

//Aplicar  middleware a todas las rutas
router.use(validateJWT);

router.get('/',
    getEvents
);

router.post('/', 
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start date is mandatory').custom(isDate),
        check('end', 'End date is mandatory').custom(isDate),
        validateInputs
    ], 
    createEvent
);

router.put('/:id',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start date is mandatory').custom(isDate),
        check('end', 'End date is mandatory').custom(isDate),
        validateInputs
    ],
     updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;