// File: GetFullDirController.ts
import { Controller, Get, Query } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller('GetFullDir')
export class GetFullDirController {
  @Get()
  getDirTree(@Query('dir') dir?: string) {
    console.log('Received request with dir:', dir);

    try {
      const reactBaseDir = path.resolve('C:/Users/user/Desktop/projects/personal_ws/personal_ws/src/components');
      const targetDir = dir ? path.resolve(dir) : reactBaseDir;

      const normalizedBase = path.normalize(reactBaseDir).toLowerCase();
      const normalizedTarget = path.normalize(targetDir).toLowerCase();

      if (!normalizedTarget.startsWith(normalizedBase)) {
        console.log('Access forbidden: target is outside React src');
        return { error: 'Access to this directory is forbidden' };
      }

      const readDirRecursive = (dirPath: string): any => {
        let stats: fs.Stats;
        try {
          stats = fs.statSync(dirPath);
        } catch (err) {
          return { name: path.basename(dirPath), type: 'file', error: (err as Error).message };
        }

        if (!stats.isDirectory()) return { name: path.basename(dirPath), type: 'file' };

        const children = fs.readdirSync(dirPath).map((child) =>
          readDirRecursive(path.join(dirPath, child))
        );

        return { name: path.basename(dirPath), type: 'folder', children };
      };

      return readDirRecursive(targetDir);
    } catch (err) {
      return { error: `Failed to read directory: ${(err as Error).message}` };
    }
  }
}
