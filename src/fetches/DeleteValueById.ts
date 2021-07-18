type HistoryCallback = {
    push: (loc: string) => void
}

const deleteValueById = async (id: string, name: string, fn: HistoryCallback) => {
    if (!window.confirm(`Are yous sure you want to delete the value: ${name}`)) {
        return;
    };
    await fetch(`http://localhost:7000/api/values/${id}`, {
        method: "DELETE"
    })
    fn.push("/values");
}

export default deleteValueById;