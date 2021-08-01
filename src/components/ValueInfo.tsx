import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import IValue from "../interfaces/IValue";
import IActivity from "../interfaces/IActivity";
import ActivityListItem from "./ActivityListItem";
import fetchValueById from "../fetches/FetchValueById";
import deleteValueById from "../fetches/DeleteValueById";
import updateValueById from "../fetches/UpdateValueById";

export default function ValueInfo() {
  const history = useHistory();
  const { id, name } = useParams<{ id: string; name: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [value, setValue] = useState<IValue>({
    name: "",
    description: "",
    importance: 0,
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    await updateValueById(id, value);
    await fetchValueById(id, setValue, setActivities);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchValueById(id, setValue, setActivities);
  }, []);

  return (
    <div className="container">
      <div className="flex-center">
        {isEditing ?
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-item"
              name="name"
              value={value.name}
              onChange={onChange}
            />
            <input
              type="text"
              className="form-item"
              name="description"
              value={value.description}
              onChange={onChange}
            />
            <input
              type="number"
              className="form-item"
              name="importance"
              value={value.importance}
              onChange={onChange}
            />
            <div className="text-center">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
          : <header className="header">
            <h2>{value.name === "" ? name : value.name}</h2>
            <p>Description: {value.description}</p>
            <p>Importance: {value.importance}</p>
          </header>
        }
        <div style={{marginTop: "1rem" }}>
          <button className="btn" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </button>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>Activities</h3>
      <ul className="plain-list card-grid">
        {activities.map((activity) => {
          return <ActivityListItem activity={activity} />;
        })}
      </ul>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn btn-delete"
          onClick={() => deleteValueById(id, value.name, history)}
        >
          Delete Value
        </button>
      </div>
    </div>
  );
}
