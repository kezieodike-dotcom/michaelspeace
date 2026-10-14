import {spawn} from 'node:child_process';
import {dirname,delimiter} from 'node:path';
const child=spawn(process.execPath,process.argv.slice(2),{cwd:process.cwd(),windowsHide:true,stdio:'inherit',env:{...process.env,PATH:dirname(process.execPath)+delimiter+process.env.PATH}});
child.on('close',code=>process.exit(code??1));
