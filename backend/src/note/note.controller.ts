import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from 'src/note/dto/create-note.dto';
import { UpdateNoteDto } from 'src/note/dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/interfaces/roles.interface';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  @Auth()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.remove(id);
  }
}
