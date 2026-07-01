
### Hero
 <img src="https://github.com/mainishanhoon/AuctionItt/blob/master/public/preview/Hero.png" alt="Hero"/>

### Add Item Form
 <img src="https://github.com/mainishanhoon/AuctionItt/blob/master/public/preview/Add%20Item%20Form.png" alt="Add Item Form"/>

### Dashboard
 <img src="https://github.com/mainishanhoon/AuctionItt/blob/master/public/preview/Dashboard.png" alt="Dashboard"/>

### Graph
 <img src="https://github.com/mainishanhoon/AuctionItt/blob/master/public/preview/Graph.png" alt="Graph"/>

### Project Structure
 <img src="https://github.com/mainishanhoon/AuctionItt/blob/master/public/preview/Project%20Structure.png" alt="Project Structure"/>


# 🈸 AuctionItt

AuctionItt is a modern, high-performance web application built with Next.js designed to streamline the auction process. It offers a seamless, user-friendly platform for managing auction items, participating in bidding, and ensuring secure user authentication.

## 📽️ Project Walkthrough
I have created a video demonstration explaining the features and development process of **AuctionItt**. You can watch the full walkthrough on LinkedIn:

[**Watch the AuctionItt Demo**](https://www.linkedin.com/posts/mainishanhoon_i-was-often-unsure-about-what-project-to-ugcPost-7346636366224547841-Dx-R/)

## 🛠️ Tech Stack
The application is built using a modern technology stack to ensure performance, security, and scalability:

* **Framework**: [Next.js](https://nextjs.org/)
* **Authentication & Authorization**: [Auth.js](https://authjs.dev/)
* **Styling**: [shadcn/ui](https://ui.shadcn.com/)
* **ORM**: [Prisma](https://www.prisma.io/)
* **Form Handling**: [Conform](https://conform.guide/)
* **File & Image Storage**: [UploadThing](https://uploadthing.com/)

---

## 📜 API Documentation

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth` | Handle authentication requests using Auth.js. |
| `PUT` | `/api/edit` | Update existing item details. |
| `DELETE` | `/api/removeitem/{itemId}` | Remove a specific item by its unique ID. |
| `POST` | `/api/status` | Update or retrieve the current auction status of an item. |
| `POST` | `/api/uploadthing` | Handle file and image uploads. |


### 📡 Core Directories
* **`api/`**: Contains server-side API routes for handling backend operations:
    * Authentication logic (`auth/`)
    * Item management including editing, removal, and status updates (`edit/`, `removeitem/[itemId]/`, `status/`)
    * File uploads (`uploadthing/`)
* **`auth/`**: Manages user authentication flows including:
    * Sign-in processes (`signIn/`)
    * Onboarding routines (`onboarding/`)
    * Error handling (`error/`)
* **`home/`**: Handles the primary user-facing features:
    * **Dashboard**: Central hub for the user experience (`dashboard/`)
    * **Item Management**: Dedicated sections for adding new items, viewing specific items, managing personal listings, and reviewing past items (`addItem/`, `item/`, `myItems/`, `pastItems/`)
    * **Settings**: User preference configurations (`settings/`)


## 👨‍🏫 Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mainishanhoon/SoleMate.git
