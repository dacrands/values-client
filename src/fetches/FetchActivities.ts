import IActivity from "../interfaces/IActivity";

type ActivitiesStateCallback = {
    (activities: IActivity[]): void;    
}

const fetchActivities = async (fn: ActivitiesStateCallback) => {
    await fetch("http://localhost:7000/api/activities")
        .then(response => response.json())
        .then(data => fn([...data]));
}

export default fetchActivities;