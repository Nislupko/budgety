import makeRequest from "./HttpClient";
import extractHttpResponse from "./extractHttpResponse";

export default async function(requestOptions) {
    try {
        const request = makeRequest(requestOptions);
        const response = await request.send();

        return await extractHttpResponse(response);
    } catch (error) {
        console.error("Server error", error);
        throw error;
    }
}
