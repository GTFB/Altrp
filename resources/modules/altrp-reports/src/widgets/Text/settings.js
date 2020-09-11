import React from "react";
import useWidgetSettings from "../../hooks/useWidgetSettings";
import SelectControl from "../../components/painter/controls/SelectControl";
import RangeControl from "../../components/painter/controls/RangeControl";

const TextSettings = () => {
  const [wordBreak, setWordBreak] = useWidgetSettings("styles.wordBreak", "normal");
  const [textTransform, setTextTransform] = useWidgetSettings("styles.textTransform", "none");
  const [fitContent, setFitContent] = useWidgetSettings("styles.width", "100%");
  const [lineHeight, setLineHeight] = useWidgetSettings("styles.lineHeight", "1.5rem");
  const [letterSpacing, setLetterSpacing] = useWidgetSettings("styles.letterSpacing", "0rem");

  return (
    <div className="my-3">
      <RangeControl
        name="Межстрочный интервал"
        value={lineHeight}
        onChange={setLineHeight}
        options={{ min: 1.0, max: 2.5, step: 0.1, appendix: "rem" }}
      />
      <RangeControl
        name="Межбуквенный интервал"
        value={letterSpacing}
        onChange={setLetterSpacing}
        options={{ min: 0.0, max: 0.25, step: 0.01, appendix: "rem" }}
      />
      <SelectControl
        name="Регистр текста"
        value={textTransform}
        onChange={setTextTransform}
        list={[
          {
            name: "По-умолчанию",
            value: "none",
          },
          {
            name: "Все символы строчные",
            value: "lowercase",
          },
          {
            name: "Все символы заглавные",
            value: "uppercase",
          },
        ]}
      />
      <SelectControl
        name="Ширина текстового контейнера"
        value={fitContent}
        onChange={setFitContent}
        list={[
          { name: "На всю ширину секции", value: "100%" },
          { name: "Под ширину контента", value: "fit-content" },
        ]}
      />
      <SelectControl
        name="Перенос строк"
        value={wordBreak}
        onChange={setWordBreak}
        list={[
          { name: "По-умолчанию", value: "normal" },
          { name: "Автоматический перенос", value: "break-all" },
          { name: "Не переносить", value: "keep-all" },
        ]}
      />
    </div>
  );
};

export default TextSettings;
