import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import IValue from "../interfaces/IValue";
import IActivity from "../interfaces/IActivity";


export default function ValueInfo() {  
    const history = useHistory();  
    const { id, name } = useParams<{ id: string, name: string }>();
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [value, setValue] = useState<IValue>({
        name: "",
        description: "",
        importance: 0
    });
    const fetchValue = async () => {
        await fetch(`http://localhost:7000/api/values/${id}`)
            .then(response => response.json())
            .then(data => {
                setValue({ name: data.name, description: data.description, importance: data.importance })
                setActivities([...data.activities])
            });
    }
    const deleteValue = async () => {
        if (!window.confirm(`Are yous sure you want to delete the value: ${value.name}`)) {
            return;
        };
        await fetch(`http://localhost:7000/api/values/${id}`, {
            method: "DELETE"
        })
        history.push("/values");
    }
    useEffect(() => {
        fetchValue();
    }, []);

    return <div className="container">
        <header className="header">
            <h2>{name}</h2>
            <p>Description: {value.description}</p>
            <p>Importance: {value.importance}</p>
        </header>

        <h3 style={{ textAlign: "center" }}>Activities</h3>
        <ul className="card-grid">
            {
                activities.map((activity) => {
                    return <li className="card">
                        <Link to="/activities">
                            <h4>{activity.name}</h4>  
                            <div style={{fontWeight: 100, display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <span>{activity.duration} minutes</span>
                                {activity.createdAt &&
                                    <span>{new Date(activity.createdAt).toString()}</span>
                                }                                
                            </div>                          
                        </Link>
                    </li>
                })
            }
        </ul>
        <div style={{ textAlign: "center" }}>
            <button className="btn btn-delete" onClick={deleteValue}>Delete Value</button>
        </div>
    </div>
}