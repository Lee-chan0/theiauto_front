import styled from "styled-components";

const ServiceWrapper = styled.section`
  width: 100%;
  margin-bottom : 40px;
`;

const ServiceInnerBox = styled.div`
  max-width: 1280px;
  margin : 0 auto;
  padding : 0 40px;
`;

const ServiceContentBox = styled.div`
  padding : 16px;
  background-color: ${({ theme }) => theme.neutral.gray0};
  border-radius: 4px;
`;

const ServiceHeaderDescrip = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color : ${({ theme }) => theme.primary.red700};

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ServiceNewsLists = styled.ul`
  margin-top : 16px;
  display : grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 180px);
  gap: 16px;
`;

const ServiceNewsItem = styled.li`
  width: 100%;
  height: 180px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    & > article {
      & > .news-text-box {
        h2 {
          text-decoration: underline;
        }
      }
    }
  }
  
  & > article {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & > img {
      height: 120px;
      object-fit: cover;
      width: 100%;
    }
  }
`;

const ServiceTextBox = styled.div`
  margin: 4px 8px;
  position: relative;
  height: 60px;

  position: relative;
  
  & > h2 {
    font-size: .9rem;
    line-height: 1.2;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > span {
    font-size: .8rem;
    color : ${({ theme }) => theme.neutral.gray300};
    position: absolute;
    right: 0; bottom : 0;
  }
`;


export { ServiceInnerBox, ServiceWrapper, ServiceHeaderDescrip, ServiceContentBox, ServiceNewsItem, ServiceNewsLists, ServiceTextBox };