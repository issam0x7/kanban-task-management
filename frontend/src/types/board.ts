

export type ColumnIdType = string;

export  interface BoardType {
  _id : string,
  name : string,
  columns : Map<ColumnIdType, ColumnType>,
}

export interface ColumnType {
  name : string,
  _id : string,
  tasks : TaskType[] | [] ,
}

export interface TaskType {
  _id : string,
  title: string, 
  description : string,
  status : string,
  columnId : string,
  subtasks : SubTasksType [] | [] 
}


interface SubTasksType {
  title: String,
  isCompleted: Boolean,
}

