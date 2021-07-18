import React, { useState, useEffect } from 'react';
import IActivity from '../interfaces/IActivity';
import IValue from '../interfaces/IValue';
import fetchValues from '../fetches/FetchValues';
import fetchActivities from '../fetches/FetchActivities';
import addActivity from '../fetches/AddActivity';
import ActivityListItem from './ActivityListItem';

export default function Activities() {
    const [values, setValues] = useState<IValue[]>([]);
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [activity, setActivity] = useState<IActivity>({
        name: "",
        duration: 0,
        value: ""
    });    

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        await addActivity(activity);
        await fetchValues(setValues);
        await fetchActivities(setActivities);
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
        fetchActivities(setActivities);
        fetchValues(setValues);
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
                        return <ActivityListItem activity={activity} />
                    })
                }
            </ul>
        </div>
    )
}

