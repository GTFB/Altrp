import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import DynamicRadarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicRadarChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";

const AltrpRadarDiagram = props => {
  const { settings, id } = props;

  const widgetName = settings?.widget_name || id;
  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );

  const sql = settings.query?.dataSource?.value;

  const {
    pointSize,
    colorScheme,
    group_name,
    key_name,
    data_name,
    margin,
    curve,
    fillOpacity,
    borderWidth,
    blendMode,
    gridLevels,
    gridShape,
    enableDots,
    dotSize
  } = settings;

  //data variable
  let data = []
  let keys = []
  let indexBy = ''

  if (isEditor()) {
    data = [
      {
        "taste": "fruity",
        "chardonay": 90,
        "carmenere": 117,
        "syrah": 96
      },
      {
        "taste": "bitter",
        "chardonay": 117,
        "carmenere": 22,
        "syrah": 51
      },
      {
        "taste": "heavy",
        "chardonay": 69,
        "carmenere": 80,
        "syrah": 50
      },
      {
        "taste": "strong",
        "chardonay": 45,
        "carmenere": 106,
        "syrah": 57
      },
      {
        "taste": "sunny",
        "chardonay": 27,
        "carmenere": 24,
        "syrah": 94
      }
    ]

    keys = [ 'chardonay', 'carmenere', 'syrah' ]
    indexBy = 'taste'
  } else {
    try {
      data = getDataByPath(settings.datasource_path, []);

      keys = settings.dataKeys?.split('\n')

      data = formatData(data, key_name, group_name, data_name);
    } catch (error) {
      data = []
    }
  }

  if (data.length === 0) {
    return (
      <div className={`${props.classes} altrp-chart ${settings.legendPosition}`}>
        Loading data...
      </div>
    );
  }

  return (
    <DynamicRadarChart
      classes={props.classes}
      borderWidth={borderWidth?.size}
      blendMode={blendMode}
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30
      }}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      data={data}
      gridShape={gridShape}
      enableDots={enableDots}
      colorScheme={colorScheme || 'nivo'}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      nodeSize={pointSize}
      keys={keys}
      indexBy={indexBy}
      curve={curve}
      fillOpacity={fillOpacity?.size}
      gridLevels={gridLevels?.size}
      dotSize={dotSize?.size}
      legends={settings.use_legend && {
        anchor: settings.legend_anchor,
        direction: settings.legend_direction,
        itemDirection: settings.legend_item_direction,
        translateX: settings.legend_translate_x,
        translateY: settings.legend_translate_y,
        itemsSpacing: settings.legend_items_spacing,
        itemWidth: settings.legend_item_width || 60,
        itemHeight: settings.legend_item_height,
        itemOpacity: settings.legend_item_opacity,
        symbolSize: settings.legend_symbol_size,
        symbolShape: settings.legend_symbol_shape
      }}
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpRadarDiagram);
