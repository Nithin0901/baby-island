import React from "react";

const categories = [
  { name: "Dress", image: "/assets/dress.png" },
  { name: "Bed", image: "/assets/bed.png" },
  { name: "Toys", image: "/assets/toys.png" },
  { name: "Bathing Toys", image: "/assets/bathing-toys.png" },
  { name: "Diapers", image: "/assets/diapers.png" },
];

const subCategories = [
  { name: "New Born Hospital Essentials", image: "/assets/newborn-hospital.png" },
  { name: "Bedding Sets", image: "/assets/bedding-sets.png" },
  { name: "Baby Sleeping Beds", image: "/assets/baby-sleeping.png" },
  { name: "Baby Beds With Mosquito Net", image: "/assets/baby-bed-mosquito.png" },
  { name: "Born Baby Accessories", image: "/assets/baby-accessories.png" },
  { name: "Toys", image: "/assets/toys-round.png" },
  { name: "Baby Jewels", image: "/assets/baby-jewels.png" },
  { name: "Baby Bath Towel", image: "/assets/baby-bath-towel.png" },
];

const Categories = () => {
  return (
    <div className="w-full p-4">
      {/* Categories Section */}
      <h2 className="text-center text-lg font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-5 gap-4 justify-center items-center max-w-2xl mx-auto">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={category.image} alt={category.name} className="w-16 h-16 object-contain" />
            <p className="text-sm text-center">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Sub Categories Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-auto max-w-4xl">
        {subCategories.map((sub, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={sub.image}
              alt={sub.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <p className="text-sm text-center mt-2">{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
