import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";
import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";
import getFormatValueString from "../../../../../admin/src/components/dashboard/services/getFormatValueString";

const AltrpBarDiagram = props => {
  const { settings, id } = props;

  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );

  const {
    isMultiple,
    sort,
    tickRotation,
    enableGridX,
    enableGridY,
    colorScheme,
    layout,
    groupMode,
    reverse,
    borderRadius,
    borderWidth,
    enableLabel,
    padding,
    useCustomTooltips,
    margin,
    markersRepeater,
    bottomAxis,
    minValue,
    enableMinValue,
    maxValue,
    enableMaxValue,
    currency,
    borderColor
  } = settings

  let data = []
  let keys = []
  let indexBy = ''

  if (isEditor()) {
    data = [
      {
        "country": "AG",
        "hot dog": 69,
        "burger": 148,
        "sandwich": 173,
        "kebab": 35,
      },
      {
        "country": "AI",
        "hot dog": 45,
        "burger": 96,
        "sandwich": 154,
        "kebab": 96,
      },
      {
        "country": "AL",
        "hot dog": 107,
        "burger": 39,
        "sandwich": 159,
        "kebab": 61,
      },
      {
        "country": "AM",
        "hot dog": 111,
        "burger": 135,
        "sandwich": 32,
        "kebab": 54,
      }
    ]

    keys = ['hot dog', 'burger', 'sandwich', 'kebab']
    indexBy = 'country'
  } else {
    try {
      data = getDataByPath(settings.datasource_path, []);

      if(settings.dataKeys.includes('{{') && settings.dataKeys.includes('}}')){
        keys = getDataByPath(settings.dataKeys.replace('{{', '').replace('}}',''), [])

      } else {
        keys = settings.dataKeys?.split('\n')

      }
      if(settings.indexBy.includes('{{') && settings.indexBy.includes('}}')){
        indexBy = getDataByPath(settings.indexBy.replace('{{', '').replace('}}',''), '')

      } else {
        indexBy = settings.indexBy

      }


    } catch (error) {
      console.error(error)
      data = [];
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
    <DynamicBarChart
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30
      }}
      valueFormat={getFormatValueString(settings)}
      currency={currency}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      isMultiple={isMultiple}
      colorScheme={colorScheme || 'nivo'}
      data={data}
      enableLabel={enableLabel}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      layout={layout}
      groupMode={groupMode}
      reverse={reverse}
      borderRadius={borderRadius?.size}
      borderWidth={borderWidth?.size}
      padding={padding?.size}
      sort={sort}
      tickRotation={tickRotation}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      useCustomTooltips={useCustomTooltips}
      keys={keys}
      borderColor={borderColor?.colorPickedHex}
      indexBy={indexBy}
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
      markers={markersRepeater?.map(el => ({
        label: '',
        value: 0,
        axis: 'y',
        legendOrientation: el.legendOrientation || 'horizontal',
        lineStyle: {stroke: el.stroke?.color || '#000'},
        ...el,
      }))}
      axisBottom={bottomAxis && {
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 0,
        legend: "",
        legendOffset: 32
      }}
      minValue={enableMinValue ? minValue : undefined}
      maxValue={enableMaxValue ? maxValue : undefined}
    />
  )
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage,
  altrpresponses: state.altrpresponses,
});
export default connect(mapStateToProps)(AltrpBarDiagram);
