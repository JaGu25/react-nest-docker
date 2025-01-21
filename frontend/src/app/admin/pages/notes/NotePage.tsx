import { Button } from "@/shared/components/shadcn/button";
import { Card, CardContent } from "@/shared/components/shadcn/card";
import { Plus } from "lucide-react";
import { useNote } from "@/app/admin/pages/notes/hooks/useNote";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { useState } from "react";
import { DataTableNote } from "@/app/admin/pages/notes/components/DataTableNote/data-table";
import { getColumns } from "./components/DataTableNote/columns";
import { NoteRow } from "@/app/admin/pages/notes/interfaces/note.interface";
import FormNote from "@/app/admin/pages/notes/components/FormNote/FormNote";
import { handleError } from "@/shared/utils/handle-error";
import { useError } from "@/shared/providers/ErrorProvider";
import { AxiosError } from "axios";
import noteService from "@/app/admin/pages/notes/services/note.service";

const NotePage = () => {
  const { setError } = useError();
  const [openModal, setOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteRow | null>(null);
  const {
    noteQuery: { data = [], refetch },
  } = useNote();

  const handleEdit = (note: NoteRow) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleDelete = async (note: NoteRow) => {
    try {
      await noteService.deleteNote(note.id);
      refetch();
    } catch (error) {
      handleError(error as AxiosError, setError);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Notas</h2>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpenModal(true);
                  setSelectedNote(null);
                }}
              >
                <Plus /> Agregar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedNote ? "Editar" : "Crear"} Nota
                </DialogTitle>
              </DialogHeader>
              <FormNote
                note={selectedNote}
                onSuccessSubmit={() => {
                  setOpenModal(false);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="py-6">
          <DataTableNote
            columns={getColumns({ handleDelete, handleEdit })}
            data={data}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotePage;
