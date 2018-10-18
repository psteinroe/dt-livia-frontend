const api = {
    methods: {
        fetchCatGif: async function () {
            let response = await fetch(
                'https://api.giphy.com/v1/gifs/random?api_key=gtENIKwn3Mm9uN4JOIlU8CHaV80XwfhN&tag=cat&rating=G',
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
