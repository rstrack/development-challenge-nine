import { Router } from 'express'
import { PatientController } from '../controllers/PatientController'

const routes = Router()

const patientController = new PatientController()

routes.post('/patient', patientController.create)

export { routes }
