// import { NotFound } from "http-errors";

import { ParkRepository } from "../repositories/park.repository";
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
}
