import { existsSync, chmodSync } from 'fs';
import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const isWindows = process.platform === 'win32';

async function setup() {
    const ytDlpPath = join(rootDir, isWindows ? 'yt-dlp.exe' : 'yt-dlp');

    if (!existsSync(ytDlpPath)) {
        console.log('Downloading yt-dlp...');

        if (isWindows) {
            execSync(`curl -L -o "${ytDlpPath}" "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"`, { stdio: 'inherit' });
        } else {
            execSync(`curl -L -o "${ytDlpPath}" "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp"`, { stdio: 'inherit' });
            chmodSync(ytDlpPath, '755');
        }

        console.log('✓ yt-dlp downloaded');
    }
}

setup().catch(console.error);
