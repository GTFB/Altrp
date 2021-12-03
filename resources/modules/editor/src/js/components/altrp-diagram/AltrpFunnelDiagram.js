import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicFunnelChart from "../../../../../admin/src/components/dashboard/widgets/DynamicFunnelChart";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";

const AltrpFunnelDiagram = props => {
  const { settings, id } = props;

  const dispatch = useDispatch();
  const margin = settings?.margin;
  const widgetName = settings?.widget_name || id;
  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  )

  const yScaleMax = settings?.yScaleMax;

  const sql = settings.query?.dataSource?.value;
  const keyIsDate = settings.key_is_date;
  //line settings
  const colorScheme = settings?.colorScheme;

  const {
    label_color_type, 
    label_color, 
    label_modifier,
    interpolation,
    spacing,
    shapeBlending,
    direction,
    isInteractive,
    currentPartSizeExtension,
    currentBorderWidth
  } = settings

  let data = [];

  //funciton for formattion data for all types
  const formatData = (data, r) => {
    return data.map((d) => ({
        id: d[settings.key_name],
        label: d[settings.key_name],
        value: d[settings.data_name]
    }))
  };

  let legend = [];

  if (isEditor()) {
    data = [
        {
            label: 'test',
            id: 1,
            value: 50
        },
        {
            label: 'test1',
            id: 2,
            value: 70
        },
        {
            label: 'test2',
            id: 3,
            value: 20
        },
        {
            label: 'test3',
            id: 4,
            value: 70
        },
    ]
  } else {
    if (settings.datasource_path != null) {
      try {
        data = getDataByPath(settings.datasource_path, []);
        data = _.uniqBy(data, settings.key_name);

        data = formatData(data)
      } catch (error) {
        console.log("====================================");
        console.error(error);
        console.log("====================================");
        data = [];
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
    <DynamicFunnelChart
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30 
      }}
      yScaleMax={yScaleMax}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      widget={widget}
      dataSource={data}
      colorScheme={colorScheme}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      fillOpacity={settings.fillOpacity?.size}
      borderOpacity={settings.borderOpacity?.size}
      borderWidth={settings.borderWidth}
      interpolation={interpolation}
      spacing={spacing?.size}
      shapeBlending={shapeBlending?.size}
      direction={direction}
      isInteractive={isInteractive}
      currentPartSizeExtension={currentPartSizeExtension?.size ? +currentPartSizeExtension?.size : 0}
      currentBorderWidth={currentBorderWidth?.size ? +currentBorderWidth?.size : 0}
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
      labelColor={
        label_color_type && label_color_type === 'custom' 
            ? label_color?.colorPickedHex
            : label_modifier?.size && { from: 'color', modifiers: [ [ label_color_type, label_modifier?.size ] ] }
      }
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpFunnelDiagram);