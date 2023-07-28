import { Router } from 'express'
import { PatientController } from '../controllers/PatientController'

const routes = Router()

const patientController = new PatientController()

routes.post('/patient', patientController.create)
routes.get('/patients', patientController.list)
routes.get('/patient/:patientId', patientController.getByPatientId)

export { routes }
