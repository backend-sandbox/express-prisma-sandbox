import { PageQueryDto } from "../dtos/page-query.dto";

export class PageRequest {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly sortBy: Record<string, "asc" | "desc">;
  readonly skip: number;

  constructor(pageParams: PageQueryDto) {
    this.currentPage = pageParams.currentPage || 1;
    this.pageSize = pageParams.pageSize || 10;
    this.sortBy = pageParams.sortBy || { id: "asc" };
    this.skip = (this.currentPage - 1) * this.pageSize;
  }

  getFilter() {
    return {
      orderBy: this.sortBy,
      skip: this.skip,
      take: this.pageSize,
    };
  }
}
