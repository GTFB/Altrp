import * as React from "react";

import { Button, H5, Intent, TagProps, MenuItem, Switch } from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import { MultiSelect } from "@blueprintjs/select";

import {
  areFilmsEqual,
  arrayContainsFilm,
  // createFilm,
  filmSelectProps,
  // IFilm,
  maybeAddCreatedFilmToArrays,
  maybeDeleteCreatedFilmFromArrays,
  // renderCreateFilmOption,
  TOP_100_FILMS,
} from "./TestMultiSelect";

const FilmMultiSelect = MultiSelect;

// const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

export class MultiSelectExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // allowCreate: false,
      createdItems: [],
      // fill: false,
      films: [],
      // hasInitialContent: false,
      // intent: false,
      items: filmSelectProps.items,
      // openOnKeyDown: false,
      // popoverMinimal: true,
      // resetOnSelect: true,
      // tagMinimal: false,
    }
  }

  // handleAllowCreateChange = this.handleSwitchChange("allowCreate");

  // handleKeyDownChange = this.handleSwitchChange("openOnKeyDown");

  // handleResetChange = this.handleSwitchChange("resetOnSelect");

  // handlePopoverMinimalChange = this.handleSwitchChange("popoverMinimal");

  // handleTagMinimalChange = this.handleSwitchChange("tagMinimal");

  // handleFillChange = this.handleSwitchChange("fill");

  // handleIntentChange = this.handleSwitchChange("intent");

  // handleInitialContentChange = this.handleSwitchChange("hasInitialContent");

  render() {
    const { films, ...flags } = this.state;
    // const getTagProps = (_value, index) => ({
    //   intent: this.state.intent ? INTENTS[index % INTENTS.length] : Intent.NONE,
    //   // minimal: tagMinimal,
    // });

    // const initialContent = this.state.hasInitialContent ? (
    //   <MenuItem disabled={true} text={`${TOP_100_FILMS.length} items loaded.`} />
    // ) : // explicit undefined (not null) for default behavior (show full list)
    //   undefined;
    // const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
    // const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmOption : null;

    const clearButton =
      films.length > 0 ? <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;

    return (
      <Example options={this.renderOptions()} {...this.props}>
        <FilmMultiSelect
          {...filmSelectProps} // здесь рендер, предикате, итемс
          {...flags}
          // createNewItemFromQuery={maybeCreateNewItemFromQuery}
          // createNewItemRenderer={maybeCreateNewItemRenderer}
          // initialContent={initialContent}
          itemRenderer={this.renderFilm}
          itemsEqual={areFilmsEqual}
          onItemSelect={this.handleFilmSelect}
          onItemsPaste={this.handleFilmsPaste}
          items={this.state.items}
          noResults={<MenuItem disabled={true} text="No results." />}

          // popoverProps={{ minimal: popoverMinimal }}
          tagRenderer={this.renderTag}
          tagInputProps={{
            onRemove: this.handleTagRemove,
            rightElement: clearButton,
            // tagProps: getTagProps,
          }}
          selectedItems={this.state.films}
        />
      </Example>
    );
  }

  // renderOptions() {
  //   return (
  //     <>
  //       <H5>Props</H5>
  //       <Switch
  //         label="Open popover on key down"
  //         checked={this.state.openOnKeyDown}
  //         onChange={this.handleKeyDownChange}
  //       />
  //       <Switch
  //         label="Reset query on select"
  //         checked={this.state.resetOnSelect}
  //         onChange={this.handleResetChange}
  //       />
  //       <Switch
  //         label="Use initial content"
  //         checked={this.state.hasInitialContent}
  //         onChange={this.handleInitialContentChange}
  //       />
  //       <Switch
  //         label="Allow creating new films"
  //         checked={this.state.allowCreate}
  //         onChange={this.handleAllowCreateChange}
  //       />
  //       <Switch label="Fill container width" checked={this.state.fill} onChange={this.handleFillChange} />
  //       <H5>Tag props</H5>
  //       <Switch
  //         label="Minimal tag style"
  //         checked={this.state.tagMinimal}
  //         onChange={this.handleTagMinimalChange}
  //       />
  //       <Switch
  //         label="Cycle through tag intents"
  //         checked={this.state.intent}
  //         onChange={this.handleIntentChange}
  //       />
  //       <H5>Popover props</H5>
  //       <Switch
  //         label="Minimal popover style"
  //         checked={this.state.popoverMinimal}
  //         onChange={this.handlePopoverMinimalChange}
  //       />
  //     </>
  //   );
  // }

  renderTag = (film) => film.title;

  // NOTE: not using Films.itemRenderer here so we can set icons.
  renderFilm = (film, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isFilmSelected(film) ? "tick" : "blank"}
        key={film.rank}
        label={film.year.toString()}
        onClick={handleClick}
        text={`${film.rank}. ${film.title}`}
        shouldDismissPopover={false}
      />
    );
  };

  handleTagRemove = (_tag, index) => {
    this.deselectFilm(index);
  };

  getSelectedFilmIndex(film) {
    return this.state.films.indexOf(film);
  }

  isFilmSelected(film) {
    return this.getSelectedFilmIndex(film) !== -1;
  }

  selectFilm(film) {
    this.selectFilms([film]);
  }

  selectFilms(filmsToSelect) {
    const { createdItems, films, items } = this.state;

    let nextCreatedItems = createdItems.slice();
    let nextFilms = films.slice();
    let nextItems = items.slice();

    filmsToSelect.forEach(film => {
      const results = maybeAddCreatedFilmToArrays(nextItems, nextCreatedItems, film);
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create
      // Item" option will be shown even if it matches an already selected
      // item).
      nextFilms = !arrayContainsFilm(nextFilms, film) ? [...nextFilms, film] : nextFilms;
    });

    this.setState({
      createdItems: nextCreatedItems,
      films: nextFilms,
      items: nextItems,
    });
  }

  deselectFilm(index) {
    const { films } = this.state;

    const film = films[index];
    const { createdItems: nextCreatedItems, items: nextItems } = maybeDeleteCreatedFilmFromArrays(
      this.state.items,
      this.state.createdItems,
      film,
    );

    // Delete the item if the user manually created it.
    this.setState({
      createdItems: nextCreatedItems,
      films: films.filter((_film, i) => i !== index),
      items: nextItems,
    });
  }

  handleFilmSelect = (film) => {
    if (!this.isFilmSelected(film)) {
      this.selectFilm(film);
    } else {
      this.deselectFilm(this.getSelectedFilmIndex(film));
    }
  };

  handleFilmsPaste = (films) => {
    // On paste, don't bother with deselecting already selected values, just
    // add the new ones.
    this.selectFilms(films);
  };

  // handleSwitchChange(prop) {
  //   return (event) => {
  //     const checked = event.currentTarget.checked;
  //     this.setState(state => ({ ...state, [prop]: checked }));
  //   };
  // }

  handleClear = () => this.setState({ films: [] })
}