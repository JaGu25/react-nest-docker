import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/note/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) { }

  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = this.noteRepository.create({
        ...createNoteDto
      })

      await this.noteRepository.save(note);

      return note;
    } catch (error) {
      this.logger.error(error.detail)
    }
  }

  findAll() {
    try {
      const notes = this.noteRepository.find({});
      return notes;
    } catch (error) {
      this.logger.error(error.detail)
    }
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOneBy({
      id
    });

    if (!note)
      throw new NotFoundException(`Note with ${id} not found`);

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.preload({ id, ...updateNoteDto });

    if (!note) throw new NotFoundException(`Note with id: ${id} not found`);

    try {
      await this.noteRepository.save(note);

      return note;
    } catch (error) {
      this.logger.error(error.detail)
    }
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({
      id
    });

    if (!note)
      throw new NotFoundException(`Note with ${id} not found`);

    await this.noteRepository.remove(note);
  }

  async getOneNote(id: number): Promise<Note> {

    const note = await this.noteRepository.findOneBy({
      id
    });

    if (!note)
      throw new NotFoundException(`Note with ${id} not found`);

    return note;
  }
}
