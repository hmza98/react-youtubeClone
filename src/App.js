import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Searchbar from "./components/searchbar";
import HomePage from "./components/homePage";
import NotFound from "./components/NotFound";
import ResultPage from "./components/resultPage";
import PlayerScreen from "./components/playerScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Searchbar />
      </div>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/results" component={ResultPage} exact />
        <Route path="/watch" component={PlayerScreen} exact />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
