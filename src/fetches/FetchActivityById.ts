import IActivity from "../interfaces/IActivity";

type ActivityStateCallback = {
  (activity: IActivity): void;
};

const fetchActivityById = async (id: string, fn: ActivityStateCallback) => {
  await fetch(`http://localhost:7000/api/activities/${id}`)
    .then((response) => response.json())
    .then((data) => {
      fn({
        _id: data.id,
        name: data.name,
        duration: data.duration,
        time: data.time,
        value: data.value,
        createdAt: data.createdAt,
      });
    });
};

export default fetchActivityById;
