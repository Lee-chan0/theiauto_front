import { useEffect, useState } from 'react';
import { NumberContainer, NumberBox, NumberAmountBtn, numberAmountVariants } from './PageNumber.style';
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useSideNavState } from '../../../../../../../Hooks/Context/SideNavStateContext';

function PageNumber({ totalPage, setSearchString, searchString }) {
  const [numValue, setNumvalue] = useState(1);
  const [movePage, setMovePage] = useState(false);
  const { needImportant } = useSideNavState();
  const category_id = searchString.get('category') || "none";
  const page = searchString.get('page') || 1;
  const query = searchString.get('query') || "";

  const handleChange = (e) => {
    const input = +e.target.value.replace(/[^0-9]/g, '');
    const clamped = Math.min(Math.max(input, 1), totalPage);
    setNumvalue(clamped);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setMovePage(false);
      setSearchString({ query: query, category: category_id, page: numValue, isImportant: needImportant });
    }
  }

  const handleClickArrow = (direction) => {
    const nextPage =
      direction === "right"
        ? Math.min(Number(page) + 1, totalPage)
        : Math.max(Number(page) - 1, 1);

    setSearchString({ query: query, category: category_id, page: nextPage, isImportant: needImportant });
    setMovePage(false);
  };

  const handleClickMoveBtn = () => {
    setMovePage(false);
    setSearchString({ query: query, category: category_id, page: numValue, isImportant: needImportant });
  }

  useEffect(() => {
    setNumvalue(1);
  }, [category_id]);

  useEffect(() => {
    if (+page === numValue) return;
    setNumvalue(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <NumberContainer>
      <NumberBox>
        <BsArrowLeftCircleFill onClick={() => handleClickArrow('left')} />
        <input type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={numValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setMovePage(true)}
        />
        <BsArrowRightCircleFill onClick={() => handleClickArrow('right')} />
      </NumberBox>
      <NumberAmountBtn
        initial="hidden"
        animate={movePage ? "visible" : "hidden"}
        variants={numberAmountVariants}
        $movePage={movePage}
        onClick={handleClickMoveBtn}
      >
        이동
        <BsArrowRightCircleFill size={11} />
      </NumberAmountBtn>
    </NumberContainer>
  );
}

export default PageNumber;
