import IActivity from "../interfaces/IActivity";
import IValue from "../interfaces/IValue";

type ActivitiesStateCallback = {
  (activities: IActivity[]): void;
};

type ValueStateCallback = {
  (value: IValue): void;
};

const fetchValueById = async (
  id: string,
  valueFn: ValueStateCallback,
  activitiesFn: ActivitiesStateCallback
) => {
  await fetch(`http://localhost:7000/api/values/${id}`)
    .then((response) => response.json())
    .then((data) => {
      valueFn({
        name: data.name,
        description: data.description,
        importance: data.importance,
      });
      activitiesFn([...data.activities]);
    });
};

export default fetchValueById;
