import {
  Header,
  Produtos,
  Produto,
  Sobre
} from "./components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className='container-fluid mt-3'>
          <Switch>
            <Route path='/' exact component={Produtos} />
            <Route path='/produtos/:id' exact component={Produto} />
            <Route path='/sobre' component={Sobre} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
