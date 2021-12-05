import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";

const AltrpDiagram = props => {
  const { settings, id } = props;

  const {margin, yScaleMax, axisY, axisX} = settings

  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );

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

  const {
    isMultiple, 
    sort, 
    tickRotation, 
    bottomAxis, 
    enableGridX, 
    enableGridY, 
    lineWidth, 
    colorScheme,
    enableArea,
    enablePoints,
    pointSize,
    pointColor,
    yMarker,
    enableGradient,
    curve
  } = settings

  const isCustomColor = settings.isCustomColors;
  const keyIsDate = settings.key_is_date;
  //line settings
  const xScaleType = settings?.xScaleType || "point";
  const precision = settings?.precision || "month";
  
  const xMarkerValue = keyIsDate
    ? moment(settings?.xMarkerValueDate).toDate()
    : settings?.xMarkerValue;

  let data = [];

  //funciton for formattion data for all types
  const formatData = (data, r) => {
    return data.map((d, index) => {
      const currentKey = _.get(d, r.key);
      const keyFormatted = !moment(currentKey).isValid()
        ? currentKey
        : moment(currentKey).format("DD.MM.YYYY");
      
      return {
        y: Number(_.get(d, r.data)),
        x: keyIsDate ? keyFormatted : currentKey,
      };
    });
  };

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

        data = [
          {
            data: formatData(data, r)
          }
        ];
      } catch (error) {
        console.log("====================================");
        console.error(error);
        console.log("====================================");
        data = [
          {
            data: []
          }
        ];
      }
    }
  }

  if (data.length === 0) {
    return (
      <div className={`altrp-chart ${settings.legendPosition}`}>
        Идет загрузка данных...
      </div>
    );
  }

  const widget = {
    options: {
      colorScheme: settings.colorScheme,
      animated: settings.animated,
      isVertical: settings.isVertical
    },
    filter: {}
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  console.log({width: settings.width, height: settings.height});
  
  return (
    <DynamicLineChart
      enableGradient={enableGradient}
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30 
      }}
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
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      constantsAxises={constantsAxises}
      sort={sort}
      tickRotation={tickRotation?.size}
      bottomAxis={bottomAxis}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      legend={settings.use_legend && {
        anchor: settings.legend_anchor,
        direction: settings.legend_direction,
        itemDirection: settings.legend_item_direction,
        translateX: settings.legend_translate_x,
        translateY: settings.legend_translate_y,
        itemsSpacing: settings.legend_items_spacing,
        itemWidth: settings.legend_item_width || 60,
        itemHeight: settings.legend_item_height,
        itemOpacity: settings.legend_item_opacity?.size,
        symbolSize: settings.legend_symbol_size,
        symbolShape: settings.legend_symbol_shape
      }}
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpDiagram);