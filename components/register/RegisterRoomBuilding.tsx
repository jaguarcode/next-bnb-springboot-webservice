import React, { useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import palette from "../../styles/palette";
import Selector from "../common/selector/Selector";
import { registerRoomActions } from "../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );

  const buildingType = useSelector((state) => state.registerRoom.buildingType);

  const dispatch = useDispatch();

  //* 건물유형 변경하기 Dispatch
  const setBuildingTypeDispatch = (selected: string) =>
    dispatch(registerRoomActions.setBuildingType(selected));

  //* 건물 유형 options
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트": {
        const { apartmentBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(apartmentBuildingTypeList[0]);
        return apartmentBuildingTypeList;
      }
      case "주택": {
        const { houstBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(houstBuildingTypeList[0]);
        return houstBuildingTypeList;
      }
      case "별채": {
        const {
          secondaryUnitBuildingTypeList,
        } = require("../../lib/staticData");
        setBuildingTypeDispatch(secondaryUnitBuildingTypeList[0]);

        return secondaryUnitBuildingTypeList;
      }
      case "독특한 숙소": {
        const { uniqueSpaceBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(uniqueSpaceBuildingTypeList[0]);

        return uniqueSpaceBuildingTypeList;
      }
      case "B&B": {
        const { bnbBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(bnbBuildingTypeList[0]);

        return bnbBuildingTypeList;
      }
      case "부티크호텔": {
        const {
          boutiquesHotelBuildingTypeList,
        } = require("../../lib/staticData");

        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || "하나를 선택해주세요."}
          onChange={(e) =>
            dispatch(registerRoomActions.setLargeBuildingType(e.target.value))
          }
          isValid={!!largeBuildingType}
          label="우선 범위를 좁혀볼까요?"
          disabledOptions={["하나를 선택해주세요."]}
          options={[
            "하나를 선택해주세요.",
            "아파트",
            "주택",
            "별채",
            "독특한 숙소",
            "B&B",
            "부티크호텔",
          ]}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || ""}
          disabled={!largeBuildingType}
          onChange={(e) => setBuildingTypeDispatch(e.target.value)}
          isValid={!!buildingType}
          label="건물 유형을 선택하세요."
          options={detailBuildingOptions}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
