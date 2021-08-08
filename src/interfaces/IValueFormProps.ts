import IValue from "./IValue";
import IActivity from "./IActivity";


export default interface IValueFormProps {
    value: IValue;
    id: string;
    setValue: (value: any) => void;
    setActivities: (activity: IActivity[]) => void;
    setIsEditing: (bool: boolean) => void;
}