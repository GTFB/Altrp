import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicPointChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPointChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";

const AltrpDiagram = props => {
  const { settings, id } = props;

  const margin = settings?.margin;
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

  const formattedYAxis = axisY?.map(item => {
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

  const sort = settings?.sort;
  const tickRotation = settings?.tickRotation;
  const bottomAxis = settings?.bottomAxis;
  const enableGridX = settings?.enableGridX;
  const enableGridY = settings?.enableGridY;
  //line settings
  const xScaleType = settings?.xScaleType || "linear";
  const precision = settings?.precision || "month";
  const colorScheme = settings?.colorScheme;

  const pointSize = settings?.pointSize;
  //data variable
  let data = [];

  if (isEditor()) {
    data = [
      {
        "id": "group A",
        "data": [
          {
            "x": 27,
            "y": 111
          },
          {
            "x": 87,
            "y": 85
          },
          {
            "x": 13,
            "y": 119
          },
          {
            "x": 80,
            "y": 16
          },
          {
            "x": 64,
            "y": 12
          },
          {
            "x": 40,
            "y": 104
          },
          {
            "x": 69,
            "y": 107
          },
          {
            "x": 87,
            "y": 99
          },
          {
            "x": 71,
            "y": 13
          },
          {
            "x": 91,
            "y": 45
          },
          {
            "x": 39,
            "y": 60
          },
          {
            "x": 5,
            "y": 47
          },
          {
            "x": 93,
            "y": 56
          },
          {
            "x": 16,
            "y": 104
          },
          {
            "x": 24,
            "y": 27
          },
          {
            "x": 60,
            "y": 85
          },
          {
            "x": 52,
            "y": 67
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 72,
            "y": 23
          },
          {
            "x": 11,
            "y": 3
          },
          {
            "x": 57,
            "y": 37
          },
          {
            "x": 45,
            "y": 73
          },
          {
            "x": 39,
            "y": 61
          },
          {
            "x": 49,
            "y": 68
          },
          {
            "x": 40,
            "y": 3
          },
          {
            "x": 62,
            "y": 75
          },
          {
            "x": 87,
            "y": 93
          },
          {
            "x": 56,
            "y": 17
          },
          {
            "x": 79,
            "y": 36
          },
          {
            "x": 80,
            "y": 63
          },
          {
            "x": 10,
            "y": 57
          },
          {
            "x": 34,
            "y": 71
          },
          {
            "x": 43,
            "y": 4
          },
          {
            "x": 94,
            "y": 76
          },
          {
            "x": 96,
            "y": 92
          },
          {
            "x": 52,
            "y": 84
          },
          {
            "x": 31,
            "y": 90
          },
          {
            "x": 82,
            "y": 88
          },
          {
            "x": 36,
            "y": 68
          },
          {
            "x": 87,
            "y": 108
          },
          {
            "x": 38,
            "y": 81
          },
          {
            "x": 82,
            "y": 78
          },
          {
            "x": 64,
            "y": 34
          },
        ]
      },
      {
        "id": "group B",
        "data": [
          {
            "x": 35,
            "y": 35
          },
          {
            "x": 40,
            "y": 15
          },
          {
            "x": 43,
            "y": 89
          },
          {
            "x": 92,
            "y": 24
          },
          {
            "x": 85,
            "y": 80
          },
          {
            "x": 44,
            "y": 70
          },
          {
            "x": 68,
            "y": 3
          },
          {
            "x": 3,
            "y": 30
          },
          {
            "x": 56,
            "y": 88
          },
          {
            "x": 60,
            "y": 119
          },
          {
            "x": 38,
            "y": 80
          },
          {
            "x": 81,
            "y": 105
          },
          {
            "x": 68,
            "y": 51
          },
          {
            "x": 16,
            "y": 91
          },
          {
            "x": 26,
            "y": 50
          },
          {
            "x": 0,
            "y": 18
          },
          {
            "x": 96,
            "y": 47
          },
          {
            "x": 86,
            "y": 1
          },
          {
            "x": 31,
            "y": 87
          },
          {
            "x": 41,
            "y": 28
          },
          {
            "x": 100,
            "y": 39
          },
          {
            "x": 6,
            "y": 23
          },
          {
            "x": 45,
            "y": 108
          },
          {
            "x": 30,
            "y": 91
          },
          {
            "x": 71,
            "y": 0
          },
          {
            "x": 22,
            "y": 2
          },
          {
            "x": 68,
            "y": 52
          },
          {
            "x": 20,
            "y": 114
          },
          {
            "x": 97,
            "y": 25
          },
          {
            "x": 73,
            "y": 87
          },
          {
            "x": 99,
            "y": 48
          },
          {
            "x": 50,
            "y": 7
          },
          {
            "x": 6,
            "y": 73
          },
          {
            "x": 89,
            "y": 34
          },
          {
            "x": 19,
            "y": 95
          },
          {
            "x": 57,
            "y": 46
          },
          {
            "x": 23,
            "y": 97
          },
          {
            "x": 9,
            "y": 54
          },
          {
            "x": 60,
            "y": 0
          },
          {
            "x": 61,
            "y": 90
          },
          {
            "x": 45,
            "y": 6
          },
          {
            "x": 61,
            "y": 58
          },
          {
            "x": 45,
            "y": 89
          },
        ]
      },
      {
        "id": "group C",
        "data": [
          {
            "x": 14,
            "y": 117
          },
          {
            "x": 55,
            "y": 21
          },
          {
            "x": 77,
            "y": 64
          },
          {
            "x": 28,
            "y": 68
          },
          {
            "x": 77,
            "y": 26
          },
          {
            "x": 18,
            "y": 32
          },
          {
            "x": 66,
            "y": 66
          },
          {
            "x": 51,
            "y": 89
          },
          {
            "x": 76,
            "y": 92
          },
          {
            "x": 35,
            "y": 42
          },
          {
            "x": 41,
            "y": 64
          },
          {
            "x": 57,
            "y": 83
          },
          {
            "x": 91,
            "y": 31
          },
          {
            "x": 8,
            "y": 76
          },
          {
            "x": 67,
            "y": 98
          },
          {
            "x": 29,
            "y": 40
          },
          {
            "x": 11,
            "y": 24
          },
          {
            "x": 72,
            "y": 85
          },
          {
            "x": 93,
            "y": 24
          },
          {
            "x": 66,
            "y": 94
          },
          {
            "x": 94,
            "y": 26
          },
          {
            "x": 61,
            "y": 18
          },
          {
            "x": 81,
            "y": 74
          },
          {
            "x": 66,
            "y": 91
          },
          {
            "x": 51,
            "y": 67
          },
          {
            "x": 48,
            "y": 71
          },
          {
            "x": 68,
            "y": 40
          },
          {
            "x": 4,
            "y": 9
          },
          {
            "x": 0,
            "y": 105
          },
          {
            "x": 97,
            "y": 16
          },
          {
            "x": 9,
            "y": 96
          },
          {
            "x": 45,
            "y": 112
          },
          {
            "x": 28,
            "y": 102
          },
          {
            "x": 5,
            "y": 90
          },
          {
            "x": 1,
            "y": 40
          },
          {
            "x": 16,
            "y": 8
          },
          {
            "x": 11,
            "y": 77
          },
          {
            "x": 64,
            "y": 48
          },
          {
            "x": 29,
            "y": 51
          },
          {
            "x": 59,
            "y": 90
          },
          {
            "x": 51,
            "y": 95
          },
          {
            "x": 29,
            "y": 65
          },
          {
            "x": 59,
            "y": 43
          },
        ]
      },
      {
        "id": "group D",
        "data": [
          {
            "x": 82,
            "y": 116
          },
          {
            "x": 41,
            "y": 95
          },
          {
            "x": 40,
            "y": 88
          },
          {
            "x": 43,
            "y": 107
          },
          {
            "x": 95,
            "y": 67
          },
          {
            "x": 100,
            "y": 10
          },
          {
            "x": 35,
            "y": 102
          },
          {
            "x": 38,
            "y": 8
          },
          {
            "x": 90,
            "y": 0
          },
          {
            "x": 39,
            "y": 26
          },
          {
            "x": 86,
            "y": 69
          },
          {
            "x": 67,
            "y": 6
          },
          {
            "x": 30,
            "y": 40
          },
          {
            "x": 6,
            "y": 105
          },
          {
            "x": 30,
            "y": 5
          },
          {
            "x": 70,
            "y": 9
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 42,
            "y": 30
          },
          {
            "x": 90,
            "y": 8
          },
          {
            "x": 89,
            "y": 80
          },
          {
            "x": 38,
            "y": 23
          },
          {
            "x": 62,
            "y": 77
          },
          {
            "x": 10,
            "y": 14
          },
          {
            "x": 99,
            "y": 41
          },
          {
            "x": 1,
            "y": 14
          },
          {
            "x": 27,
            "y": 11
          },
          {
            "x": 93,
            "y": 8
          },
          {
            "x": 91,
            "y": 106
          },
          {
            "x": 16,
            "y": 49
          },
          {
            "x": 56,
            "y": 49
          },
          {
            "x": 36,
            "y": 59
          },
          {
            "x": 25,
            "y": 48
          },
          {
            "x": 25,
            "y": 66
          },
          {
            "x": 78,
            "y": 47
          },
          {
            "x": 71,
            "y": 31
          },
          {
            "x": 52,
            "y": 48
          },
          {
            "x": 97,
            "y": 1
          },
          {
            "x": 12,
            "y": 116
          },
          {
            "x": 22,
            "y": 28
          },
          {
            "x": 56,
            "y": 1
          },
          {
            "x": 7,
            "y": 112
          },
          {
            "x": 74,
            "y": 67
          },
          {
            "x": 1,
            "y": 118
          },
        ]
      },
      {
        "id": "group E",
        "data": [
          {
            "x": 10,
            "y": 6
          },
          {
            "x": 83,
            "y": 86
          },
          {
            "x": 78,
            "y": 8
          },
          {
            "x": 93,
            "y": 82
          },
          {
            "x": 86,
            "y": 43
          },
          {
            "x": 40,
            "y": 101
          },
          {
            "x": 84,
            "y": 87
          },
          {
            "x": 89,
            "y": 46
          },
          {
            "x": 63,
            "y": 13
          },
          {
            "x": 24,
            "y": 100
          },
          {
            "x": 0,
            "y": 3
          },
          {
            "x": 6,
            "y": 54
          },
          {
            "x": 96,
            "y": 84
          },
          {
            "x": 41,
            "y": 20
          },
          {
            "x": 49,
            "y": 61
          },
          {
            "x": 63,
            "y": 55
          },
          {
            "x": 30,
            "y": 91
          },
          {
            "x": 70,
            "y": 96
          },
          {
            "x": 53,
            "y": 103
          },
          {
            "x": 90,
            "y": 58
          },
          {
            "x": 73,
            "y": 101
          },
          {
            "x": 43,
            "y": 34
          },
          {
            "x": 65,
            "y": 28
          },
          {
            "x": 7,
            "y": 49
          },
          {
            "x": 73,
            "y": 92
          },
          {
            "x": 14,
            "y": 76
          },
          {
            "x": 81,
            "y": 118
          },
          {
            "x": 62,
            "y": 88
          },
          {
            "x": 19,
            "y": 49
          },
          {
            "x": 89,
            "y": 49
          },
          {
            "x": 81,
            "y": 63
          },
          {
            "x": 6,
            "y": 70
          },
          {
            "x": 82,
            "y": 25
          },
          {
            "x": 38,
            "y": 108
          },
          {
            "x": 36,
            "y": 114
          },
          {
            "x": 21,
            "y": 92
          },
          {
            "x": 69,
            "y": 53
          },
          {
            "x": 67,
            "y": 50
          },
          {
            "x": 16,
            "y": 59
          },
          {
            "x": 77,
            "y": 97
          },
          {
            "x": 59,
            "y": 64
          },
          {
            "x": 89,
            "y": 17
          },
          {
            "x": 64,
            "y": 96
          },
        ]
      }
    ]
  } else {
    if (settings.datasource_path != null) {
      try {
        data = getDataByPath(settings.datasource_path, []);
      } catch (error) {
        console.log("====================================");
        console.error(error);
        console.log("====================================");
        data = [];
      }
    }
  }

  if (data.length === 0) {
    return (
      <div className={`altrp-chart ${settings.legendPosition}`}>
        Loading data...
      </div>
    );
  }

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  
  
  return (
    <DynamicPointChart
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
      data={data}
      constantsAxises={constantsAxises}
      colorScheme={colorScheme || 'nivo'}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      nodeSize={pointSize}
      xScaleType={xScaleType}
      precision={precision}
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
