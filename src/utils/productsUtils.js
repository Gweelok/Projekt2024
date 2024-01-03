export const filterProducts = async (allProducts, search) =>{
    const products = await allProducts.filter(p => p.productName.toLowerCase().includes(search.toLowerCase()))
    return products;
}