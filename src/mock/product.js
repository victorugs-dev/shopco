import { data } from '../../data.js'

// export const fetchProducts = async () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             // resolve(data)
//             resolve(https://api.escuelajs.co/api/v1/products)
//         },600)
//     })
// }


export const fetchProducts = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                
                if (!response.ok) {
                    throw new Error(`The response was not ok: ${response.status}`);
                }

                const products = await response.json();
                console.log("products",products)
                resolve(products);
            } catch (error) {
                console.error("Fetch failed, using local data instead:", error);
                resolve(data)
                console.log(data)
            }
        }, 500);
    });
};
