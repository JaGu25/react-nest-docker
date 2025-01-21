import { getNotes } from "@/app/admin/pages/notes/services/note.service";
import { useQuery } from "@tanstack/react-query";

export const useNote = () => {
  const noteQuery = useQuery({
    queryKey: ["note"],
    queryFn: () => getNotes(),
    staleTime: 1000 * 60,
    retry: false,
  });

  return {
    noteQuery,
  };
};
