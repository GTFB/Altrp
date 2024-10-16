import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
import getFormatValueString from "../../../../../admin/src/components/dashboard/services/getFormatValueString";

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
    bottomAxis,
    enableGridX,
    enableGridY,
    colorScheme,
    enableArea,
    enablePoints,
    pointSize,
    pointColor,
    pointBorderWidth,
    pointBorderColor,
    yMarker,
    enableGradient,
    curve,
    lineWidth,
    areaBaselineValue,
    areaOpacity,
    areaBlendMode,
    enableSlices
  } = settings

  //line settings
  let xScaleType = settings?.xScaleType || "point";
  const precision = settings?.precision || "month";

  let data = [];

  //funciton for formattion data for all types

  if (isEditor()) {
    data = [
      {
        "id": "japan",
        "color": "hsl(112, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 187
          },
          {
            "x": "helicopter",
            "y": 202
          },
          {
            "x": "boat",
            "y": 215
          },
          {
            "x": "train",
            "y": 272
          },
          {
            "x": "subway",
            "y": 195
          },
          {
            "x": "bus",
            "y": 5
          },
          {
            "x": "car",
            "y": 236
          },
          {
            "x": "moto",
            "y": 270
          },
          {
            "x": "bicycle",
            "y": 230
          },
          {
            "x": "horse",
            "y": 146
          },
          {
            "x": "skateboard",
            "y": 141
          },
          {
            "x": "others",
            "y": 207
          }
        ]
      },
      {
        "id": "france",
        "color": "hsl(151, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 151
          },
          {
            "x": "helicopter",
            "y": 58
          },
          {
            "x": "boat",
            "y": 154
          },
          {
            "x": "train",
            "y": 280
          },
          {
            "x": "subway",
            "y": 37
          },
          {
            "x": "bus",
            "y": 238
          },
          {
            "x": "car",
            "y": 176
          },
          {
            "x": "moto",
            "y": 239
          },
          {
            "x": "bicycle",
            "y": 52
          },
          {
            "x": "horse",
            "y": 24
          },
          {
            "x": "skateboard",
            "y": 5
          },
          {
            "x": "others",
            "y": 63
          }
        ]
      },
      {
        "id": "us",
        "color": "hsl(211, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 150
          },
          {
            "x": "helicopter",
            "y": 77
          },
          {
            "x": "boat",
            "y": 188
          },
          {
            "x": "train",
            "y": 201
          },
          {
            "x": "subway",
            "y": 163
          },
          {
            "x": "bus",
            "y": 274
          },
          {
            "x": "car",
            "y": 214
          },
          {
            "x": "moto",
            "y": 299
          },
          {
            "x": "bicycle",
            "y": 168
          },
          {
            "x": "horse",
            "y": 115
          },
          {
            "x": "skateboard",
            "y": 149
          },
          {
            "x": "others",
            "y": 153
          }
        ]
      },
      {
        "id": "germany",
        "color": "hsl(203, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 228
          },
          {
            "x": "helicopter",
            "y": 69
          },
          {
            "x": "boat",
            "y": 251
          },
          {
            "x": "train",
            "y": 107
          },
          {
            "x": "subway",
            "y": 127
          },
          {
            "x": "bus",
            "y": 72
          },
          {
            "x": "car",
            "y": 34
          },
          {
            "x": "moto",
            "y": 255
          },
          {
            "x": "bicycle",
            "y": 213
          },
          {
            "x": "horse",
            "y": 246
          },
          {
            "x": "skateboard",
            "y": 286
          },
          {
            "x": "others",
            "y": 24
          }
        ]
      },
      {
        "id": "norway",
        "color": "hsl(21, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 256
          },
          {
            "x": "helicopter",
            "y": 58
          },
          {
            "x": "boat",
            "y": 173
          },
          {
            "x": "train",
            "y": 246
          },
          {
            "x": "subway",
            "y": 154
          },
          {
            "x": "bus",
            "y": 108
          },
          {
            "x": "car",
            "y": 273
          },
          {
            "x": "moto",
            "y": 195
          },
          {
            "x": "bicycle",
            "y": 36
          },
          {
            "x": "horse",
            "y": 1
          },
          {
            "x": "skateboard",
            "y": 253
          },
          {
            "x": "others",
            "y": 143
          }
        ]
      }
    ]
  } else {
    try {
      data = getDataByPath(settings.datasource_path, []);
    } catch (error) {
      console.error(error)
      data = [];
    }
  }

  if (xScaleType === 'time' && isNaN((new Date(xScaleType)).getDate())) {
    xScaleType = 'point'
  }

  if (data?.length === 0) {
    return (
      <div className={`altrp-chart ${settings.legendPosition}`}>
        Loading data...
      </div>
    );
  }

  return (
    <DynamicLineChart
      classes={props.classes}
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
      enableSlices={enableSlices}
      data={data}
      xScaleType={xScaleType}
      precision={precision}
      curve={curve}
      colorScheme={colorScheme || 'nivo'}
      enableArea={enableArea}
      enablePoints={enablePoints}
      pointColor={pointColor?.colorPickedHex}
      pointBorderWidth={pointBorderWidth?.size}
      pointBorderColor={pointBorderColor?.colorPickedHex}
      pointSize={pointSize}
      yMarker={yMarker}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      constantsAxises={constantsAxises}
      bottomAxis={bottomAxis}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      xFormat={getFormatValueString(settings, {name: 'xFormat'})}
      yFormat={getFormatValueString(settings, {name: 'yFormat'})}
      lineWidth={lineWidth?.size}
      areaBlendMode={areaBlendMode}
      areaOpacity={areaOpacity?.size}
      areaBaselineValue={areaBaselineValue}
      axisBottom={settings.axisBottom ? {
        orient: 'bottom',
        tickSize: settings.bottomTickSize?.size,
        tickPadding: settings.bottomTickPadding?.size,
        tickRotation: settings.bottomTickRotation?.size,
        legend: settings.bottomLegend,
        legendOffset: settings.bottomLegendOffset?.size,
        legendPosition: 'middle'
      } : null}
      axisTop={settings.axisTop ? {
        orient: 'top',
        tickSize: settings.topTickSize?.size,
        tickPadding: settings.topTickPadding?.size,
        tickRotation: settings.topTickRotation?.size,
        legend: settings.topLegend,
        legendOffset: settings.topLegendOffset?.size,
        legendPosition: 'middle'
      } : null}
      axisLeft={settings.axisLeft ? {
        orient: 'left',
        tickSize: settings.leftTickSize?.size,
        tickPadding: settings.leftTickPadding?.size,
        tickRotation: settings.leftTickRotation?.size,
        legend: settings.leftLegend,
        legendOffset: settings.leftLegendOffset?.size,
        legendPosition: 'middle'
      } : null}
      axisRight={settings.axisRight ? {
        orient: 'right',
        tickSize: settings.rightTickSize?.size,
        tickPadding: settings.rightTickPadding?.size,
        tickRotation: settings.rightTickRotation?.size,
        legend: settings.rightLegend,
        legendOffset: settings.rightLegendOffset?.size,
        legendPosition: 'middle'
      } : null}
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
  altrpresponses: state.altrpresponses,
  currentDataStorage: state.currentDataStorage,
});
export default connect(mapStateToProps)(AltrpDiagram);
