import { Wayne } from '@jcubic/wayne';

const app = new Wayne();

app.get('/api/hello/', (req, res) => {
   res.text('Hello, Service Worker!');
});

app.get('/api/hello', (req, res) => {
   res.redirect(301, req.url + '/');
});
