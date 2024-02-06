export const filterProducts = async (allProducts, search, itemsByProductIds, allUptainers) =>{
    const products = await allProducts.filter(p => {
        const itemProduct = itemsByProductIds[p.productId]
        const itemUptainer = allUptainers[itemProduct?.itemUptainer]
        console.log(itemProduct)
        return p.productName.toLowerCase().includes(search.toLowerCase()) && !!itemProduct && !! itemUptainer
    })
    return products;
}