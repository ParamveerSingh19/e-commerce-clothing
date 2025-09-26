// A central database for all products, organized by category.
const ALL_PRODUCTS = {
  men: [
    {
      id: 101,
      name: "Casual Men's Shirt",
      price: 4149.0,
      image: "/images/casual-mens-shirt.png",
    },
    {
      id: 102,
      name: "Men's Slim Fit Jeans",
      price: 5415.0, // Converted to INR
      image: "/images/mens-slim-fit-jeans.png",
    },
    {
      id: 103,
      name: "Men's Winter Jacket",
      price: 9149.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1605330369288-51f618a8039c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxjb3p5JTIwc3dlYXRlcnxlbnwwfHx8fDE2OTY2MjAzMTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 104,
      name: "Men's Polo Shirt",
      price: 2915.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHNlYXJjaHwxOHx8c2hpcnR8ZW58MHx8fHwxNjk2NjIwMzA1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 105,
      name: "Men's Sneakers",
      price: 6660.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxkcmVzc3xlbnwwfHx8fDE2OTY2MjAzMDR8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 106,
      name: "Men's Formal Trousers",
      price: 6245.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6d1cb838d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHNlYXJjaHwyMHx8Y2xvdGhpbmclMjBjb2xsZWN0aW9ufGVufDB8fHx8MTY5NjYyMDI2Nnww&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ],
  women: [
    {
      id: 201,
      name: "Elegant Evening Dress",
      price: 8329.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1594957640989-18ae45a49479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxkZW5pbSUyMGplYW5zfGVufDB8fHx8MTY5NjYyMDMxMHww&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 202,
      name: "Women's Summer Blouse",
      price: 3745.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHNlYXJjaHwxOHx8c2hpcnR8ZW58MHx8fHwxNjk2NjIwMzA1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 203,
      name: "Women's Leather Jacket",
      price: 12480.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1621379410191-45f8e58a2d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxmb3JtYWwlMjBibGF6ZXJ8ZW58MHx8fHwxNjk2NjIwMzA2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 204,
      name: "Floral Sundress",
      price: 5824.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1596707325257-89e49195a6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxzdW1tZXIlMjBzaG9ydHN8ZW58MHx8fHwxNjk2NjIwMzEzfDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 205,
      name: "High-Waisted Skirt",
      price: 4575.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1596707325257-89e49195a6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxzdW1tZXIlMjBzaG9ydHN8ZW58MHx8fHwxNjk2NjIwMzEzfDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 206,
      name: "Stiletto Heels",
      price: 9984.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxkcmVzc3xlbnwwfHx8fDE2OTY2MjAzMDR8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ],
  kids: [
    {
      id: 301,
      name: "Kids' Graphic T-Shirt",
      price: 1664.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxkcmVzc3xlbnwwfHx8fDE2OTY2MjAzMDR8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 302,
      name: "Children's Denim Jacket",
      price: 2915.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1594957640989-18ae45a49479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxkZW5pbSUyMGplYW5zfGVufDB8fHx8MTY5NjYyMDMxMHww&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 303,
      name: "Unisex Jogging Pants",
      price: 2080.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1605330369288-51f618a8039c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxjb3p5JTIwc3dlYXRlcnxlbnwwfHx8fDE2OTY2MjAzMTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 304,
      name: "Kids' Rain Boots",
      price: 2496.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1596707325257-89e49195a6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxzdW1tZXIlMjBzaG9ydHN8ZW58MHx8fHwxNjk2NjIwMzEzfDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 305,
      name: "Kids' Hoodie",
      price: 3328.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1621379410191-45f8e58a2d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHxmb3JtYWwlMjBibGF6ZXJ8ZW58MHx8fHwxNjk2NjIwMzA2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 306,
      name: "Toddler Sneakers",
      price: 2330.0, // Converted to INR
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDd8MHwxfHNlYXJjaHwxOHx8c2hpcnR8ZW58MHx8fHwxNjk2NjIwMzA1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ],
};
