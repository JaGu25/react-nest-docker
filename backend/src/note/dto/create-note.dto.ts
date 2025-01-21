import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateNoteDto {

    @IsString()
    title: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    description: string;

}