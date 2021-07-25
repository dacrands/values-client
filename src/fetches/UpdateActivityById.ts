import IActivity from "../interfaces/IActivity";

const updateActivityById = async (id: string, activity: IActivity) => {
  await fetch(`http://localhost:7000/api/activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(activity),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default updateActivityById;
