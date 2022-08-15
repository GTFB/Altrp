import BaseElement from "./BaseElement";
import TestIcon from "../../../svgs/accordion.svg";
import { TAB_STYLE, CONTROLLER_REPEATER, CONTROLLER_SELECT, CONTROLLER_TEXT, TAB_CONTENT, CONTROLLER_TEXTAREA, CONTROLLER_COLOR, CONTROLLER_DIMENSIONS, CONTROLLER_SLIDER, CONTROLLER_TYPOGRAPHIC } from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Tournament extends BaseElement {
  static getTitle() {
    return "Tournament";
  }

  static getName() {
    return "tournament";
  }

  static getType() {
    return "widget";
  }

  static getIconComponent() {
    return TestIcon;
  }

  static getGroup() {
    return "Advanced";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("content", {
      tab: TAB_CONTENT,
      label: "Content",
    });

    this.addControl('path', {
      label: 'Path',
      type: CONTROLLER_TEXTAREA,
      locked: true,
    })

    this.endControlSection();

    this.startControlSection("headers_section", {
      tab: TAB_STYLE,
      label: "Headers",
    });

    this.addControl('headers_color', {
      label: 'Color',
      type: CONTROLLER_COLOR,
    })

    this.addControl('headers_typographic', {
      label: 'Typographic',
      type: CONTROLLER_TYPOGRAPHIC,
    })

    this.addControl('headers_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.endControlSection();

    this.startControlSection('players_section', {
      label: 'Players',
      tab: TAB_STYLE,
    })

    this.addControl('player_height', {
      label: 'Height',
      type: CONTROLLER_SLIDER,
      units: ['px', '%', 'vh', 'vw'],
      min: 20,
      max: 100,
      step: 1
    })

    this.addControl('players_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_background_color', {
      label: 'Background Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_score_padding', {
      label: 'Score Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_score_color', {
      label: 'Score Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_score_typographic', {
      label: 'Score Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_seed_padding', {
      label: 'Seed Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_seed_color', {
      label: 'Seed Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_seed_typographic', {
      label: 'Seed Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_label_color', {
      label: 'Label Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_label_typographic', {
      label: 'Label Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'solid',
          'label': 'Solid',
        },
        {
          'value': 'double',
          'label': 'Double',
        },
        {
          'value': 'dotted',
          'label': 'Dotted',
        },
        {
          'value': 'dashed',
          'label': 'Dashed',
        },
        {
          'value': 'groove',
          'label': 'Groove',
        },
      ],
    });

    this.addControl('players_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('players_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
    });

    this.addControl('players_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection()

    this.startControlSection('players_winners_section', {
      label: 'Players Winners',
      tab: TAB_STYLE,
    })

    this.addControl('players_winners_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_winners_background_color', {
      label: 'Background Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_winners_score_padding', {
      label: 'Score Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_winners_score_color', {
      label: 'Score Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_winners_score_typographic', {
      label: 'Score Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_winners_seed_padding', {
      label: 'Seed Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_winners_seed_color', {
      label: 'Seed Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_winners_seed_typographic', {
      label: 'Seed Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_winners_label_color', {
      label: 'Label Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_winners_label_typographic', {
      label: 'Label Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_winners_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'solid',
          'label': 'Solid',
        },
        {
          'value': 'double',
          'label': 'Double',
        },
        {
          'value': 'dotted',
          'label': 'Dotted',
        },
        {
          'value': 'dashed',
          'label': 'Dashed',
        },
        {
          'value': 'groove',
          'label': 'Groove',
        },
      ],
    });

    this.addControl('players_winners_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('players_winners_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
    });

    this.addControl('players_winners_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection()

    this.startControlSection('players_highlighted_section', {
      label: 'Players Highlighted',
      tab: TAB_STYLE,
    })

    this.addControl('players_highlighted_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_highlighted_background_color', {
      label: 'Background Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_highlighted_score_padding', {
      label: 'Score Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_highlighted_score_color', {
      label: 'Score Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_highlighted_score_typographic', {
      label: 'Score Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_highlighted_seed_padding', {
      label: 'Seed Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.addControl('players_highlighted_seed_color', {
      label: 'Seed Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_highlighted_seed_typographic', {
      label: 'Seed Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_highlighted_label_color', {
      label: 'Label Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('players_highlighted_label_typographic', {
      label: 'Label Typographic',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('players_highlighted_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'solid',
          'label': 'Solid',
        },
        {
          'value': 'double',
          'label': 'Double',
        },
        {
          'value': 'dotted',
          'label': 'Dotted',
        },
        {
          'value': 'dashed',
          'label': 'Dashed',
        },
        {
          'value': 'groove',
          'label': 'Groove',
        },
      ],
    });

    this.addControl('players_highlighted_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('players_highlighted_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
    });

    this.addControl('players_highlighted_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection()


    this.startControlSection('lines_section', {
      label: 'Lines',
      tab: TAB_STYLE
    })

    this.addControl('line_type', {
      type: CONTROLLER_SELECT,
      label: 'Line Type',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'solid',
          'label': 'Solid',
        },
        {
          'value': 'dashed',
          'label': 'Dashed',
        },
        {
          'value': 'groove',
          'label': 'Groove',
        },
      ],
    })

    this.addControl('line_color', {
      label: 'Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('line_width', {
      label: 'Width',
      type: CONTROLLER_SLIDER,
      units: ['px', '%', 'vh', 'vw'],
      max: 20,
      min: 1,
      step: 1,
    })

    this.endControlSection()

    this.startControlSection('match_id_section', {
      label: 'Match id',
      tab: TAB_STYLE
    })

    this.addControl('match_id_color', {
      label: 'Color',
      type: CONTROLLER_COLOR,
    })

    this.addControl('match_id_typographic', {
      label: 'Typographic',
      type: CONTROLLER_TYPOGRAPHIC,
    })

    this.addControl('match_id_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.endControlSection()

    this.startControlSection('image_section', {
      label: 'Image',
      tab: TAB_STYLE,
    })

    this.addControl('image_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
    })

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Tournament;
