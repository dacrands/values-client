import IActivity from "../interfaces/IActivity";

const addActivity = async (activity: IActivity) => {
    await fetch("http://localhost:7000/api/activities", {
        method: "POST",            
        body: JSON.stringify(activity),
        headers: {
            'Content-Type': 'application/json'              
        },
    });       
}

export default addActivity;