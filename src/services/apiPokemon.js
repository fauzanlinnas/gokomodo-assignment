import axios from 'axios'
import myAxios from './api'

const paginate = (limit = 20, p) => `limit=${limit}&offset=${p ? (p - 1) * limit : 0}`

export default {
  list: (url, limit, page) => {
    if (url) {
      return axios.get(url)
        .then(res => res.data)
    } else {
      let url = `/pokemon?${paginate(limit, page)}`

      return myAxios.get(url)
        .then(res => res.data)
    }
  },
  listWithDetail: ({ url }) => {
    return axios.get(url)
      .then(res => res.data)
  },
  detail: (id) => {
    let url = `/pokemon/${id}`

    return myAxios.get(url)
      .then(res => res.data)
  },
  species: (id) => {
    let url = `/pokemon-species/${id}`

    return myAxios.get(url)
      .then(res => res.data)
  },
  listCatched: ({ id }) => {
    let url = `/pokemon/${id}`

    return myAxios.get(url)
      .then(res => res.data)
  }
}
