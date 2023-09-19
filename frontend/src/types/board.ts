


export  interface BoardType {
  _id : string,
  name : string,
  columns : ColumnType [] | []
}

interface ColumnType {
  name : string,
  _id : string,
  tasks : TaskType[] | [] | null,
}

export interface TaskType {
  _id : string,
  title: string, 
  description : string,
  status : string,
  subtasks : SubTasksType [] | [] 
}


interface SubTasksType {
  title: String,
  isCompleted: Boolean,
}

