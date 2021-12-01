import { CONTROLLER_NUMBER, CONTROLLER_RANGE, CONTROLLER_SELECT, TAB_STYLE } from "../../classes/modules/ControllersManager";

export default function legendControllers(element) {
    element.startControlSection("legend_styles", {
        tab: TAB_STYLE,
        label: "Legend",
    });

    element.addControl('legend_anchor', {
        type: CONTROLLER_SELECT,
        label: 'Anchor',
        options: [
            {
            label: 'top',
            value: 'top'
            },
            {
            label: 'top-right',
            value: 'top-right'
            },
            {
            label: 'right',
            value: 'right',
            },
            {
            label: 'bottom-right',
            value: 'bottom-right'
            },
            {
            label: 'bottom',
            value: 'bottom',
            },
            {
            label: 'bottom-left',
            value: 'bottom-left',
            },
            {
            label: 'left',
            value: 'left',
            },
            {
            label: 'top-left',
            value: 'top-left',
            }
        ]
    })

    element.addControl("legend_direction", {
        type: CONTROLLER_SELECT,
        label: "Direction",
        options: [
            {
            label: 'column',
            value: 'column'
            },
            {
            label: 'row',
            value: 'row'
            },
        ],
        default: 'column'
    });

    element.addControl("legend_item_direction", {
        type: CONTROLLER_SELECT,
        label: "Legend item direction",
        options: [
            {
            label: 'left-to-right',
            value: 'left-to-right'
            },
            {
            label: 'right-to-left',
            value: 'right-to-left'
            },
            {
            label: 'top-to-bottom',
            value: 'top-to-bottom'
            },
            {
            label: 'bottom-to-top',
            value: 'bottom-to-top'
            },
        ],
        default: 'left-to-right'
    });
    
    element.addControl("legend_translate_x", {
        type: CONTROLLER_NUMBER,
        label: "TranslateX",
    });
    
    element.addControl("legend_translate_y", {
        type: CONTROLLER_NUMBER,
        label: "TranslateY",
    });

    element.addControl("legend_items_spacing", {
        type: CONTROLLER_NUMBER,
        label: "Items Spacing",
    });
    
    element.addControl("legend_item_width", {
        type: CONTROLLER_NUMBER,
        label: "Item Width",
    });

    element.addControl("legend_item_height", {
        type: CONTROLLER_NUMBER,
        label: "Item Height",
    });

    element.addControl("legend_item_opacity", {
        type: CONTROLLER_RANGE,
        label: "Item Opacithy",
        default: 1,
        min: 0,
        max: 1,
        step: 0.01
    });
    
    element.addControl("legend_symbol_size", {
        type: CONTROLLER_NUMBER,
        label: "Symbol size",
    });

    element.addControl("legend_symbol_shape", {
        type: CONTROLLER_SELECT,
        label: "Symbol shape",
        options: [
            {
            label: 'square',
            value: 'square'
            },
            {
            label: 'circle',
            value: 'circle'
            },
            {
            label: 'triangle',
            value: 'triangle'
            },
            {
            label: 'diamond',
            value: 'diamond'
            },
        ],
    });

    element.endControlSection()
}