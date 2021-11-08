import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";

const AltrpDiagram = props => {
  const { settings, id } = props;

  const dispatch = useDispatch();
  const margin = settings?.margin;
  const widgetName = settings?.widget_name || id;
  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );
  const yScaleMax = settings?.yScaleMax;

  const axisY = settings?.axisY;
  const tooltipValues = settings?.repTooltips?.map(item => ({
    label: _.get(item, "label"),
    field: _.get(item, "value"),
    color: _.get(item, "color")?.colorPickedHex
  }));
  const useCustomTooltips = settings?.customTooltip;

  const formattedYAxis =
    axisY?.map(item => {
      const valueFromPath = getDataByPath(item.yMarkerValue);
      const value =
        valueFromPath !== null
          ? Number(valueFromPath)
          : Number(item.yMarkerValue);
      const data = {
        axis: "y",
        value: value,
        lineStyle: {
          stroke:
            item.yMarkerColor != null
              ? item.yMarkerColor.colorPickedHex
              : "#000000",
          strokeWidth: item.yMarkerWidth
        },
        textStyle: {
          fill:
            item.yMarkerLabelColor != null
              ? item.yMarkerLabelColor.colorPickedHex
              : "#000000"
        },
        legend: item.yMarkerLabel,
        legendOrientation: item.yMarkerOrientation
      };
      return data;
    }) || [];

  const axisX = settings?.axisX;
  const formattedXAxis =
    axisX?.map(item => {
      const valueFromPath = getDataByPath(item.xMarkerValue);

      const value =
        valueFromPath !== null
          ? valueFromPath
          : item.xMarkerIsDate
          ? moment(item.xMarkerValue).format("DD.MM.YYYY")
          : item.xMarkerValue;

      const data = {
        axis: "x",
        value: value,
        lineStyle: {
          stroke:
            item.xMarkerColor != null
              ? item.xMarkerColor.colorPickedHex
              : "#000000",
          strokeWidth: item.xMarkerWidth
        },
        textStyle: {
          fill:
            item.xMarkerLabelColor != null
              ? item.xMarkerLabelColor.colorPickedHex
              : "#000000"
        },
        legend: item.xMarkerLabel,
        legendOrientation: item.xMarkerOrientation
      };
      return data;
    }) || [];

  let constantsAxises = [];
  if (formattedXAxis.length > 0) {
    constantsAxises.push(formattedXAxis);
    constantsAxises = constantsAxises.flat();
  }
  if (formattedYAxis.length > 0) {
    constantsAxises.push(formattedYAxis);
    constantsAxises = constantsAxises.flat();
  }

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
  //data variable
  let data = [];

  //funciton for formattion data for all types
  const formatData = (data, r) => {
    return data.map((d, index) => {
      const currentKey = _.get(d, r.key);
      const keyFormatted = !moment(currentKey).isValid()
        ? currentKey
        : moment(currentKey).format("DD.MM.YYYY");
      const tooltip =
        typeof tooltipValues !== "undefined"
          ? tooltipValues?.map(item => {
              return {
                label: item?.label,
                value: _.get(d, item.field),
                color: item?.color
              };
            })
          : [];
      
      return {
        y: Number(_.get(d, r.data)),
        x: keyIsDate ? keyFormatted : currentKey,
        tooltip: tooltip
      };
    });
  };
  let legend = [];
  const currentColors = isCustomColor
    ? customColors
    : _.find(Schemes, { value: settings?.colorScheme }).colors;
  const colorsCount = currentColors.length;

  if (isEditor()) {
    data = [
      {
        data: [
          {
            x: '2020-01',
            y: 60,
          },
          {
            x: '2020-02',
            y: 200,
          },
          {
            x: '2013-03',
            y: 20,
          },
          {
            x: '2013-04',
            y: 10,
          },
          {
            x: '2013-05',
            y: 50,
          },
        ],
        id: 'Line 1'
      },
      {
        data: [
          {
            x: '2020-01',
            y: 50,
          },
          {
            x: '2020-02',
            y: 140,
          },
          {
            x: '2013-03',
            y: 40,
          },
          {
            x: '2013-04',
            y: 20,
          },
          {
            x: '2013-05',
            y: 60,
          },
        ],
        id: 'Line 2'
      },
    ]
  } else {
    if (isMultiple) {
      let repeater = _.cloneDeep(settings.rep, []);
      data = repeater.map((r, index) => {
        let innerData = getDataByPath(r.path, []);
        if (innerData.length > 0) {
          //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
          innerData = _.uniqBy(innerData, r.key);
          innerData = formatData(innerData, r);
        }

        legend.push({
          color: currentColors[index % colorsCount],
          label: r.title || r.path
        });

        return {
          id: r.title || r.path,
          data: innerData
        };
      });
    } else if (settings.datasource_path != null) {
      try {
        data = getDataByPath(settings.datasource_path, []);
        data = _.uniqBy(data, settings.key_name);
        const r = {
          key: settings.key_name,
          data: settings.data_name
        };
  
        legend.push({
          color: currentColors[0],
          label: settings.datasource_title || settings.datasource_path
        });
        data = [
          {
            id: settings.datasource_title || settings.datasource_path,
            data: formatData(data, r)
          }
        ];
      } catch (error) {
        console.log("====================================");
        console.error(error);
        console.log("====================================");
        data = [
          {
            id: settings.datasource_title || settings.datasource_path,
            data: []
          }
        ];
      }
    }
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

  const setLegend = legend =>
    dispatch(changePageState(widgetName, { legend: legend }));

  useEffect(() => {
    if (legend.length > 0) {
      setLegend(legend);
    }
  }, [legend]);
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  
  return (
    <DynamicLineChart
      widgetID={id}
      margin={margin}
      useCustomTooltips={useCustomTooltips}
      yScaleMax={yScaleMax}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
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
      width={`${settings.width?.size}${settings.width?.unit}`}
      height={`${settings.height?.size}${settings.height?.unit}`}
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
      constantsAxises={constantsAxises}
      sort={sort}
      tickRotation={tickRotation}
      bottomAxis={bottomAxis}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpDiagram);