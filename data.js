export const data = [
  {
    id: 0,
    title: "T-shirt with Tape Details",
    slug: "t-shirt-with-tape-details",
    category: "shirt",
    price: 120,
    percentageDiscount: null,
    description: "This is a T-shirtk with Tape Details",
    colors: ["black"],
    sizes: ["small", "medium", "large", "x-large"],
    images: [
      "/images/t-shirts/t-shirt-with-tape-details/t-shirt-with-tape-details.png",
    ],
    rating: 4.5,
    inStock: false,
    createdAt: "2024-09-15T10:20:00Z",
  },
  {
      id: 1,
      title: "Skinny Fit Jeans",
      slug: "skinny-fit-jeans",
      category: "jeans",
      price: 240,
      percentageDiscount: 20,
      description: "This is a Skinny Fit Jeans",
      colors: ["green", "red", "light-blue"],
      sizes: [ "medium", "x-large"],
      images: ["/images/jeans/skinny-fit-jeans.png"],
      rating: 3.5,
      inStock: true,
      createdAt: "2024-11-02T14:30:00Z",
  },
  {
    id: 2,
    title: "Checkered Shirt",
    slug: "checkered-shirt",
    category: "shirt",
    price: 180,
    percentageDiscount: null,
    description: "This is a Checkered Shirt",
    // colors: ["green", "red", "blue"],
    colors: ["green", "red", "light-blue"],
    // sizes: ["small", "medium", "large", "x-large"],
    sizes: ["small", "medium", "large", "x-large","xx-large"],
    images: ["/images/shirts/checkered-shirt.png"],
    rating: 4.5,
    inStock: true,
    createdAt: "2024-08-05T08:00:00Z",
  },
  {
    id: 3,
    title: "Sleeve Stripped T-shirt",
    category: "tees",
    slug: "sleeve-stripped-t-shirt",
    category: "shirt",
    price: 130,
    percentageDiscount: 30,
    description: "This is a Sleeve Stripped T-shirt",
    colors: ["green", "red", "blue"],
    // sizes: ["small", "medium", "large", "x-large"],
    sizes: ["x-small", "medium", "large", "x-large", "xxx-large"],
    images: ["/images/t-shirts/sleeve-stripped-t-shirt.png"],
    rating: 3.5,
    inStock: true,
    createdAt: "2024-10-01T16:45:00Z",
  },
];

// structuring it for the fuse.js
[
  {
    "id": 0,
    
    "title": "shirt",
    "slug": "t-shirt-with-tape-details",
    "price": 120,
    "percentageDiscount": null,
    "description": "This is a T-shirt with Tape Details",
    "colors": [
      "green",
      "red",
      "blue"
    ],
    "sizes": [
      "small",
      "medium",
      "large",
      "x-large"
    ],
    "images": [
      "/images/t-shirts/t-shirt-with-tape-details/t-shirt-with-tape-details.png"
    ],
    "rating": 4.5
  },
  {
    "id": 1,
    "title": "Skinny Fit Jeans",
    
    "slug": "skinny-fit-jeans",
    "price": 240,
    "percentageDiscount": 20,
    "description": "This is a Skinny Fit Jeans",
    "colors": [
      "green",
      "red",
      "blue"
    ],
    "sizes": [
      "small",
      "medium",
      "large",
      "x-large"
    ],
    "images": [
      "/images/jeans/skinny-fit-jeans.png"
    ],
    "rating": 3.5
  },
  {
    "id": 2,
    "title": "Checkered Shirt",
    "slug": "checkered-shirt",
    "price": 180,
    "percentageDiscount": null,
    "description": "This is a Checkered Shirt",
    "colors": [
      "green",
      "red",
      "blue"
    ],
    "sizes": [
      "small",
      "medium",
      "large",
      "x-large"
    ],
    "images": [
      "/images/shirts/checkered-shirt.png"
    ],
    "rating": 4.5
  },
  {
    "id": 3,
    "title": "Sleeve Stripped T-shirt",
    "slug": "sleeve-stripped-t-shirt",
    "price": 130,
    "percentageDiscount": 30,
    "description": "This is a Sleeve Stripped T-shirt",
    "colors": [
      "green",
      "red",
      "blue"
    ],
    "sizes": [
      "small",
      "medium",
      "large",
      "x-large"
    ],
    "images": [
      "/images/t-shirts/sleeve-stripped-t-shirt.png"
    ],
    "rating": 3.5
  }
]





export const reviewsData = [
  {
    id:0,
    name: "Sarah M.",
    rating:5,
    comment:"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
  },
  {
    id:1,
    name: "Alex K.",
    rating:5,
    comment:"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
  },
  {
    id:2,
    name: "James L.",
    rating:5,
    comment:"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
  },
];


