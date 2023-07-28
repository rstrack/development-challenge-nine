import { Request, Response } from 'express'
import { container } from '../containers/container'
import { CreatePatientService } from '../services/CreatePatientService'

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
}
