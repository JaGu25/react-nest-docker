import { NoteRequest, NoteResponse, NoteRow } from "@/app/admin/pages/notes/interfaces/note.interface";
import { api } from "@/shared/lib/api";

export const getNotes = async (): Promise<NoteRow[]> => {
    const { data } = await api.get<NoteResponse[]>('/note');
    return noteAdapter(data);
}

const noteAdapter = (notesResponse: NoteResponse[]): NoteRow[] => notesResponse.map(({ id, title, description }) => ({
    id,
    description,
    title
}))


export const createNote = async (noteRequest: NoteRequest) => {
    try {
        await api.post('/note', noteRequest);
    } catch (error) {
        throw error;
    }
}

export const updateNote = async (noteRequest: NoteRequest, id: number) => {
    try {
        await api.patch(`/note/${id}`, noteRequest);
    } catch (error) {
        throw error;
    }
}

export const deleteNote = async (id: number) => {
    try {
        await api.delete(`/note/${id}`);
    } catch (error) {
        throw error;
    }
}

export default {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}
