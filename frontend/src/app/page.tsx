import { Input } from "@/components/ui/Input";
// import Button from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubTaskCheckBox from "@/components/SubTaskCheckbox";
import CreateBoardModal from "@/components/modals/create-board-modal";
import CreateTaskModal from "@/components/modals/create-task-modal";
import TaskDetailModal from "@/components/modals/task-detail-modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Button variant="destructive" />
      <Input type="text" placeholder="text"></Input>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select >
      <SubTaskCheckBox label="test" checked={false} /> */}
      {/* <CreateBoardModal /> */}
      {/* <CreateTaskModal /> */}
      <TaskDetailModal />
    </main>
  )
}
