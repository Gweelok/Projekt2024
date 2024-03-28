# Backend and Database
## How to Use Backend + Firebase Functions in React Native

Welcome to the guide on effectively using Firebase functions in your React Native app. Below, you'll find a comprehensive list of functions available in the repository, along with examples of how to use them. Let's dive in!

## Async Operations

Firebase operations are asynchronous. Handle async operations properly using `async/await` or `.then()` as shown in the examples above. Ensure you handle errors that might occur during these operations.



# Firebase:
## Diagram Firebase

In this diagram you can see the name of the objects in the database and the name of all the fields.
![Diagram for working with Realtime Database](https://github.com/ekmakeitgoodagain/updropp/blob/igor_BE_Refactor_17_update_documentation/src/utils/firebaseDiagram.png)



# Backend:
For a comprehensive overview of backend properties and functions, you can refer to the [Properties and Functions Overview (Excel)](BE%20Properties+Functions%20Usage.xlsx)

If you're looking for examples on how to use the backend functionalities, please continue reading the README below.

### Users

#### Fields

In this table you can see the User's fields, their description and example.

|Property Name	|Description         |	Example           |
|---------------|--------------------|--------------------|
|id	|User ID	|MUXUjdB45UhnUcsSVA0DY9RjB172|
|uuid	|User ID	|MUXUjdB45UhnUcsSVA0DY9RjB172|
|email	|Email of the user	|admin@updroppp.dk|
|isAdmin (optional)	|Admin status of the user	|FALSE / TRUE|


#### Functions for users

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the Repo
import {
  // ... (all imports)
} from './Repo/Auth';
```

|Function	|Description	|Properties/Params|
|---------------|--------------------|--------------------|
|signInUser	|Sign in user with email and password.	|email (string), password (string)|
|createUser	|Create a new user.	|email (string), password (string)|
|getCurrentUser	|Get the current signed-in user.	||
|updateUserData	|Update user data (name, email, phone, profilePic, password).	|userData (Object): {name (string), email (string), phone (string), profilePic (string), password (string)}|
|deleteUser	|Delete user account.	||
|authErrors	|Handle authentication errors.	|error (Object)|

### Categories

#### Fields

In this table you can see the Category's fields, their description and example.

|Property Name	|Description         |	Example           |
|---------------|--------------------|--------------------|
|categoryId	    |ID of the category	 |-Ns8BNWimYiKn63MADrt|
|categoryName	  |Name of the category|	Smartphones       |

#### Functions for categories

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the Repo
import {
  // ... (all imports)
} from './Repo/Categories';
```

|Function	|Description	|Properties/Params|
|---------------|--------------------|--------------------|
|getAllCategories	|Retrieves all categories from the database.||	
|getCategoryById	|Retrieves a specific category by its ID.	|categoryId (string)|
|createCategory	|Creates a new category in the database.	|name (string)|
|updateCategoryById	|Updates a category by its ID.|categoryId (string), newData (object)|
|deleteCategoryById	|Deletes a category by its ID from the database.	|categoryId (string)|

### Brands

#### Fields

In this table you can see the Brand's fields, their description and example.

|Property Name	|Description         |	Example           |
|---------------|--------------------|--------------------|
|brandId	      |ID of the brand	   |-Ns8BNZCF2b5FNv1l_Iz|
|brandName	    |Name of the brand	 |Acer                |


#### Functions for brands

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the Repo
import {
  // ... (all imports)
} from './Repo/Brands';
```

|Function	|Description	|Properties/Params|
|---------------|--------------------|--------------------|
|createBrand	|Creates a new brand in the database.	|name (string)|
|getAllBrands	|Retrieves all brands from the database.||	
|getBrandById	|Retrieves a specific brand by its ID.	|brandId (string)|
|updateBrandById	|Updates a brand by its ID.	brandId |(string), newData (object)|
|deleteBrandById	|Deletes a brand by its ID from the database.	|brandId (string)|

### Models

#### Fields

In this table you can see the Model's fields, their description and example.

|Property Name	|Description         |	Example           |
|---------------|--------------------|--------------------|
|brandId	|ID of the brand associated with the model	|-Ns8BNZGmomONXv2gCb8|
|modelId	|ID of the model	|-Ns8BNaXCMZe91nlC9t5|
|modelName	|Name of the model	|iPhone (1st Generation)|
|productId	|ID of the product associated with the model|	-Ns8BNXRqpUAuuXl_0nq|

#### Functions for models

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the Repo
import {
  // ... (all imports)
} from './Repo/Models';
```

|Function	|Description	|Properties/Params|
|---------------|--------------------|--------------------|
|getAllModels	|Retrieves all models from the database.	||
|getModelById	|Retrieves a specific model by its ID.	|modelId (string)|
|createModel	|Creates a new model in the database.	|name (string), brandId (string), productId (string)|
|updateModelById	|Updates a model by its ID.	|modelId (string), newData (object)|
|deleteModelById	|Deletes a model by its ID from the database.	|modelId (string)|

### Uptainers

#### Fields

In this table you can see the Uptainer's fields, their description and example.

|Property Name	|Description         |	Example           |
|---------------|--------------------|--------------------|
|uptainerCity	|City of the uptainer	|Frederiksberg|
|uptainerDescription	|Description of the uptainer	|I nærheden af Det Bæredygtige Forsamlingshus|
|uptainerId	|ID of the uptainer	|-NbzQlf95xoexGIlcIpX|
|uptainerImage	|Image of the uptainer	|Uptainers/UPT1.jpg|
|uptainerLatitude	|Latitude of the uptainer	|55,68602043|
|uptainerLongitude	|Longitude of the uptainer	|12,5196417|
|uptainerName	|Name of the uptainer	|Det Bæredygtige Forsamlingshus|
|uptainerQR	|QR code link of the uptainer	|https://www.makeitgood.com/uptainer1|
|uptainerStreet	|Street address of the uptainer	|Stockflethsvej 2|
|uptainerZip	|ZIP code of the uptainer	|2000|


#### Functions for uptainers

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the Repo
import {
  // ... (all imports)
} from './Repo/Uptainers';
```

|Function	|Description	|Properties/Params|
|---------------|--------------------|--------------------|
|getUptainersByLocation	|Retrieves uptainers at a specific location.	|location (string)|
|getUptainerById	|Retrieves uptainer data by ID.	|uptainerId (string)|
|getUptainerFromQR	|Retrieves the uptainer ID from a QR code.	|QRcode (string)|
|getAllUptainers	|Retrieves data for all uptainers.	||
|createUptainer	|Creates a new uptainer with provided details.	|name, street, zip, city, image, description, latitude, longitude, uptainerQR (all string/number)|
|updateUptainerById	|Updates details of an existing uptainer.	|uptainerId, newData (both string/object)|
|deleteUptainerById	|Deletes an uptainer by ID from the database.	|uptainerId (string)|
|QRCodeExists	|Checks if a QR code exists for any uptainer. Returns the uptainer ID if found, else returns "Draft".	|qrCode (string)|

### Items

#### Fields

In this table you can see the Item's fields, their description and example.

|Property Name	|Description         |	Example           |
|---------------|--------------------|--------------------|
|itemId	|ID of the item	|-Ns8Ud580YOQHIJ-hjBC|
|itemBrand (optional)	|ID of the brand associated with the item or empty string	|-Ns8BNZOlbbGmIo02AVD|
|itemCategory	|ID of the category associated with the item	|-Ns8BNXGrMY72yxMMrsR|
|itemModel (optional)	|ID of the model associated with the item or empty string	|-Ns8BOcsk63WMKgtnnZS|
|itemProduct	|ID of the product associated with the item	|-Ns8BNYMQX5s-nLymI_I|
|itemUptainer	|ID of the uptainer responsible for the item	|-NbzQlf95xoexGIlcIpY|
|itemUser	|ID of the user associated with the item	|1PPU3h4Q1HeCefTCHWdOfpLW5ja2|
|itemDescription	|Description of the item	||
|itemCondition	|Condition of the item	|As new|
|itemGivenDate	|Date the item was given	|2024-03-04T12:44:32.152Z|
|itemImage	|Image path of the item in firebase storage	|Items/Default.jpg|
|itemTaken	|ID of the user who took the item or can be false if item is not taken	|1Pa4m1zMb5TMH2PnH8xBIFBXX522/ false|
|itemTakenDate (optional)	|Date the item was taken or undefined if item is not taken	|2024-03-05T12:06:35.772Z|
|product (optional)	|Optional product information object can be undefined if itemProduct doesn't exist	|"{"categoryId": "-Ns8BNWimYiKn63MADrt", "co2Footprint": 100, "productId": "-Ns8BNXRqpUAuuXl_0nq", "productName": "Smartphones"}"|
|model (optional)	|Optional model information object can be undefined if itemModel doesn't exist	|"{"brandId": "-Ns8BNZGmomONXv2gCb8","modelId": "-Ns8BNaXCMZe91nlC9t5","modelName": "iPhone (1st Generation)", "productId": "-Ns8BNXRqpUAuuXl_0nq"}"|
|brand (optional)	|Optional brand information object can be undefined if itemBrand doesn't exist	|"{"brandId": "-Ns8BNZCF2b5FNv1l_Iz","brandName": "Acer"}"|
|category (optional)	|Optional category information object can be undefined if itemCategory doesn't exist	|"{"categoryId": "-Ns8BNWimYiKn63MADrt", "categoryName": "Smartphones"}"|

#### Functions for items

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the Repo
import {
  // ... (all imports)
} from './Repo/Items';
```

|Function	|Description	|Properties/Params|
|---------------|--------------------|--------------------|
|getItemsInUptainer	|Retrieves items in a specific uptainer, excluding some specified items.	|uptainerId (string), excludedItems (array) (optional)|
|getItemsDetails	|Retrieves details of items including product, brand, category, and model information (object) type, and caches images.	|items (array)|
|getAllItems	|Retrieves all items from the database.	||
|getItemById	|Retrieves a specific item by its ID.	|itemId (string)|
|getDraftFromUser	|Retrieves draft items from current user.	||
|getItemsFromUser	|Retrieves items from current user.	||
|getItemsByName	|Retrieves items based on a search text.	|searchText (string)|
|getSearchedItems	|Retrieves searched items based on a search text.	|searchText (string)|
|createItem	|Creates a new item in the database.	|itemImage (string), categoryId (string), itemproduct (string), brandId (string), itemModel (string), itemcondition (string), itemDescription (string), uptainerQRCode (string)|
|createItemDraft	|Creates a draft item in the database.	|productId (string), brandId (string), modelId (string), categoryId (string), itemImage (string), itemDescription (string), itemCondition (string)|
|createItemSeedata	|Creates an item with predefined data.	|itemImage (string), itemDescription (string), itemCondition (string), categoryId (string), productId (string), brandId (string), modelId (string), uptainerId (string)|
|updateItemById	|Updates an item by its ID, optionally updating its image.	|itemId (string), newData (object), newImage (object)|
|updateItemToTaken	|Updates an item to indicate it has been taken by a user.	|itemId (string)|
|deleteItemById	|Deletes an item by its ID from the database.	|itemId (string)|
