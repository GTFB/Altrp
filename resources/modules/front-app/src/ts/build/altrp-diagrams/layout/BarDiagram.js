var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import Spinner from "../../../../../../admin/src/components/dashboard/widgets/Spinner";
import EmptyWidget from "../../../../../../admin/src/components/dashboard/widgets/EmptyWidget";
import Schemes from "../../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;
import { ResponsiveBar } from "@nivo/bar";
import { getWidgetData } from "../../../../../../admin/src/components/dashboard/services/getWidgetData";
import TooltipBar from "../../../../../../admin/src/components/dashboard/widgets/d3/TooltipBar";
const TooltipBarComponent = TooltipBar;
const BarDiagram = ({ widget, width = 300, height = 450, margin, dataSource = [], groupMode = "stacked", layout = "vertical", colorScheme = "regagro", reverse = false, enableLabel = false, padding = 0.1, innerPadding = 0, borderRadius = 0, borderWidth = 0, sort = "", tickRotation = 0, bottomAxis = true, enableGridX = true, enableGridY = true, customColorSchemeChecker = false, customColors = [], yScaleMax, widgetID, useCustomTooltips }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const getData = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        if (dataSource.length == 0) {
            const charts = yield getWidgetData(widget.source, widget.filter);
            if (charts.status === 200) {
                let data = charts.data.data.map((item, index) => {
                    return {
                        [item.key]: Number(item.data),
                        key: item.key,
                        value: Number(item.data)
                    };
                });
                setData(data || []);
                setIsLoading(false);
            }
        }
        else {
            if (sort !== null &&
                typeof sort !== "undefined" &&
                typeof dataSource !== "undefined") {
                switch (sort) {
                    case "value":
                        dataSource = _.sortBy(dataSource, ["value"]);
                        break;
                    case "key":
                        dataSource = _.sortBy(dataSource, ["key"]);
                        break;
                    default:
                        dataSource = dataSource;
                        break;
                }
            }
            setData(dataSource || []);
            setIsLoading(false);
        }
    }), [widget]);
    useEffect(() => {
        getData();
    }, [data]);
    if (isLoading)
        return React.createElement(Spinner, null);
    if (data.length === 0)
        return React.createElement(EmptyWidget, null);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { height: `${height}`, width: `${width}` } },
            React.createElement(ResponsiveBar, { data: data, margin: {
                    top: margin.top,
                    right: margin.right,
                    bottom: margin.bottom,
                    left: margin.left
                }, indexBy: "key", colors: customColorSchemeChecker && customColors.length > 0
                    ? customColors
                    : colorScheme === "regagro"
                        ? regagroScheme
                        : colorScheme === "milk"
                            ? milkScheme
                            : colorScheme === "milk2"
                                ? milkScheme2
                                : { scheme: colorScheme }, layout: layout, tooltip: datum => (React.createElement(TooltipBarComponent, { enable: useCustomTooltips, datum: datum, widgetID: widgetID })), enableGridX: enableGridX, enableGridY: enableGridY, enableLabel: enableLabel, reverse: reverse, groupMode: groupMode, padding: padding, innerPadding: innerPadding, borderRadius: borderRadius, borderWidth: borderWidth, axisBottom: {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: tickRotation,
                    legendOffset: 32
                } }))));
};
export default BarDiagram;
//# sourceMappingURL=BarDiagram.js.map