const { spawn } = require('child_process');

const backend = spawn('npm', ['--prefix', 'backend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

const frontend = spawn('npm', ['--prefix', 'backend/client', 'run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'], {
  stdio: 'inherit',
  shell: true,
});

backend.on('exit', (code) => {
  if (code !== 0) {
    frontend.kill();
    process.exit(code ?? 1);
  }
});

frontend.on('exit', (code) => {
  backend.kill();
  process.exit(code ?? 1);
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit(0);
});
