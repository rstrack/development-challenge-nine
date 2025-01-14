import { Request, Response } from 'express'
import { container } from '../containers/container'
import { CreatePatientService } from '../services/CreatePatientService'
import { ListPatientsService } from '../services/ListPatientsService'
import { ListPatientsRequest } from '../dtos/listPatientsDTO'
import { GetPatientByIdService } from '../services/GetPatientByIdService'
import { DeletePatientService } from '../services/DeletePatientService'
import { UpdatePatientService } from '../services/UpdatePatientService'

export class PatientController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { birthDate, email, name, address } = req.body

      const service = container.resolve(CreatePatientService)
      const result = await service.execute({
        birthDate,
        email,
        name,
        address,
      })
      return res.status(201).json(result)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        error: true,
        message: String(e),
      })
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { page, length, input } = req.query
      const service = container.resolve(ListPatientsService)
      const result = await service.execute({
        page,
        length,
        input,
      } as ListPatientsRequest)
      return res.status(200).json(result)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        error: true,
        message: String(e),
      })
    }
  }

  async getByPatientId(req: Request, res: Response): Promise<Response> {
    try {
      const { patientId } = req.params
      const service = container.resolve(GetPatientByIdService)
      const result = await service.execute({
        patientId,
      })
      return res.status(200).json(result)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        error: true,
        message: String(e),
      })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, birthDate, email, name, address } = req.body

      const service = container.resolve(UpdatePatientService)
      const result = await service.execute({
        id,
        birthDate,
        email,
        name,
        address,
      })
      return res.status(200).json(result)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        error: true,
        message: String(e),
      })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { patientId } = req.params
      const service = container.resolve(DeletePatientService)
      await service.execute({
        patientId,
      })
      return res.status(204).send()
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        error: true,
        message: String(e),
      })
    }
  }
}
