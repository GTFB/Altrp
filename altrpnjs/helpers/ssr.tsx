import { ServerStyleSheet } from "styled-components"
import React from "react";
import { Router, Switch, Route} from "react-router-dom";
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux";

// import AreaComponent from "../../resources/modules/front-app/src/js/components/AreaComponent";
// const AreaComponent = require("../../resources/modules/front-app/src/js/components/AreaComponent")
// import store from "../../resources/modules/front-app/src/js/store/store";
const store = require("../../resources/modules/front-app/src/js/store/store");
import GlobalStyles from "../../resources/modules/front-app/src/js/components/GlobalStyles";

const ssr = () => {
  const sheet = new ServerStyleSheet();

  let resultSSRApp = ReactDOMServer.renderToString(
    sheet.collectStyles(
      // <div>
      //   sadasdasdas
      // </div>
      <Router>
        <Switch>
          <Route path='*' exact>
            <Provider store={store}>
              sdsadas
              {/*<div className="route-content" id="route-content" areas={page}>*/}
              {/*  {page.map((area, idx) => {*/}
              {/*    return (*/}
              {/*      <AreaComponent*/}
              {/*        {...area}*/}
              {/*        area={area}*/}
              {/*        areas={page}*/}
              {/*        page={page_id}*/}
              {/*        models={[page_model]}*/}
              {/*        key={"appArea_" + area.id}*/}
              {/*      />*/}
              {/*    );*/}
              {/*  })}*/}
              {/*  <GlobalStyles/>*/}
              {/*</div>*/}
            </Provider>
          </Route>
        </Switch>
      </Router>
    )
  );

  return resultSSRApp
}

export default ssr
