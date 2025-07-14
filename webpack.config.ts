import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './configwebpack/build/buildWebpackConfg';
import { BuildEnv, BuildPaths } from './configwebpack/build/types/config';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'webcomponents', 'index.ts'),
        build: path.resolve(__dirname, 'public', 'javascript'),
    };

    const mode = 'development';
    const isDev = mode === 'development';
    const PORT = 3000;

    const config: webpack.Configuration = buildWebpackConfig({
        mode: 'development',
        paths,
        isDev,
        port: PORT,
    });

    return config;
};
