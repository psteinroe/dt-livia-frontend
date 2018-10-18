const api = {
    methods: {
        fetchCatGif: async function () {
            let response = await fetch(
                'https://api.giphy.com/v1/gifs/random?api_key=nU03NUtfcI8A8Y8a5urHbWINQ9MR3ojt&tag=cat&rating=G',
                {
                    method: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    crossDomain: true,
                    mode: 'cors'
                }
            )
            let data = await response.json()
            return data.data.image_url
        }
    }
}

export {api}
