import React from "react";
import moment from "moment";

import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";
import DynamicPieChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPieChart";
import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";
import DynamicTableWidget from "../../../../../admin/src/components/dashboard/widgets/DynamicTableWidget";
import DynamicPointChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPointChart";

import {
  BAR,
  PIE,
  LINE,
  TABLE,
  POINT
} from "../../../../../admin/src/components/dashboard/widgetTypes";
import { getDataByPath } from "../../../../../front-app/src/js/helpers";

const AltrpDiagram = ({ settings }) => {
  const sql = settings.query?.dataSource?.value;
  const isMultiple = settings.isMultiple;
  const isCustomColor = settings.isCustomColors;
  const keyIsDate = settings.key_is_date;
  const sort = settings?.sort;
  const tickRotation = settings?.tickRotation;
  const bottomAxis = settings?.bottomAxis;
  const enableGridX = settings?.enableGridX;
  const enableGridY = settings?.enableGridY;
  //line settings
  const xScaleType = settings?.xScaleType || "point";
  const precision = settings?.precision || "month";
  const curve = settings?.curve || "line";
  const lineWidth = settings?.lineWidth;
  const colorScheme = settings?.colorScheme;
  const enableArea = settings?.enableArea;
  const enablePoints = settings?.enablePoints;
  const pointSize = settings?.pointSize;
  const pointColor = settings?.pointColor;
  //line marker Y
  const yMarker = settings?.yMarker;
  const yMarkerValue = settings?.yMarkerValue;
  const yMarkerOrientation = settings?.yMarkerOrientation;
  const yMarkerColor = settings?.yMarkerColor;
  const yMarkerWidth = settings?.yMarkerWidth;
  const yMarkerLabel = settings?.yMarkerLabel;
  const yMarkerLabelColor = settings?.yMarkerLabelColor;
  //line marker X
  const xMarker = settings?.xMarker;
  const xMarkerValue = keyIsDate
    ? moment(settings?.xMarkerValueDate).toDate()
    : settings?.xMarkerValue;
  const xMarkerOrientation = settings?.xMarkerOrientation;
  const xMarkerColor = settings?.xMarkerColor;
  const xMarkerWidth = settings?.xMarkerWidth;
  const xMarkerLabel = settings?.xMarkerLabel;
  const xMarkerLabelColor = settings?.xMarkerLabelColor;
  //bar
  const layout = settings?.layout;
  const groupMode = settings?.groupMode;
  const reverse = settings?.reverse;
  const borderRadius = settings?.borderRadius;
  const borderWidth = settings?.borderWidth;
  const enableLabel = settings?.enableLabel;
  const padding = settings?.padding;
  //pie
  const innerRadius = settings?.innerRadius;
  const enableSliceLabels = settings?.enableSliceLabels;
  const padAngle = settings?.padAngle;
  const cornerRadius = settings?.cornerRadius;
  const sortByValue = settings?.sortByValue;
  const enableRadialLabels = settings?.enableRadialLabels;
  //data variable
  let data = [];
  //funciton for formattion data for all types
  const formatData = (data, r) => {
    return data.map(d => {
      const currentKey = _.get(d, r.key);
      const keyFormatted = !moment(currentKey).isValid()
        ? currentKey
        : moment(currentKey).format("DD.MM.YYYY");
      switch (settings.type) {
        case LINE:
          return {
            y: Number(_.get(d, r.data)),
            x: keyIsDate ? keyFormatted : currentKey
          };
          break;
        case TABLE:
          return {
            y: Number(_.get(d, r.data)),
            x: keyIsDate ? keyFormatted : currentKey
          };
          break;
        case POINT:
          return {
            y: Number(_.get(d, r.data)),
            x: keyIsDate ? keyFormatted : currentKey
          };
          break;
        case BAR:
          let key = keyIsDate ? keyFormatted : currentKey;
          return {
            [key]: Number(_.get(d, r.data)),
            key: key,
            value: Number(_.get(d, r.data))
          };
          break;
        case PIE:
          return {
            value: Number(_.get(d, r.data)),
            id: keyIsDate ? keyFormatted : currentKey
          };
          break;

        default:
          break;
      }
    });
  };

  if (isMultiple) {
    let repeater = _.cloneDeep(settings.rep, []);
    data = repeater.map(r => {
      let innerData = getDataByPath(r.path, []);
      if (innerData.length > 0) {
        //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
        if (settings.type === LINE || settings.type === PIE) {
          innerData = _.uniqBy(innerData, r.key);
        }
        innerData = formatData(innerData, r);
      }
      if (settings.type === PIE || settings.type === BAR) {
        return innerData;
      }
      return {
        id: r.title || r.path,
        data: innerData
      };
    });
    if (settings.type === PIE || settings.type === BAR) {
      data = [].concat(...data);
    }
  } else if (settings.datasource_path != null) {
    try {
      data = getDataByPath(settings.datasource_path, []);

      if (settings.type === LINE) {
        data = _.uniqBy(data, settings.key_name);
      }
      const r = {
        key: settings.key_name,
        data: settings.data_name
      };

      if (settings.type === PIE || settings.type === BAR) {
        data = formatData(data, r);
      } else {
        data = [
          {
            id: settings.datasource_title || settings.datasource_path,
            data: formatData(data, r)
          }
        ];
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      data = [
        {
          id: settings.datasource_title || settings.datasource_path,
          data: []
        }
      ];
    }
  }

  if (isCustomColor) {
    let repeaterColor = _.cloneDeep(settings.repcolor, []);
    var colorArray = repeaterColor.map(r => r.color.colorPickedHex);
  }

  if (!sql && data.length === 0) {
    return (
      <div className={`altrp-chart ${settings.legendPosition}`}>
        Идет загрузка данных...
      </div>
    );
  }

  const parseQueryParams = (qs = "") => {
    if (!qs) return "";
    const keyValues = qs.split("\n");
    const result = keyValues.map(item => item.replace("|", "=")).join("&");
    return `?${result}`;
  };

  const queryString = parseQueryParams(settings.query?.defaultParams);

  const widget = {
    source: sql + queryString,
    options: {
      colorScheme: settings.colorScheme,
      legend: settings.legend,
      animated: settings.animated,
      isVertical: settings.isVertical
    },
    filter: {}
  };

  switch (settings.type) {
    case LINE:
      return (
        <DynamicLineChart
          widget={widget}
          dataSource={data}
          keyIsDate={keyIsDate}
          xScaleType={xScaleType}
          precision={precision}
          curve={curve}
          colorScheme={colorScheme}
          enableArea={enableArea}
          enablePoints={enablePoints}
          lineWidth={lineWidth}
          pointColor={pointColor}
          pointSize={pointSize}
          yMarker={yMarker}
          yMarkerValue={yMarkerValue}
          yMarkerOrientation={yMarkerOrientation}
          yMarkerColor={yMarkerColor}
          yMarkerWidth={yMarkerWidth}
          yMarkerLabel={yMarkerLabel}
          xMarker={xMarker}
          xMarkerValue={xMarkerValue}
          xMarkerOrientation={xMarkerOrientation}
          xMarkerColor={xMarkerColor}
          xMarkerWidth={xMarkerWidth}
          xMarkerLabel={xMarkerLabel}
          yMarkerLabelColor={yMarkerLabelColor}
          xMarkerLabelColor={xMarkerLabelColor}
          sort={sort}
          tickRotation={tickRotation}
          bottomAxis={bottomAxis}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
        />
      );
    case POINT:
      return (
        <DynamicPointChart
          dataSource={data}
          colorScheme={colorScheme}
          widget={widget}
          nodeSize={pointSize}
          xScaleType={xScaleType}
          precision={precision}
          sort={sort}
          tickRotation={tickRotation}
          bottomAxis={bottomAxis}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
        />
      );
    case BAR:
      return (
        <DynamicBarChart
          isMultiple={isMultiple}
          dataSource={data}
          widget={widget}
          enableLabel={enableLabel}
          width={settings.width?.size}
          layout={layout}
          groupMode={groupMode}
          reverse={reverse}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          padding={padding}
          sort={sort}
          tickRotation={tickRotation}
          bottomAxis={bottomAxis}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
        />
      );
    case PIE:
      return (
        <DynamicPieChart
          isMultiple={isMultiple}
          dataSource={data}
          widget={widget}
          width={settings.width?.size}
          innerRadius={innerRadius}
          enableSliceLabels={enableSliceLabels}
          padAngle={padAngle}
          cornerRadius={cornerRadius}
          sortByValue={sortByValue}
          enableRadialLabels={enableRadialLabels}
          sort={sort}
          tickRotation={tickRotation}
          bottomAxis={bottomAxis}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
        />
      );
    case TABLE:
      return (
        <DynamicTableWidget
          isCustomColor={isCustomColor}
          colorArray={colorArray}
          isMultiple={isMultiple}
          dataSource={data}
          widget={widget}
          width={settings.width?.size}
          sort={sort}
          tickRotation={tickRotation}
          bottomAxis={bottomAxis}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
        />
      );

    default:
      return <></>;
  }
};

export default AltrpDiagram;
