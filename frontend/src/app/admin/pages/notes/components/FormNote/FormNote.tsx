import { Input } from "@/shared/components/shadcn/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcn/form";
import { z } from "zod";
import { LoadingButton } from "@/shared/components/ui/LoadingButton";
import { useError } from "@/shared/providers/ErrorProvider";
import { handleError } from "@/shared/utils/handle-error";
import { AxiosError } from "axios";
import { toast } from "@/shared/hooks/use-toast";
import { formNoteSchema } from "@/app/admin/pages/notes/components/FormNote/schema";
import { NoteRow } from "@/app/admin/pages/notes/interfaces/note.interface";
import noteService from "@/app/admin/pages/notes/services/note.service";

type FormValues = z.infer<typeof formNoteSchema>;

interface Props {
  note: NoteRow | null;
  onSuccessSubmit: () => void;
}

const FormNote: React.FC<Props> = ({ note, onSuccessSubmit }) => {
  const { setError } = useError();
  const form = useForm<FormValues>({
    resolver: zodResolver(formNoteSchema),
    defaultValues: note
      ? { ...note }
      : {
          title: "",
          description: "",
        },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (form: FormValues) => {
    try {
      if (note) {
        await noteService.updateNote(form, note.id);
      } else {
        await noteService.createNote(form);
      }
      toast({
        title: `${note ? "Editado" : "Creado"} con exito`,
      });
      onSuccessSubmit();
    } catch (error) {
      handleError(error as AxiosError, setError);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
        >
          {note ? "Editar" : "Crear"}
        </LoadingButton>
      </form>
    </Form>
  );
};

export default FormNote;
