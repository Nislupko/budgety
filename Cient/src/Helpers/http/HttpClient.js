import superagent from "superagent";
import { httpApiPrefixPath } from "./ApiPaths";

export default function makeRequest(httpRequest) {
    const { method, path, params, data, files } = httpRequest;
    const fullPath = getFullPath('http://localhost:3001/api', path);
    const request = superagent[method](fullPath);

    if (params) {
        request.query(params);
    }

    if (files) {
        Object.keys(files || {}).forEach(key => {
            request.attach(key, files[key]);
        });

        Object.keys(data || {}).forEach(key => {
            request.field(key, data[key]);
        });
    } else {
        if (data) {
            request.send(data);
        }
    }

    return new HttpClient(request, httpRequest);
}

function getFullPath(prefix, path) {
    return withoutRightSlash(prefix) + "/" + withoutLeftSlash(path);
}

function withoutRightSlash(prefix) {
    if (prefix.slice(-1) === "/") return prefix.substr(0, prefix.length - 1);

    return prefix;
}

function withoutLeftSlash(suffix) {
    if (suffix[0] === "/") return suffix.substr(1);

    return suffix;
}

class HttpClient {
    constructor(request, options) {
        this.request = request;
        this.options = options;
    }

    send() {
        return new Promise((resolve, reject) => {
            this.request.end((err, { body } = {}) =>
                err ? reject(body || err) : resolve(body)
            );
        });
    }

    cancel() {
        this.request.abort();
    }

    onProgress(listener) {
        if (this.options.progressEvents) this.request.on("progress", listener);
    }

    offProgress(listener) {
        if (this.options.progressEvents) this.request.off("progress", listener);
    }
}
