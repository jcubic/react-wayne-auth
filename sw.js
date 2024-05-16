import { Wayne } from '@jcubic/wayne';

const app = new Wayne();

app.get('/api/hello/', (req, res) => {
   res.text('Hello, Service Worker!');
});
