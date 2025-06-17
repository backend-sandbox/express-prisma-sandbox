export class SuccessResponseDto<T> {
  constructor(data: T) {
    Object.assign(this, { success: true, data });
  }

  success!: boolean;
  data!: T;
}
