import IValue from "../interfaces/IValue";

type ValuesStateCallback = {
    (values: IValue[]): void;    
}

const fetchValues = async (fn: ValuesStateCallback) => {
    await fetch("http://localhost:7000/api/values")
    .then(response => response.json())
    .then(data => fn([...data]));
}

export default fetchValues;