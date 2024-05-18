import { Wayne } from '@jcubic/wayne';
import jwt from './jwt';

const app = new Wayne();

app.get('/api/hello/', (req, res) => {
   res.text('Hello, Service Worker!');
});

app.get('/api/hello', (req, res) => {
   res.redirect(301, req.url + '/');
});

app.post('/api/login', async (req, res) => {
    const { username, password } = await req.json() ?? {};
    if (username === 'demo' && password === 'demo') {
        const token = await jwt.sign({ username });
        res.json({ result: token });
    } else {
        res.json({ error: 'Invalid username or password' });
    }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
