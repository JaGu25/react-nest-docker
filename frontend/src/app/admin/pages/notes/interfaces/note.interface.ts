export interface NoteResponse {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NoteRequest {
    title: string;
    description: string;
}

export type NoteRow = {
    id: number;
    title: string;
    description: string;
};
