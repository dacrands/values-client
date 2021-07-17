import React, { useState, useEffect } from 'react';
import IActivity from '../interfaces/IActivity';
import IValue from '../interfaces/IValue';

export default function Activities() {
    const [values, setValues] = useState<IValue[]>([]);
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [activity, setActivity] = useState<IActivity>({
        name: "",
        duration: 0,
        value: ""
    });
    const fetchActivities = async () => {
        await fetch("http://localhost:7000/api/activities")
            .then(response => response.json())
            .then(data => setActivities([...data]));
    }
    const fetchValues = async () => {
        await fetch("http://localhost:7000/api/values")
        .then(response => response.json())
        .then(data => setValues([...data]));
    }
    const addActivity = async (activity: IActivity) => {
        await fetch("http://localhost:7000/api/activities", {
            method: "POST",            
            body: JSON.stringify(activity),
            headers: {
                'Content-Type': 'application/json'              
            },
        });       
    }
    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        await addActivity(activity);
        await fetchValues();
        await fetchActivities();
        setActivity({
            name: "",
            duration: 0,
            value: ""
        });
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        const { name, value } = e.target;
        setActivity(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {        
        const { name, value } = e.target;
        setActivity(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    useEffect(() => {
        fetchActivities();
        fetchValues();
    }, [])
    return (
        <div className="container">
            <h2>Acitivities</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form-item" type="text" placeholder="Name your activity..." value={activity.name} name="name" onChange={onChange} />
                <input className="form-item" type="number" name="duration" value={activity.duration} onChange={onChange} />
                <span>How many minutes did you spend on this activity?</span>
                <select className="form-item" name="value" value={activity.value} onChange={onSelectChange}>                
                {
                    values.map(value => {
                        return <option key={value._id} value={value._id}>
                            {value.name}
                        </option>
                    })
                }
                </select>
                <button className="form-item btn btn-primary" type="submit">Submit</button>
            </form>
            <ul className="plain-list card-grid">
                {
                    activities.map((activity) => {
                        return <li className="card" key={activity._id}>
                            <h4>{activity.name}</h4>  
                            <div style={{fontWeight: 100, display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <span>{activity.duration} minutes</span>
                                {activity.createdAt &&
                                    <span>{new Date(activity.createdAt).toString()}</span>
                                }                                
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

