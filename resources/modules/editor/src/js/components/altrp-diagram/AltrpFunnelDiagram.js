import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicFunnelChart from "../../../../../admin/src/components/dashboard/widgets/DynamicFunnelChart";
import getFormatValueString from "../../../../../admin/src/components/dashboard/services/getFormatValueString";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";

const AltrpFunnelDiagram = props => {
  const { settings, id } = props;

  const margin = settings?.margin;
  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  )

  //line settings
  const colorScheme = settings?.colorScheme;

  const {
    interpolation,
    spacing,
    shapeBlending,
    direction,
    isInteractive,
    currentPartSizeExtension,
    currentBorderWidth,
    borderColor,
    enableLabels,
    labelsColor
  } = settings

  let data = [];

  if (isEditor()) {
    data = [
        {
            label: 'test',
            id: 1,
            value: Math.random()* 100
        },
        {
            label: 'test1',
            id: 2,
            value: Math.random()* 100
        },
        {
            label: 'test2',
            id: 3,
            value: Math.random()* 100
        },
        {
            label: 'test3',
            id: 4,
            value: Math.random() * 100
        },
    ]
  } else {
    if (settings.datasource_path != null) {
      try {
        data = getDataByPath(settings.datasource_path, []);
      } catch (error) {
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

  let labelColor

  if (enableLabels) {
    if (labelsColor?.colorPickedHex) {
      labelColor = labelsColor?.colorPickedHex
    } else {
      labelColor = { from: 'color', modifiers: [ [ 'darker', 3 ] ] }
    }
  }

  return (
    <DynamicFunnelChart
      classes={props.classes}
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30
      }}
      valueFormat={getFormatValueString(settings)}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      data={data}
      labelColor={labelColor}
      borderColor={borderColor?.colorPickedHex}
      colorScheme={colorScheme || 'nivo'}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      fillOpacity={settings.fillOpacity?.size}
      borderOpacity={settings.borderOpacity?.size}
      borderWidth={settings.borderWidth}
      interpolation={interpolation}
      spacing={spacing?.size}
      shapeBlending={shapeBlending?.size}
      direction={direction}
      isInteractive={isInteractive !== false}
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
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpFunnelDiagram);
