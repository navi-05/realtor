
export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dcbc879a96mshd3f8dbe552e4c45p1465fdjsn1265f315913c',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })
    return response.json()
}