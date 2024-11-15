# **Recipe Sharing Platform**

The **Recipe Sharing Platform** is a full-stack application that enables users to share, browse, and save recipes with ease. The frontend, built with **React.js** and **Vite**, provides an intuitive user interface. The backend, developed with **Node.js** and **Express**, connects to a **PostgreSQL** database hosted on **NeonDB** for data management, while **Cloudinary** handles image storage for recipes. This setup ensures a seamless and efficient experience for users.

---

## **Table of Contents**

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Cloudinary Image Upload Logic](#cloudinary-image-upload-logic)
5. [Factory Pattern Implementation](#factory-pattern-implementation)
6. [API Endpoints Overview](#api-endpoints-overview)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)

---

## **Features**

- **Recipe CRUD**: Users can create, read, update, and delete recipes.
- **Favorite Recipes**: Users can save recipes to their favorites.
- **Image Upload**: Cloudinary integration for image storage.
- **Factory Pattern**: Backend pattern for managing different recipe content types.
- **Frontend SPA**: Fast and responsive single-page application built with React and Vite.

---

## **Technologies Used**

### **Backend**
- Node.js v20
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL v16 (NeonDB)
- Cloudinary (for image uploads)
- CORS (for cross-origin requests)

### **Frontend**
- React.js with Vite
- TypeScript
- React Router (client-side routing)
- Radix UI (for UI components)
- SWR (for data fetching)
- Tailwind CSS

---

## **Setup Instructions**

### **Backend Setup**

1. Clone the repository:
   git clone https://github.com/elsatafilajj/recipe-sharing-platform.git


## **Setup Environment Variables**

Create a .env file in the backend folder with the following variables:
- CLOUD_NAME=your_cloud_name
- API_KEY=your_api_key
- API_SECRET=your_api_secret
- DATABASE_URL=your_database_connection_string
- PORT=5000


## **Run the Server**
- npx ts-node src/index.ts
- The backend will be running at http://localhost:5000.


## **Frontend Setup**

- cd ../frontend
- npm install
- npm run dev

- The frontend will be running at http://localhost:5173.

## **Cloudinary Image Upload Logic**

- **Setup Cloudinary**

```typescript
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
}); 
```

## **Upload Image Function**

The `uploadImage` function uploads images to Cloudinary and returns the image URL.

```typescript
const uploadImage = async (filePath: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
  });
};
```

*Using Image URLs*

- The URLs returned from Cloudinary are stored in the database and linked to recipes.

## **Factory Pattern Implementation**

- The Factory Pattern is implemented in the backend to handle different types of recipe content (text-only or with images).

- Recipe Content Factory

```typescript
interface RecipeContent {
createRecipeContent(): string;
}

class TextOnlyRecipe implements RecipeContent {
createRecipeContent() {
    return 'This is a text-only recipe.';
  }
}

 class RecipeWithImage implements RecipeContent {
  createRecipeContent() {
    return 'This recipe includes an image.';
  }
}

 class RecipeFactory {
  static createRecipe(type: string): RecipeContent {
   if (type === 'text') return new TextOnlyRecipe();
    else if (type === 'image') return new RecipeWithImage();
    else throw new Error('Invalid recipe type');
  }
}
```

## **API Endpoints Overview**

## *Recipe Management*

- Create Recipe: **POST** /recipes  
  Requires title, content, type, and userId. Optionally accepts image (file) or imageUrl.  
  Supports image uploads to Cloudinary and saves the recipe data in the database.  

- Fetch All Recipes: **GET**/recipes  
  Accepts query parameters like title, type, and difficulty to filter results.  

- Fetch Recipe by ID: **GET** /recipes/:id  
  Retrieves a single recipe by its id.  

## *Favorites Management*

- Add Favorite: **POST** /:id/favorite  
  Adds a recipe to the user's favorites list.
- Remove Favorite: **DELETE** /:id/favorite  
  Removes a recipe from the user's favorites list.

## *User Management*

- Fetch All Users: **GET** /users  
  Fetches a list of all users with their id, name, and email.
  

## *Bulk Image Upload*
Upload Images from Folder: Automated function
Uploads all images from a local folder to Cloudinary.


## **Screenshots**

*Home Page*
<img width="943" alt="{AA7EF33E-9B5F-49D2-BF63-102F1ED8DA85}" src="https://github.com/user-attachments/assets/b930cb43-3832-42c6-8006-6eb14addde94">


*Recipes Page*
<img width="942" alt="{56497FF8-AF25-4C37-8017-A0235EBBEB3F}" src="https://github.com/user-attachments/assets/206ec6d5-b103-4221-b4dc-a30c144b3921">
<img width="954" alt="{D46D54A5-2289-4FBB-955D-0650D00410A5}" src="https://github.com/user-attachments/assets/273a233c-21d3-43d9-8ce0-3dea94464520">


*Favorites Page*
<img width="946" alt="{27715411-3C5A-420B-8D8E-DE1595D996F8}" src="https://github.com/user-attachments/assets/1982af4c-c148-4344-a696-84fbe0c5d3b1">

*AboutUs Page*
<img width="947" alt="{F24CCB9C-0F9B-430B-B73B-DB5E5EDE4B87}" src="https://github.com/user-attachments/assets/22620311-c101-45a4-8fa2-371a5575d6af">

*ShareRecipe Page*
<img width="945" alt="{3B5A101F-F864-4714-9222-645A4EF13C1C}" src="https://github.com/user-attachments/assets/a2438b55-2681-4cd8-87cb-61efce8fb9ca">


## **Contributing**




