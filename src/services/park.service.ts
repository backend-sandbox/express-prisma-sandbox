// import { NotFound } from "http-errors";

import errorConstant from "../constants/error.constant";
import { CreateParkDto } from "../dtos/create-park.dto";
import { mapRowToCreateParkDto } from "../mappers/row-to-park.mapper";
import { ParkRepository } from "../repositories/park.repository";
import { IncomingCsvPayload } from "../types/incoming-csv-payload.type";
// import { PageResponse } from "../utils/page-response.util";
// import { PageRequest } from "../utils/page-request.util";
// import errorConstant from "../constants/error.constant";

export class ParkService {
  private readonly parkRepository: ParkRepository = new ParkRepository();

  async getParks() {
    // const pageRequest = new PageRequest(parkParams);
    // const [parks, count] = await Promise.all([
    //   this.parkRepository.findParks(parkParams, pageRequest, userId),
    //   this.parkRepository.getCountParksByFilter(parkParams, userId),
    // ]);
    // const parksWithRelations = parks!.map((park) => this.parkMapper.toDto(park));
    // return new PageResponse<ParkDetailsDto>(pageRequest, parksWithRelations, count);
    return "";
  }

  async findParkById(parkId: string) {
    return await this.parkRepository.findParkById(parkId);
  }

  async findParkByIdOrThrow(parkId: string, userId?: string) {
    // if (userId) {
    //   await this.parkViewRepository.upsertParkView({ parkId, userId });
    // }
    // const park = await this.parkRepository.findParkByIdWithRelations(parkId, userId);
    // if (!park) {
    //   throw new NotFound(errorConstant.PARK_NOT_FOUND);
    // }
    // return this.parkMapper.toDto(park);
    return { id: parkId, userId: userId, name: "Sample Park", location: "Sample Location" };
  }

  async upsertParkView(data: string) {
    // return await this.parkViewRepository.upsertParkView(data);
    return { success: true, data: data, message: "Park view updated successfully" };
  }

  // ! upsert parks from CSV file
  async bulkUpsertParksFromCsv(parkObjects: IncomingCsvPayload) {
    const { mapping, data } = parkObjects;

    const parksToInsert: CreateParkDto[] = data.map((row) => {
      try {
        return mapRowToCreateParkDto(row, mapping);
      } catch {
        throw new Error(errorConstant.MAPPING_ROW_TO_PARK_FAILED);
      }
    });

    return await this.parkRepository.bulkUpsertAndCountParks(parksToInsert);
  }
}
