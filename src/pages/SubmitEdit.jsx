import { redirect } from "react-router-dom";

export async function action({ request }) {
    //Check for PUT
    const method = request.method;
    const data = await request.formData();

    if (method === "PUT") {
        const rows = data.get("rowsState");
        console.log(rows);
    }

    return redirect("/edit");
}
