import React from "react";
import {Select} from "@blueprintjs/select";
import {Button, MenuItem, ButtonGroup, Alignment} from "@blueprintjs/core";
import ButtonController from "../controllers/ButtonController";
import AltrpMeta from "../../classes/AltrpMeta";
import {connect} from "react-redux";
import {controllerMapStateToProps} from "../../decorators/controller";
import {getCurrentElement} from "../../store/store";
import Controller from "../../classes/Controller";
import {editGlobalColor, editGlobalEffect, setGlobalColors} from "../../store/altrp-global-colors/actions";
import {deleteGlobalStylesPresets, updateGlobalStylesPresets} from "../../store/altrp-global-styles/actions";
import CONSTANTS from "../../consts";

/**
 * @return {boolean}
 */
function ItemPredicate(query, value) {

  if(!query) {
    return true
  }

  const index = _.findIndex(_.split(value, ""), char => {
    let similar = false;
    _.split(query, "").forEach(queryChar => {
      if(queryChar === char) {
        similar = true
      }
    });
    return similar
  });

  if(index !== -1) {
    return true
  } else {
    return false
  }
}

function ItemRenderer(query, { handleClick, modifiers }) {

  async function deletePreset() {
    const currentElement = getCurrentElement();
    const settings = currentElement.getSettings();

    const meta = await AltrpMeta.getMetaByName("global_styles");
    const metaValue = meta.getMetaValue({});

    delete metaValue[currentElement.getName()][query];

    await meta.save();

    const needUpdate = [];

    let element = altrpEditor.modules.templateDataStorage.getRootElement();

    function findSimilar(firstElement) {
      const childs = firstElement.getChildren();

      if(childs.length !== 0) {
        childs.forEach(child => {
          const name = child.getName();

          if(currentElement.getName() === name) {
            const preset = child.getSettings("global_styles_presets", "");
            const currentPreset = currentElement.getSettings("global_styles_presets", "");

            if(preset === currentPreset) {
              needUpdate.push(child)
            }
          }

          findSimilar(child)
        })
      }
    }
    findSimilar(element);

    delete settings.global_styles_presets;

    needUpdate.forEach(elem => {
      elem.setSettings(settings);
    })

    appStore.dispatch(
      deleteGlobalStylesPresets(currentElement.getName(), query)
    );
  }

  return <ButtonGroup key={query} className="state-section-style-preset" minimal>
    <Button
      fill
      text={query}
      alignText={Alignment.LEFT}
      onClick={handleClick}
    />
    <Button
      title="delete this preset"
      onClick={deletePreset}
      intent="danger"
      icon="cross"
    />
  </ButtonGroup>

}

function ItemCreateRenderer(query, active, handleClick) {

  async function create() {
    const controlsNames = [];

    const currentElement = getCurrentElement();

    if (currentElement.getName) {
      let tabs = controllersManager.getControls(currentElement.getName());

      tabs.style.forEach(tab => {
        tab.controls.forEach(control => {
          controlsNames.push(control.controlId)
        });
      });
    }

    const controls = {};

    controlsNames.forEach(name => {
      controls[name] = currentElement.settings[name]
    });

    let meta = await AltrpMeta.getMetaByName("global_styles");
    const metaValue = meta.getMetaValue({});

    if(metaValue[currentElement.getName()]) {
      _.keys(metaValue[currentElement.getName()]).forEach((name) => {
        if(query === name) {
          throw "для пресета требуется уникальное имя"
        }
      })
    }

    meta.setMetaValue({
      ...metaValue,
      [currentElement.getName()]: {
        ...metaValue[currentElement.getName()],
        [query]: controls
      }
    });

    await meta.save();

    appStore.dispatch(
      updateGlobalStylesPresets(currentElement.getName(), query, controls)
    );

    handleClick()
  }

  return <MenuItem
    icon="add"
    text={`Create preset`}
    onClick={create}
  />
}

class GlobalStyles extends React.Component {
  constructor(props) {
    super(props);
    const currentElement = props.currentElement;
    const presets = props.globalStylesPresets.styles;
    let items = [];
    if(presets[currentElement.getName()]) {
      items =_.keys(presets[currentElement.getName()])
    }
    const currentPreset = currentElement.getSettings("global_styles_presets", "")

    this.state = {
      currentElementId: currentElement.getId(),
      query: "",
      current: currentPreset,
      items,
    };

    this.updateCurrent = this.updateCurrent.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const currentElement = this.props.currentElement;
    const presets = this.props.globalStylesPresets.styles;
    let items = [];
    if (presets[currentElement.getName()]) {
      items = _.keys(presets[currentElement.getName()])
    }

    if (!_.isEqual(this.state.items, items)) {
      this.setState((s) => ({
        ...s,
        items,
      }))
    }

    if(currentElement.getId() !== this.state.currentElementId) {
      const currentElementSettings = currentElement.getSettings("global_styles_presets", "");
      let items = this.props.globalStylesPresets.styles[currentElement.getName()] || {};

      this.setState((s) => ({
        ...s,
        currentElementId: currentElement.getId(),
        current: currentElementSettings,
        query: "",
        items: _.keys(items),
      }))
    }
    if(this.state.current) {
      let removeCurrent = _.findIndex(this.state.items, (item) => item === this.state.current);

      if(removeCurrent === -1) {
        this.setState((s) => ({
          ...s,
          current: ""
        }))
      }
    }

    if(JSON.stringify(this.props.controllerValue) !== JSON.stringify(prevProps.controllerValue)) {
      this.save(prevProps)
    }
  }

