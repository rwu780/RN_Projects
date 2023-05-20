
const BASE_URL = "https://dog.ceo/api";

const http = {
    get(url, params?) {
        if (params) {
            let paramsArray = []
            Object.keys(params).forEach(
                key => paramsArray.push(key + '=' + params[key])
            )
        }
        return new Promise(function (resolve, reject) {
            fetch(BASE_URL + url)
            .then(
                response => response.json()
            )
            .then(
                (data) => {
                    if (data.status === 'success'){
                        resolve(data.message)
                    } else {
                        throw new Error('Bad API')
                    }
                    
                }
            )
            .catch(
                (error) => {
                    console.log('Error: ' + error)
                    reject(error)
                }
            )
        })
    }
}

export default http;

