import styled from "styled-components";
import ManagementHeader from "../AdminPage/AdminPageComponents/Common/Articlemanagement/Header/ManagementHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdvertisement, deleteAdvertisement, fetchAdvertisement, updateAdvertisement } from "../../../../API/advertisement.api";
import Swal from "sweetalert2";
import { formatDateOnly } from "../../../Hooks/Utils/formatDateOnly";

const allowedType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 25 * 1024 * 1024;

const ListLayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  gap : 16px;

  & > span {
    font-size: .9rem;
    font-weight: bold;
  }
`;

const AdMainContainer = styled.div`
  width: calc(100% - 240px);
  height: 100%;
  position : fixed;
  right : 0;
  top : 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: -1;

  & > .edit-box {
    display: flex;
    justify-content: center;
    margin : 16px;
    gap: 40px;

      & > .update-btn {
      border : none;
      cursor: pointer;
      font-weight: 500;
      padding : 4px 12px;
      background-color: ${({ theme }) => theme.neutral.gray900};
      color : ${({ theme }) => theme.neutral.gray100};
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.primary.red500};
      }
    }

    & > .delete-btn {
      border : none;
      cursor: pointer;
      font-weight: bold;
      padding : 4px 12px;
      background-color: red;
      color : ${({ theme }) => theme.neutral.gray100};
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.primary.red100};
      }
    }
  }

  & > .add-ad {
    border : none;
    cursor: pointer;
    font-weight: 500;
    padding : 4px 12px;
    float: right;
    background-color: ${({ theme }) => theme.neutral.gray900};
    color : ${({ theme }) => theme.neutral.gray100};
    border-radius: 4px;
    transition: background-color 0.3s;
    margin : 40px 0;
    margin-right: 16px;

    &:hover {
      background-color: ${({ theme }) => theme.primary.red500};
    }
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 40px;
  gap : 32px;
`;

const ContentLists = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;
  gap : 8px;
`;

const ContentItems = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0px 7px 1px rgba(0, 0, 0, .6);
    & > div {
      & > h1 {
        text-decoration: underline;
      }
    }
  }

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    bottom : 0; right : 0; left : 0; top : 0;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
  }

  & > img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  & > .ad-text-box {
    text-align: center;
    z-index: 2;
    color : ${({ theme }) => theme.neutral.gray0};
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding : 4px;

    & > h1 {
      font-size: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > span {
      font-size: .8rem;
    }
  }
`;

const AddContentBox = styled.div`
  width: 80%;
  border : 3px solid ${({ theme }) => theme.primary.red700};
  margin-top : 40px;
  padding : 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > .img-box {
    width: 100%;
    display: flex;
    justify-content: center;

      & > img {
        max-width: 50%;
        object-fit: contain;
      }
  }

  & > div {
    display: flex;
    gap : 16px;

    & > span {
      width: 120px;
      text-align: right;
      font-weight: bold;
    }

    & > input {
      flex : 1;
      font-size: .9rem;
      border-radius: 4px;
      border : 1px solid rgba(0, 0, 0, 0.5);
      outline: none;

      &:focus {
        border : 2px solid rgba(0, 0, 0, 0.5);
      }
    }

    & > textarea {
      flex : 1;
      border-radius: 4px;
      border : 1px solid rgba(0, 0, 0, 0.5);
      outline: none;

      &:focus {
        border : 2px solid rgba(0, 0, 0, 0.5);
      }
    }
  }

  & > .ad-location {
    & > .radio-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap : 4px;

        
      & > .select-list {

        & > span {
          margin-right: 4px;
          font-size: .85rem;
          font-weight: 500;
        }
      }
    }
  }

  & > .ad-active-control {

    & > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & > input {
        width: 16px;
        height: 16px;
      }
    }
    
  }
