````vue
import viteCompressions from 'vite-plugin-compression';
plugins: [
        vue(),
        viteCompressions({
            // 压缩选项，例如：gzip压缩级别（0-9）
            verbose: true, // 显示压缩结果信息
            disable: false, // 是否禁用压缩（默认false）
            deleteOriginFile: false, // 是否删除原文件（默认false）
            threshold: 10240, // 压缩前最小体积限制（默认10240字节）
            algorithm: 'gzip', // 压缩算法，可选'gzip'或'brotli'（默认'gzip'）
            ext: '.gz', // 压缩包后缀（默认'.gz'）
        })
],
  // 配置Rollup手动分块策略
  build : {
    // 手动分块配置
    rollupOptions : {
      // 手动分块函数，根据模块ID返回分块名称
      output: {
        // @ts-ignore
        manualChunks(id){
          // 手动分块：将node_modules中的JS/TS文件单独分块为'vendor'块
          if( id.includes('node_modules') && ( id.endsWith('.js') || id.endsWith('.ts') ) ){
            return 'vendor';
          }
        },
      }
    }
  },
````