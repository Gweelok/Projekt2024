import { createBrand } from "./Brands";
import { createCategory } from "./Categories";
import { createProduct } from "./Products";
import { createModel } from "./Models";
import { createItemSeedata } from "./Items";
import { getAllUptainers } from "./Uptainers";




/*********************************************************************************/
/***** Temporary Functions used to generate/move seed data to database *******/
/*********************************************************************************/
export async function createSeedData(moveSeedData=true,addRandomItems=true) {
    
    if(moveSeedData){
        // this is used to move SeedData to database
        console.log("Creating categories")
        const categoriesID = await Promise.all(categoriesSeedData.map((category) => {
            return createCategory(category.categoryName)
        }))
    
        console.log("Creating products");
        const productsId = await Promise.all(productsSeedData.map((product) => {
            return createProduct(product.productName, product.co2Footprint, categoriesID[product.categoryId - 1])
        }));
    
    
        console.log("Creating brands");
        const brandsId = await Promise.all(brandsSeedData.map((brand) => {
            return createBrand(brand.brandName)
        }));
    
    
        console.log("Creating models");
        const modelsId = await Promise.all(modelsSeedData.map((model) => {
            return createModel(model.modelName, brandsId[model.brandId - 1], productsId[model.productId - 1])
        }));
    }
    

    if(addRandomItems){
        // pick random item data
    const pick = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }



    console.log("Creating Random items");
    const itemsId = await Promise.all(Array.from({ length: 10 }, async () => {
        const model = pick(await getAllModels())
        const categoryId = (await getProductById(model.productId))?.categoryId
        const uptainerId = pick(await getAllUptainers()).uptainerId
        return createItemSeedata("Default.jpg", "", "As new", categoryId, model.productId, model.brandId, model.modelId, uptainerId);
    }))
    }


    console.log("Done creating data");
}