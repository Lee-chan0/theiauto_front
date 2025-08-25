import { useNavigate } from "react-router-dom";



export function useCategoryRedirect(articles) {
  const navigate = useNavigate();
  const categoryId = articles?.[0]?.category?.categoryId;

  const goToCategory = () => {
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    }
  };

  return { goToCategory };
};