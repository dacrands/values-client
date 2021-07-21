type HistoryCallback = {
    push: (loc: string) => void
}

const deleteActivityById = async (id: string, name: string, fn: HistoryCallback) => {
    if (!window.confirm(`Are yous sure you want to delete the activity: ${name}`)) {
        return;
    };
    await fetch(`http://localhost:7000/api/activities/${id}`, {
        method: "DELETE"
    })
    fn.push("/activities");
}

export default deleteActivityById;