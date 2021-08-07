import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import deleteActivityById from "../fetches/DeleteActivityById";
import fetchActivityById from "../fetches/FetchActivityById";
import updateActivityById from "../fetches/UpdateActivityById";
import IActivity from "../interfaces/IActivity";

export default function ActivityInfo() {
  const history = useHistory();
  const { id, name } = useParams<{ id: string; name: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activity, setActivity] = useState<IActivity>({
    name: "",
    duration: 0,
    time: "",
    createdAt: "",
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    await updateActivityById(id, activity);
    await fetchActivityById(id, setActivity);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchActivityById(id, setActivity);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h2>Activity Info</h2>
      </header>
      <div className="flex-center text-center">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-item"
              name="name"
              value={activity.name}
              onChange={onChange}
            />
            <input
              type="number"
              className="form-item"
              name="duration"
              value={activity.duration}
              onChange={onChange}
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <>
            <p>{activity.name === "" ? name : activity.name}</p>
            <p>{activity.time === undefined 
              ? "No Time Selected" 
              : new Date(activity.time).toLocaleString()}
            </p>
            <p>{activity.duration} minutes</p>
          </>
        )}
        <button className="btn" onClick={() => setIsEditing(!isEditing)}>
          Edit
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          className="btn btn-delete"
          onClick={() => deleteActivityById(id, activity.name, history)}
        >
          Delete Value
        </button>
      </div>
    </div>
  );
}
