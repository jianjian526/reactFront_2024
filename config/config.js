import { defineConfig } from 'umi';

export default defineConfig({
  // 其他配置项...
  request: {
    dataField: '',
  },
  webpack: {
    rules: [
      {
        test: /\.(txt)$/i,
        loader: 'file-loader',
        options: {
          publicPath: 'assets',
        },
      },
      // 其他加载器配置...
    ],
  },
});
