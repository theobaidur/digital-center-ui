import { zipDirContents } from '@papb/zip';
import { existsSync, unlinkSync } from 'fs';

(async () => {
    const output = 'bundle.zip';
    if(existsSync(output)){
        unlinkSync(output);
    }
    await zipDirContents('dist/digital-center-ui', output);
})();
