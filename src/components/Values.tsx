import React, { useState, useEffect } from 'react';

interface Value {
    _id: string;
    name: string;
    description: string;
    importance: number;
}

export default function Values() {
    const [values, setValues] = useState<Value[]>([]);
    const fetchValues = () => {
        fetch("http://localhost:7000/api/values")
        .then(response => response.json())
        .then(data => setValues([...data]));
    }
    useEffect(() => {
        fetchValues();
    }, [])
    return <>
        <h2>Your Values</h2>
        <ul>
        {
            values.map((value) => {
                return <li key={value._id}>{value.name}</li>
            })
        }
        </ul>
    </>
}