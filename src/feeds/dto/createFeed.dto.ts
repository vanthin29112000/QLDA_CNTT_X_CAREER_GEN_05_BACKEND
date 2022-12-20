import { IsNotEmpty } from 'class-validator';

export class CreateFeedDto {
  @IsNotEmpty()
  readonly title: string;
  readonly desc: string;
  readonly image: string;
}
