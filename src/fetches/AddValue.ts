import IValue from "../interfaces/IValue";

const addValue = async (value: IValue) => {
  await fetch("http://localhost:7000/api/values", {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default addValue;