`;

const INITIAL_VALUES = {
  advertisementTitle: "",
  redirectUrl: "",
  isActive: true,
  adMemo: "",
  adLocation: "",
  advertisementImageUrl: null
}

function AdControl() {
  const navigate = useNavigate();
  const [queryString] = useSearchParams();
  const query = queryString.get('addAd') || "";
  const updateQuery = queryString.get('updateAd') || "";
  const advertisement_id = queryString.get('advertisementId') || "";
  const adLocations = [
    '페이지 최상단 중앙 (486 X 60)',
    '홈페이지 월간지 팝업 (광고 X)',
    '메인 배너 하단-1 (218 X 220)', '메인 배너 하단-2 (218 X 220)', '메인 배너 하단-3 (218 X 220)', '메인 배너 하단-4 (218 X 220)', '메인 배너 하단-5 (218 X 220)',
    '팝업 광고 (300 X 360)'
  ];
  const [previewImg, setPreviewImg] = useState(null);
  const queryClient = useQueryClient();
  const adCreateMutation = useMutation({
    mutationFn: createAdvertisement,
    onSuccess: () => {
      queryClient.invalidateQueries(['advertisement'])
    },
    onError: (e) => {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `${e.response?.data?.message}`,
        showConfirmButton: false,
        customClass: {
          popup: 'description-popup'
        }
      })
    }
  });
  const adUpdateMutation = useMutation({
    mutationFn: ({ formData, advertisement_id }) => updateAdvertisement(formData, advertisement_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['advertisement'])
    },
    onError: (e) => {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `${e.response?.data?.message}`,
        showConfirmButton: false,
        customClass: {
          popup: 'description-popup'
        }
      })
    }
  })
  const adDeleteMutation = useMutation({
    mutationFn: ({ advertisement_id }) => deleteAdvertisement(advertisement_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['advertisement'])
    },
    onError: (e) => {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `${e.response?.data?.message}`,
        showConfirmButton: false,
        customClass: {
          popup: 'description-popup'
        }
      })
    }
  })
  const { data: adArray } = useQuery({
    queryKey: ['advertisement'],
    queryFn: fetchAdvertisement
  });
  const adLists = useMemo(() => adArray?.adLists || [], [adArray]);
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleAddBtn = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== 'advertisementImageUrl') {
        formData.append(key, values[key]);
      }
    })

    if (query === 'true') {
      formData.append('file', values.advertisementImageUrl);

      adCreateMutation.mutate(formData, {
        onSuccess: () => {
          setValues(INITIAL_VALUES);
          navigate(`/theiautoCMS/adminpage/advertisement`);
          setPreviewImg(null);
        }
      })
    } else if (updateQuery === 'true') {
      if (values.advertisementImageUrl instanceof File) {
        formData.append('file', values.advertisementImageUrl);
      } else {
        formData.append('currentUrl', values.advertisementImageUrl);
      }

      adUpdateMutation.mutate({ formData: formData, advertisement_id: advertisement_id }, {
        onSuccess: () => {
          setValues(INITIAL_VALUES);
          navigate(`/theiautoCMS/adminpage/advertisement`);
          setPreviewImg(null);
        }
      })
    }
  }

  const HandleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: '정말 <span style="color: #e23b3f">삭제</span>하시겠습니까?',
      html: '삭제하면 <b>복구할 수 없습니다.</b>',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#e23b3f',
      showClass: {
        popup: ''
      },
      hideClass: {
        popup: ''
      },
      customClass: {
        popup: 'delete-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        adDeleteMutation.mutate({ advertisement_id: advertisement_id }, {
          onSuccess: () => {
            setPreviewImg(null);
            setValues(INITIAL_VALUES);
            navigate(`/theiautoCMS/adminpage/advertisement`, { replace: true })
          }
        })
      }
    })
  }

  const handleChange = (e, name) => {
    const value = e.target.value;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const handleChangeLocation = (name) => {

    setValues((prev) => ({
      ...prev,
      adLocation: name
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedType.includes(file.type)) {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `이미지 파일만 업로드 가능합니다.`,
        showConfirmButton: false,
        showClass: {
          popup: ''
        },
        hideClass: {
          popup: ''
        },
        customClass: {
          popup: 'description-popup'
        }
      });
      return;
    } else if (maxFileSize < file.size) {
      Swal.fire({
        toast: true,
        position: 'top',
        width: 'fit-content',
        icon: 'error',
        timer: 2000,
        title: `이미지 크기는 최대 25MB 입니다.`,
        showConfirmButton: false,
        showClass: {
          popup: ''
        },
        hideClass: {
          popup: ''
        },
        customClass: {
          popup: 'description-popup'
        }
      });
      return;
    }

    const blob = URL.createObjectURL(file);
    setPreviewImg(blob);

    setValues((prev) => ({
      ...prev,
      advertisementImageUrl: file
    }))
  }

  useEffect(() => {
    return () => {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    }
  }, [previewImg]);


  useEffect(() => {
    if (updateQuery === 'true' && advertisement_id) {
      const foundItem = adLists.find(
        (item) => +item.advertisementId === +advertisement_id
      );
      if (foundItem) {
        setValues({
          advertisementTitle: foundItem.advertisementTitle,
          redirectUrl: foundItem.redirectUrl,
          isActive: foundItem.isActive,
          adMemo: foundItem.adMemo,
          adLocation: foundItem.adLocation,
          advertisementImageUrl: foundItem.advertisementImageUrl,
        });
        setPreviewImg(foundItem.advertisementImageUrl);
      }
    }
  }, [adLists, advertisement_id, updateQuery]);

  useEffect(() => {
    if (query === 'true') {
      setValues(INITIAL_VALUES);
      setPreviewImg(null);
    }
  }, [query]);

  useEffect(() => {
    if (updateQuery !== 'true') {
      setValues(INITIAL_VALUES);
      setPreviewImg(null);
    }
  }, [updateQuery]);

  return (
    <AdMainContainer>
      <ManagementHeader isAd={true} />
      <ContentContainer>
        {
          query !== 'true' && updateQuery !== 'true' ?
            <ContentLayoutContainer>
              <ListLayoutBox>
                <span>페이지 최상단 중앙</span>
                <ContentLists>
                  {
                    adLists.length !== 0 &&
                    adLists.filter((item) => item.adLocation === '페이지 최상단 중앙 (486 X 60)').map((ad) => (
                      <ContentItems
                        key={ad.advertisementId}
                        onClick={() => navigate(`/theiautoCMS/adminpage/advertisement?updateAd=true&advertisementId=${ad.advertisementId}`)}
                      >
                        <img src={ad.advertisementImageUrl} alt={`ad-image${ad.advertisementId}`} />
                        <div className="ad-text-box">
                          <h1>{ad.advertisementTitle}</h1>
                          <span>{ad.adLocation}</span>
                          <span>상태 : <em style={{ fontWeight: 'bold' }}>{ad.isActive ? '활성화' : '비활성화'}</em></span>
                          <span>클릭 횟수 : <em style={{ fontWeight: 'bold' }}>{ad.clickCount}</em></span>
                          <span>{formatDateOnly(ad.createdAt)}</span>
                        </div>
                      </ContentItems>
                    ))
                  }
                </ContentLists>
              </ListLayoutBox>
              <ListLayoutBox>
                <span>메인 배너 하단</span>
                <ContentLists>
                  {
                    adLists.length !== 0 &&
                    adLists.filter((item) => item.adLocation.includes('메인 배너 하단')).map((ad) => (
                      <ContentItems
                        key={ad.advertisementId}
                        onClick={() => navigate(`/theiautoCMS/adminpage/advertisement?updateAd=true&advertisementId=${ad.advertisementId}`)}
                      >
                        <img src={ad.advertisementImageUrl} alt={`ad-image${ad.advertisementId}`} />
                        <div className="ad-text-box">
                          <h1>{ad.advertisementTitle}</h1>
                          <span>{ad.adLocation}</span>
                          <span>상태 : <em style={{ fontWeight: 'bold' }}>{ad.isActive ? '활성화' : '비활성화'}</em></span>
                          <span>클릭 횟수 : <em style={{ fontWeight: 'bold' }}>{ad.clickCount}</em></span>
                          <span>{formatDateOnly(ad.createdAt)}</span>
                        </div>
                      </ContentItems>
                    ))
                  }
                </ContentLists>
              </ListLayoutBox>
              <ListLayoutBox>
                <span>홈페이지 월간지 팝업 (광고 X)</span>
                <ContentLists>
                  {
                    adLists.length !== 0 &&
                    adLists.filter((item) => item.adLocation.includes('홈페이지 월간지 팝업')).map((ad) => (
                      <ContentItems
                        key={ad.advertisementId}
                        onClick={() => navigate(`/theiautoCMS/adminpage/advertisement?updateAd=true&advertisementId=${ad.advertisementId}`)}
                      >
                        <img src={ad.advertisementImageUrl} alt={`ad-image${ad.advertisementId}`} />
                        <div className="ad-text-box">
                          <h1>{ad.advertisementTitle}</h1>
                          <span>{ad.adLocation}</span>
                          <span>상태 : <em style={{ fontWeight: 'bold' }}>{ad.isActive ? '활성화' : '비활성화'}</em></span>
                          <span>클릭 횟수 : <em style={{ fontWeight: 'bold' }}>{ad.clickCount}</em></span>
                          <span>{formatDateOnly(ad.createdAt)}</span>
                        </div>
                      </ContentItems>
                    ))
                  }
                </ContentLists>
              </ListLayoutBox>
              <ListLayoutBox>
                <span>팝업 광고 (최대 3개)</span>
                <ContentLists>
                  {
                    adLists.length !== 0 &&
                    adLists.filter((item) => item.adLocation.includes('팝업 광고')).map((ad) => (
                      <ContentItems
                        key={ad.advertisementId}
                        onClick={() => navigate(`/theiautoCMS/adminpage/advertisement?updateAd=true&advertisementId=${ad.advertisementId}`)}
                      >
                        <img src={ad.advertisementImageUrl} alt={`ad-image${ad.advertisementId}`} />
                        <div className="ad-text-box">
                          <h1>{ad.advertisementTitle}</h1>
                          <span>{ad.adLocation}</span>
                          <span>상태 : <em style={{ fontWeight: 'bold' }}>{ad.isActive ? '활성화' : '비활성화'}</em></span>
                          <span>클릭 횟수 : <em style={{ fontWeight: 'bold' }}>{ad.clickCount}</em></span>
                          <span>{formatDateOnly(ad.createdAt)}</span>
                        </div>
                      </ContentItems>
                    ))
                  }
                </ContentLists>
              </ListLayoutBox>
            </ContentLayoutContainer>

            :
            <AddContentBox>
              <div className="ad-title">
                <span>광고 이름 <span style={{ color: 'red' }}>*</span></span>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "advertisementTitle")}
                  value={values.advertisementTitle}
                />
              </div>
              <div className="ad-location">
                <span>위치 <span style={{ color: 'red' }}>*</span></span>
                <div className="radio-container">
                  {
                    adLocations.map((item, i) => (
                      <div className="select-list" key={i}>
                        <span>{item}</span>
                        <input
                          type="radio"
                          name="select-item"
                          onChange={() => handleChangeLocation(item)}
                          checked={values.adLocation === item}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="ad-active-control">
                <span>활성화</span>
                <div>
                  <input type="checkbox" checked={values.isActive} onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      isActive: e.target.checked
                    }));
                  }} />
                </div>
              </div>
              <div className="ad-link">
                <span>URL 링크 <span style={{ color: 'red' }}>*</span></span>
                <input
                  type="url"
                  placeholder="ex) https://www.super-race.com/super_race/info_superrace.html"
                  onChange={(e) => handleChange(e, "redirectUrl")}
                  value={values.redirectUrl}
                />
              </div>
              <div className="ad-memo">
                <span>메모</span>
                <textarea
                  onChange={(e) => handleChange(e, "adMemo")}
                  value={values.adMemo}
                />
              </div>
              <div className="ad-image">
                <span>이미지 <span style={{ color: 'red' }}>*</span></span>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              {
                previewImg &&
                <div className="img-box">
                  <img src={previewImg} alt="preview-image" />
                </div>
              }

            </AddContentBox>
        }
      </ContentContainer>
      {
        query === 'true' ?
          <button className="add-ad" onClick={handleAddBtn}>등록하기</button>
          :
          updateQuery === 'true' ?
            <div className="edit-box">
              <button className="update-btn" onClick={handleAddBtn}>수정하기</button>
              <button className="delete-btn" onClick={HandleDelete}>삭제</button>
            </div>
            :
            <button className="add-ad" onClick={() => navigate(`/theiautoCMS/adminpage/advertisement?addAd=true`)}>추가</button>

      }
    </AdMainContainer>
  )
}

export default AdControl;