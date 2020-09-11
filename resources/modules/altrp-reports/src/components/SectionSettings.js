import React from "react";
import { useSelector } from "react-redux";

import useColumnsSettings from "../hooks/useColumnsSettings";
import { sectionTypesList, sectionTypes } from "../helpers/sectionTypes";
import { isNumber } from "../helpers/number";

import SelectControl from "./painter/controls/SelectControl";
import SectionPainter from "./painter/SectionPainter";
import ColumnSettings from "./ColumnSettings";

const SectionSettings = () => {
  // Получаем index выбранной секции
  const selectedSectionIndex = useSelector((state) => state.sections.present.selectedSection);

  // Получаем данные выбранной секции
  const [sectionType, setSectionType] = useColumnsSettings("type", sectionTypes.PAGE_BODY);
  const [breakAfter, setBreakAfter] = useColumnsSettings("styles.breakAfter", "auto");

  if (!isNumber(selectedSectionIndex)) return <p>Выбрите секцию</p>;

  return (
    <>
      <ColumnSettings />
      <SelectControl
        name="Тип секции при печати"
        value={sectionType}
        onChange={setSectionType}
        list={sectionTypesList}
      />
      <SelectControl
        name="Разрыв страницы при печати"
        value={breakAfter}
        onChange={setBreakAfter}
        list={[
          { name: "Автоматически", value: "auto" },
          { name: "Разорвать страницу", value: "page" },
          { name: "Не разрывать страницу", value: "avoid" },
        ]}
      />
      <SectionPainter />
    </>
  );
};

export default React.memo(SectionSettings);
