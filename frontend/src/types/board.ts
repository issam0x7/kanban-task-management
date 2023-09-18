


export  interface boardType {
  _id : string,
  name : string,
}

interface columnType {
  name : string,
  _id : string,
  tasks : taskType[] | null,
}

interface taskType {
  title: string, 
  description : string,
  status : string,
  subTasks : subTasksType [] | null
}


interface subTasksType {
  title: String,
  isCompleted: Boolean,
}

