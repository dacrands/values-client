import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import IValue from "../interfaces/IValue";
import IActivity from "../interfaces/IActivity";
import ActivityListItem from "./ActivityListItem";
import fetchValueById from "../fetches/FetchValueById";
import deleteValueById from "../fetches/DeleteValueById";
import ValueForm from "../forms/ValueForm";

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

  useEffect(() => {
    fetchValueById(id, setValue, setActivities);
  }, []);

  return (
    <div className="container">
      <div className="flex-center">
        {isEditing ?
          <ValueForm 
            id={id}
            value={value}
            setValue={setValue}
            setActivities={setActivities}
            setIsEditing={setIsEditing}
          />
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
