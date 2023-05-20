import http from "./DogRequests";

function to(promise: Promise) {
    return promise
        .then(
            data => {
                return [null, data];
            }
        )
        .catch(
            error => {
                return [error, null];
            }
        )
}

const DogsApi = {
    async getAllBreeds() {
        const url = '/breeds/list/all'

        const [err, res] = await to(http.get(url))
        if (err) {
            return Object.assign(err, {
                status: '406',
                description: err.errMsg
            }, true);
        }
        return res;

    },

    async getRandomImage() {
        const url = '/breeds/image/random'

        const [err, res] = await to(http.get(url))
        if (err) {
            return Object.assign(err, {
                status: '406',
                description: err.errMsg
            }, true);
        }
        return res;
    },

    async getImageByBreed(breed: string, subBreed: string) {
        const url = (subBreed !== '') ? `/breed/${breed}/${subBreed}/images` : `/breed/${breed}/images`

        const [err, res] = await to(http.get(url))
        if (err) {
            return Object.assign(err, {
                status: '406',
                description: err.errMsg
            }, true);
        }
        return res;
    },
}

export default DogsApi;