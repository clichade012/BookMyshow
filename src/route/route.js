const express = require('express')
const router = express.Router()

const {createuser} = require('../controller/usercontroller')

const {theatrecreate ,getBylocation }= require('../controller/theatrecontroller')

const {createmovies,getmovies} = require('../controller/moviecontroller')

const {showcreate} = require('../controller/showcontroller')

const {bookTicket,updateTicket} = require('../controller/ticketcontroller')


router.post('/create/user',createuser)

router.post('/create/theatre',theatrecreate)

router.get('/get/:userId',getBylocation)

router.post('/movie/create',createmovies)

router.get('/getmovie/:userId',getmovies)

router.post('/show/create',showcreate)

router.put('/Bookticket',bookTicket)

router.put('/updateBook/:userId',updateTicket)



module.exports = router;