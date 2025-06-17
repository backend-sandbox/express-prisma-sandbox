import { Request, Response } from "express";

import { SuccessResponseDto } from "../dtos/success-response.dto";
import { ParkService } from "../services/park.service";

export class ParksController {
  private readonly parkService: ParkService = new ParkService();

  async getParks(req: Request, res: Response) {
    const parks = await this.parkService.getParks();

    res.json(new SuccessResponseDto(parks));
  }

  async getParkById(req: Request, res: Response) {
    // const parkId = req.params["parkId"];
    // const userId = req.user.id;
    const parkId = "1";
    const userId = "1";

    const park = await this.parkService.findParkByIdOrThrow(parkId!, userId);

    res.json(new SuccessResponseDto(park));
  }

  async upsertParkView(req: Request, res: Response) {
    // const updateParkView: Partial<ParkViewDto> = {
    //   parkId: req.body.parkId,
    //   isSaved: req.body.isSaved,
    //   userId: req.user.id,
    // };
    const updateParkView = "1, true, 1";

    const upsertParkView = await this.parkService.upsertParkView(updateParkView);

    res.status(200).json(new SuccessResponseDto(upsertParkView));
  }
}
