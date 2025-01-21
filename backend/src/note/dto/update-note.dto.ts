import { PartialType } from "@nestjs/mapped-types";
import { CreateNoteDto } from "src/note/dto/create-note.dto";

export class UpdateNoteDto extends PartialType(CreateNoteDto) { }
