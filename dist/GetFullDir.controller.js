"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFullDirController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let GetFullDirController = class GetFullDirController {
    getDirTree(dir) {
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
            const readDirRecursive = (dirPath) => {
                let stats;
                try {
                    stats = fs.statSync(dirPath);
                }
                catch (err) {
                    return { name: path.basename(dirPath), type: 'file', error: err.message };
                }
                if (!stats.isDirectory())
                    return { name: path.basename(dirPath), type: 'file' };
                const children = fs.readdirSync(dirPath).map((child) => readDirRecursive(path.join(dirPath, child)));
                return { name: path.basename(dirPath), type: 'folder', children };
            };
            return readDirRecursive(targetDir);
        }
        catch (err) {
            return { error: `Failed to read directory: ${err.message}` };
        }
    }
};
exports.GetFullDirController = GetFullDirController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('dir')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GetFullDirController.prototype, "getDirTree", null);
exports.GetFullDirController = GetFullDirController = __decorate([
    (0, common_1.Controller)('GetFullDir')
], GetFullDirController);
//# sourceMappingURL=GetFullDir.controller.js.map