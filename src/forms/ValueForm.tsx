import React from "react"
import fetchValueById from "../fetches/FetchValueById";
import updateValueById from "../fetches/UpdateValueById";
import IValueFormProps from "../interfaces/IValueFormProps"

export default function ValueForm(props: IValueFormProps) {
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.target as HTMLTextAreaElement;
        props.setValue((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        await updateValueById(props.id, props.value);
        await fetchValueById(props.id, props.setValue, props.setActivities);
        props.setIsEditing(false);
    };

    return <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="form-item"
            name="name"
            value={props.value.name}
            onChange={onChange}
        />
        <input
            type="text"
            className="form-item"
            name="description"
            value={props.value.description}
            onChange={onChange}
        />
        <input
            type="number"
            className="form-item"
            name="importance"
            value={props.value.importance}
            onChange={onChange}
        />
        <div className="text-center">
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        </div>
    </form>
}