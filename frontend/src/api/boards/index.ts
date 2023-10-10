import { apiClient } from "@/lib/api";

export async function getBoards() {
   const res = await apiClient.get("/api/boards");

   if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
   }

   return res.data;
}

export async function getBoard(id: string) {
   const res = await apiClient.get("/api/boards/" + id);
   if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
   }

   return res.data;
}
