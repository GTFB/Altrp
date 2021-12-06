import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";
import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";

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
    group_name,
    key_name, 
    data_name
  } = settings

  const sql = settings.query?.dataSource?.value;

  let data = []
  let keys = []
  let indexBy = ''

  const formatData = (data, groupName, keyName, dataName) => {
    let hierarhed = {}

    data.forEach(el => {
      hierarhed[el.type] = hierarhed[el.type] || []
      hierarhed[el.type].push(el)
    })

    let formatted = []

    Object.keys(hierarhed).forEach(key => {
      const keyv = {}

      hierarhed[key].map(el => {
        keyv[el[keyName]] = el[dataName]
      })

      keyv[groupName] = key 
      formatted.push(keyv)
    })

    return formatted;
  };

  if (isEditor()) {
    data = [
      {
        key: 'key1',
        title: 61,
        title1: 60,
      },
      {
        key: 'key2',
        title1: 50,
        title: 60,
      },
    ]

    keys = ['title', 'title1']
    indexBy = 'key'
  } else {
    try {
      data = getDataByPath(settings.datasource_path, []);

      keys = [
        ...new Set(data.map(el => el[key_name]))
      ]

      indexBy = group_name

      data = formatData(data, group_name, key_name, data_name);
    } catch (error) {
      console.log("====================================");
      console.error(error);
      console.log("====================================");
      data = [];
    }
  }

  if (!sql && data.length === 0) {
    return (
      <div className={`altrp-chart ${settings.legendPosition}`}>
        Loading data...
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
      animated: settings.animated,
      isVertical: settings.isVertical
    },
    filter: {}
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  
  return (
    <DynamicBarChart
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30 
      }}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      isMultiple={isMultiple}
      colorScheme={colorScheme}
      dataSource={data}
      widget={widget}
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
        ...el,
        axis: 'y', 
        legendOrientation: el.legendOrientation || 'horizontal',
        lineStyle: {stroke: el.stroke.color}
      }))}
    />
  )
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpBarDiagram);
