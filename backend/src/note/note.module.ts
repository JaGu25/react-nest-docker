import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/note/entities/note.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NoteController],
  imports: [
    TypeOrmModule.forFeature([Note]),
    AuthModule,
  ],
  providers: [NoteService],
})
export class NoteModule { }
