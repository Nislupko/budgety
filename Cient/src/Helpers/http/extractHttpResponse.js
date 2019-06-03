export default function(response) {

    if (response.status === "success") return response.result;

    if (response.status === "error") {
        const error = new Error(response.message);
        error.code = response.code;
        error.details = response.details;
        return Promise.reject(error);
    }

    return Promise.reject(new Error("Broken http server response"));
}
