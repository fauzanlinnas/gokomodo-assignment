import axios from 'axios'

const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}

const jsonToFormData = data => {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

let accessToken;
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken')
}

const myAxios = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})

export const requests = {
  get: (url) => {
    return myAxios.get(url)
  },
  post: (url, data, isHaveFile = false) => {
    let formData;
    if (isHaveFile) {
      formData = jsonToFormData(data);
    } else {
      formData = data
    }

    return myAxios.post(url, formData)
  }
}

export default myAxios
