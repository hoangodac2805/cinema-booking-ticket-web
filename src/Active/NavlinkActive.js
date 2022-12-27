export const handleActive = () => {
  return ({ isActive }) =>
    isActive ? "text-light font-bold" : "";
};
