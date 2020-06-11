import { createContext, useContext } from "react";

const initialData = [
  {
    id: "1",
    title: "Yucca",
    image:
      "https://i.pinimg.com/564x/fc/12/4b/fc124b9da4b20d092d30d79642afe196.jpg",
    price: 35,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "2",
    title: "Pachira",
    image:
      "https://i.pinimg.com/564x/8b/1c/92/8b1c929b21d60c5a2888610d52edbf7c.jpg",
    price: 74,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "3",
    title: "Sansevieria",
    image:
      "https://i.pinimg.com/564x/cd/7c/15/cd7c15b7f43f1ca8e8f9f93494ac5c6f.jpg",
    price: 145,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "4",
    title: "ZZ Plant",
    image:
      "https://i.pinimg.com/564x/e8/61/1c/e8611c0c878d62844ef0d236ddaec6ac.jpg",
    price: 57,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "5",
    title: "Calathea",
    image:
      "https://i.pinimg.com/564x/bb/b6/12/bbb612453bb17a5c5565b855f1355e57.jpg",
    price: 23,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "6",
    title: "Cast Iron",
    image:
      "https://i.pinimg.com/564x/90/26/66/902666ab55b31f2e71fb13aaabb08090.jpg",
    price: 47,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
];

export const ProductContext = createContext({
  products: initialData,
});

const useProducts = () => {
  const { products } = useContext(ProductContext);

  return { products };
};

export default useProducts;
