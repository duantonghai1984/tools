import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();


app.model(require("./models/loginObj"));
app.model(require("./models/SearchWin"));
app.model(require("./models/policys"));


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
//app.model(require('./models/loginObj'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
