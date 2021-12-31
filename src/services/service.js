const fetchService = async () => {
  const response = await fetch('http://some-service.com')
  const data = await response.json()

  return data
}

export default fetchService