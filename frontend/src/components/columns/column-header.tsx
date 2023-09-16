

interface ColumnHeaderProps  {
  color : string;
  name : string;
  taskNumber : number
}


const ColumnHeader = ({color, name, taskNumber} : ColumnHeaderProps ) => {
  return ( 
    <div className="flex items-center gap-3 mb-4">
      <span className="w-3 h-3 rounded-full" style={{backgroundColor : color}}></span> 
      <span className="text-sm">{name} ({taskNumber})</span>
    </div>
   );
}
 
export default ColumnHeader;