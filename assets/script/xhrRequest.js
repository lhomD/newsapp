//----------------------------------------------
/* XHR request */
export async function getData(arg) {
    try {
        let response = await axios.get(arg);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}