import { Request, Response } from "express";

import { SuccessResponseDto } from "../dtos/success-response.dto";
import { ParkService } from "../services/park.service";
import { IncomingCsvPayload } from "../types/incoming-csv-payload.type";
import successConstant from "../constants/success.constant";

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

  // ! upsert parks from CSV file
  async bulkUpsertParksFromCsv(req: Request, res: Response) {
    const parkObjects: IncomingCsvPayload = {
      mapping: req.body.mapping,
      data: req.body.data,
    };

    const parkUpsertCount = await this.parkService.bulkUpsertParksFromCsv(parkObjects);

    const upsertInfo = {
      message: successConstant.CSV_FILE_UPLOADED_SUCCESSFULLY,
      insertedParksCount: parkUpsertCount,
    };

    res.status(200).json(new SuccessResponseDto(upsertInfo));
  }
}
