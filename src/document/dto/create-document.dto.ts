import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
