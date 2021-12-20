import { CONTROLLER_CHOOSE, CONTROLLER_COLOR, CONTROLLER_DIMENSIONS, CONTROLLER_TYPOGRAPHIC, TAB_STYLE } from "../../classes/modules/ControllersManager";

export default function titleControllers(element) {
    
    element.startControlSection("title_styles", {
        tab: TAB_STYLE,
        label: "Title",
    });

    element.addControl('title_color', {
        label: 'Color',
        type: CONTROLLER_COLOR
    })

    element.addControl('title_typography', {
        label: 'Typography',
        type: CONTROLLER_TYPOGRAPHIC,
    })

    element.addControl("title_padding", {
        type: CONTROLLER_DIMENSIONS,
        label: "Padding",
        units: ["px", "%", "vh"],
    });

    element.addControl('title_alignment', {
        type: CONTROLLER_CHOOSE,
        label: 'Alignment',
        options: [
            {
            icon: 'left',
            value: 'left',
            },
            {
            icon: 'center',
            value: 'center',
            },
            {
            icon: 'right',
            value: 'right',
            }
        ],
    });

    element.endControlSection()

    element.startControlSection("subtitle_styles", {
        tab: TAB_STYLE,
        label: "Subtitle",
    });

    element.addControl('subtitle_color', {
        label: 'Color',
        type: CONTROLLER_COLOR
    })

    element.addControl('subtitle_typography', {
        label: 'Typography',
        type: CONTROLLER_TYPOGRAPHIC,
    })

    element.addControl("subtitle_padding", {
        type: CONTROLLER_DIMENSIONS,
        label: "Padding",
        units: ["px", "%", "vh"],
    });

    element.addControl('subtitle_alignment', {
        type: CONTROLLER_CHOOSE,
        label: 'Alignment',
        options: [
            {
            icon: 'left',
            value: 'left',
            },
            {
            icon: 'center',
            value: 'center',
            },
            {
            icon: 'right',
            value: 'right',
            }
        ],
    });

    element.endControlSection()
}