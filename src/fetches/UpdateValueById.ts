import IValue from "../interfaces/IValue";

const updateValueById = async (id: string, value: IValue) => {
  await fetch(`http://localhost:7000/api/values/${id}`, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default updateValueById;
