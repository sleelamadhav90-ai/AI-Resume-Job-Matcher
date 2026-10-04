import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import { handleAnalyzeExpress } from './app/api/analyze/route';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// API Routes
app.post(
  '/api/analyze',
  (req, res, next) => {
    upload.array('resumes', 10)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: err.message });
      } else if (err) {
        return res.status(500).json({ success: false, error: 'Upload failed' });
      }
      next();
    });
  },
  handleAnalyzeExpress
);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'hireme-ai-api' });
});

// Middleware (Static/SPA & Error)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development: Vite middleware
  import('vite').then(({ createServer: createViteServer }) => {
    createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    }).then((vite) => {
      app.use(vite.middlewares);
    });
  });
}

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Global Error Handler:', err);
  res.status(500).json({ success: false, error: err.message || 'Server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
