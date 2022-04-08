import { CONTROLLER_NUMBER, CONTROLLER_RANGE, CONTROLLER_SELECT, CONTROLLER_SLIDER, TAB_STYLE } from "../../classes/modules/ControllersManager";

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
            label: 'Top',
            value: 'top'
            },
            {
            label: 'Top Right',
            value: 'top-right'
            },
            {
            label: 'Right',
            value: 'right',
            },
            {
            label: 'Bottom Right',
            value: 'bottom-right'
            },
            {
            label: 'Bottom',
            value: 'bottom',
            },
            {
            label: 'Bottom Left',
            value: 'bottom-left',
            },
            {
            label: 'Left',
            value: 'left',
            },
            {
            label: 'Top Left',
            value: 'top-left',
            }
        ],
        locked: true,
    })

    element.addControl("legend_direction", {
        type: CONTROLLER_SELECT,
        label: "Direction",
        options: [
            {
            label: 'Column',
            value: 'column'
            },
            {
            label: 'Row',
            value: 'row'
            },
        ],
        default: 'column',
        locked: true,
    });

    element.addControl("legend_item_direction", {
        type: CONTROLLER_SELECT,
        label: "Legend item direction",
        options: [
            {
            label: 'Left To Right',
            value: 'left-to-right'
            },
            {
            label: 'Right To Left',
            value: 'right-to-left'
            },
            {
            label: 'Top To Bottom',
            value: 'top-to-bottom'
            },
            {
            label: 'Bottom To Top',
            value: 'bottom-to-top'
            },
        ],
        default: 'left-to-right',
        locked: true,
    });
    
    element.addControl("legend_translate_x", {
        type: CONTROLLER_NUMBER,
        label: "TranslateX",
        locked: true,
    });
    
    element.addControl("legend_translate_y", {
        type: CONTROLLER_NUMBER,
        label: "TranslateY",
        locked: true,
    });

    element.addControl("legend_items_spacing", {
        type: CONTROLLER_NUMBER,
        label: "Items Spacing",
        locked: true,
    });
    
    element.addControl("legend_item_width", {
        type: CONTROLLER_NUMBER,
        label: "Item Width",
        locked: true,
    });

    element.addControl("legend_item_height", {
        type: CONTROLLER_NUMBER,
        label: "Item Height",
        locked: true,
    });

    element.addControl("legend_item_opacity", {
        type: CONTROLLER_SLIDER,
        label: "Item Opacity",
        default: 1,
        min: 0,
        max: 1,
        step: 0.01,
        locked: true,
    });
    
    element.addControl("legend_symbol_size", {
        type: CONTROLLER_NUMBER,
        label: "Symbol size",
        locked: true,
    });

    element.addControl("legend_symbol_shape", {
        type: CONTROLLER_SELECT,
        label: "Symbol shape",
        options: [
            {
                label: 'Circle',
                value: 'circle'
            },
            {
                label: 'Square',
                value: 'square'
            },
            {
                label: 'Triangle',
                value: 'triangle'
            },
            {
                label: 'Diamond',
                value: 'diamond'
            },
        ],
        locked: true,
    });

    element.endControlSection()
}