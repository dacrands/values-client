import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IValue from "../interfaces/IValue";
import fetchValues from "../fetches/FetchValues";
import addValue from "../fetches/AddValue";

export default function Values() {
  const [values, setValues] = useState<IValue[]>([]);
  const [value, setValue] = useState<IValue>({
    name: "",
    description: "",
    importance: 0,
  });

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    await addValue(value);
    await fetchValues(setValues);
    setValue({
      name: "",
      description: "",
      importance: 0,
    });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchValues(setValues);
  }, []);

  return (
    <div className="container">
      <h2>Your Values</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form-item"
          type="text"
          placeholder="Name something you value..."
          name="name"
          value={value.name}
          onChange={onChange}
        />
        <input
          className="form-item"
          type="text"
          placeholder="Describe the value..."
          name="description"
          value={value.description}
          onChange={onChange}
        />
        <input
          className="form-item"
          type="number"
          name="importance"
          value={value.importance}
          onChange={onChange}
        />
        <span>On a 1-10 scale, how important is the value?</span>
        <button className="form-item btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <ul className="plain-list card-grid">
        {values.map((value) => {
          return (
            <li className="card" key={value._id}>
              <Link to={`values/${value._id}/${value.name}`}>{value.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
