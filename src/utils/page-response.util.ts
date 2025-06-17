import { PageRequest } from "./page-request.util";

export class PageResponse<T> {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalPages: number;
  readonly sortBy: Record<string, "asc" | "desc">;
  readonly content: T[];
  private readonly totalCount: number;

  constructor(pageRequest: PageRequest, content: T[], count: number) {
    this.currentPage = pageRequest.currentPage!;
    this.pageSize = pageRequest.pageSize!;
    this.totalCount = count;
    this.totalPages = Math.ceil(count / (this.pageSize === 0 ? this.totalCount : this.pageSize));
    this.sortBy = pageRequest.sortBy!;
    this.content = content;
  }
}
