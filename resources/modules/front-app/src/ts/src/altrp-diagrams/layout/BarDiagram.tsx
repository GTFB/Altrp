import React, {
    FunctionComponent,
    useState,
    useEffect,
    useCallback
} from "react";
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

const TooltipBarComponent: any = TooltipBar;

const BarDiagram: FunctionComponent<{
    widget?: any;
    width?: string;
    height?: string;
    margin?: any;
    dataSource?: any;
    groupMode?: "stacked" | "grouped";
    layout?: "vertical" | "horizontal";
    colorScheme?: string;
    reverse?: boolean;
    enableLabel?: boolean;
    padding?: any;
    innerPadding?: any;
    borderRadius?: any;
    borderWidth?: any;
    sort?: "value" | "key";
    tickRotation?: any;
    bottomAxis?: any;
    enableGridX?: any;
    enableGridY?: any;
    customColorSchemeChecker?: any;
    customColors?: any;
    yScaleMax?: any;
    widgetID?: any;
    useCustomTooltips: boolean;
}> = ({
    widget,
    width = 300,
    height = 450,
    margin,
    dataSource = [],
    groupMode = "stacked",
    layout = "vertical",
    colorScheme = "regagro",
    reverse = false,
    enableLabel = false,
    padding = 0.1,
    innerPadding = 0,
    borderRadius = 0,
    borderWidth = 0,
    sort = "",
    tickRotation = 0,
    bottomAxis = true,
    enableGridX = true,
    enableGridY = true,
    customColorSchemeChecker = false,
    customColors = [],
    yScaleMax,
    widgetID,
    useCustomTooltips
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        setIsLoading(true);
        if (dataSource.length == 0) {
            const charts = await getWidgetData(widget.source, widget.filter);
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
        } else {
            if (
                sort !== null &&
                typeof sort !== "undefined" &&
                typeof dataSource !== "undefined"
            ) {
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
    }, [widget]);

    useEffect(() => {
        getData();
    }, [data]);

    if (isLoading) return <Spinner />;

    if (data.length === 0) return <EmptyWidget />;
    return (
        <>
            <div style={{ height: `${height}`, width: `${width}` }}>
                <ResponsiveBar
                    data={data}
                    margin={{
                        top: margin?.top || 30,
                        right: margin?.right || 30,
                        bottom: margin?.bottom || 30,
                        left: margin?.left || 30
                    }}
                    indexBy="key"
                    colors={
                        customColorSchemeChecker && customColors.length > 0
                            ? customColors
                            : colorScheme === "regagro"
                            ? regagroScheme
                            : colorScheme === "milk"
                            ? milkScheme
                            : colorScheme === "milk2"
                            ? milkScheme2
                            : { scheme: colorScheme }
                    }
                    layout={layout}
                    tooltip={datum => (
                        <TooltipBarComponent
                            enable={useCustomTooltips}
                            datum={datum}
                            widgetID={widgetID}
                        ></TooltipBarComponent>
                    )}
                    enableGridX={enableGridX}
                    enableGridY={enableGridY}
                    enableLabel={enableLabel}
                    reverse={reverse}
                    groupMode={groupMode}
                    padding={padding}
                    innerPadding={innerPadding}
                    borderRadius={borderRadius}
                    borderWidth={borderWidth}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: tickRotation,
                        legendOffset: 32
                    }}
                />
            </div>
        </>
    );
};

export default BarDiagram;