  updateCurrent(current) {
    const currentElement = this.props.currentElement;
    let isNewPreset = this.state.items.findIndex(preset => current === preset);

    const settings = currentElement.getSettings();


    console.log(this.props.globalStylesPresets.styles[currentElement.getName()][current])
    currentElement.setSettings({
      ...settings,
      ...this.props.globalStylesPresets.styles[currentElement.getName()][current],
      global_styles_presets: current
    });

    if(isNewPreset === -1) {
      this.setState((s) => ({
        ...s,
        current,
        query: "",
        items: [current, ...s.items]
      }))
    } else {
      this.setState((s) => ({
        ...s,
        query: "",
        current
      }))
    }


  }

  save() {
    if(this.state.current) {
      const currentElement = this.props.currentElement;
      // настроки елемента

      const controlsNames = [];

      if (currentElement.getName) {
        let tabs = controllersManager.getControls(currentElement.getName());

        tabs.style.forEach(tab => {
          tab.controls.forEach(control => {
            controlsNames.push(control.controlId)
          });
        });
      }

      const controls = {};

      controlsNames.forEach(name => {
        controls[name] = currentElement.settings[name]
      });

      AltrpMeta.getMetaByName("global_styles").then((r) => {
        let metaValue = r.data.metaValue;

        metaValue = {
          ...metaValue,
          [currentElement.getName()]: {
            ...metaValue[currentElement.getName()],
            [this.state.current]: controls
          }
        }

        AltrpMeta.saveGlobalStylesPresets(metaValue).then(r => {
          console.log(r)
        })
        // meta.setMetaValue({
        //   ...metaValue,
        //   [currentElement.getName()]: {
        //     ...metaValue[currentElement.getName()],
        //     [this.state.current]: controls
        //   }
        // });
        // meta.save();
      })

      if(this.props.globalStylesPresets.styles[currentElement.getName()]) {
        this.props.updateGlobalStylesPresets({
          widgetName: currentElement.getName(),
          name: this.state.current,
          controls,
        });
      }

      const needUpdate = [];

      let element = altrpEditor.modules.templateDataStorage.getRootElement();

      function findSimilar(firstElement) {
        const childs = firstElement.getChildren();

        if(childs.length !== 0) {
          childs.forEach(child => {
            const name = child.getName();

            if(currentElement.getName() === name) {
              const preset = child.getSettings("global_styles_presets", "");
              const currentPreset = currentElement.getSettings("global_styles_presets", "");

              if(preset === currentPreset) {
                needUpdate.push(child)
              }
            }

            findSimilar(child)
          })
        }
      }
      findSimilar(element);

      needUpdate.forEach(elem => {
        const settings = elem.getSettings();
        console.log(
          elem,
          {
            ...settings,
            ...this.props.globalStylesPresets.styles[currentElement.getName()][this.state.current],
          }
        )
        elem.setSettings({
          ...settings,
          ...this.props.globalStylesPresets.styles[currentElement.getName()][this.state.current],
        });
      })
    }
  }

  updateQuery(query) {
    query = _.replace(query, " " , "_");

    this.setState((s) => ({
      ...s,
      query
    }))
  }

  render() {
    const items = this.state.items || [];
    const query = this.state.query || "";

    return <div className="state-section-style-presets">
      <Select
        createNewItemFromQuery={(query) => query}
        onQueryChange={this.updateQuery}
        query={query}
        createNewItemRenderer={ItemCreateRenderer}
        itemPredicate={ItemPredicate}
        items={items}
        createNewItemPosition="first"
        noResults={<MenuItem disabled={true} text="No results." />}
        itemRenderer={ItemRenderer}
        onItemSelect={this.updateCurrent}
        popoverProps={{
          targetClassName: "state-section-style-target"
        }}
      >
        <button className="state-section-style-button">
          {
            this.state.current ? this.state.current : "Presets"
          }
        </button>
      </Select>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    globalStylesPresets: state.globalStylesPresets,
    controllerValue: state.controllerValue,
  }
}

const mapDispatchToProps = dispatch => ({
  updateGlobalStylesPresets: payload => dispatch(updateGlobalStylesPresets(payload.widgetName, payload.name, payload.settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalStyles);

