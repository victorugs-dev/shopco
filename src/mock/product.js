// import { data } from '../../data'
import { data } from '../../data.js'

export const fetchProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        },600)
    })
}