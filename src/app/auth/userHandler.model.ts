export class UserHandler {
  constructor(
    public status: number,
    public message: string,
    public name: string,
    public messageHeader?: string
  ) {}
}
