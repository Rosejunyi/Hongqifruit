const fs = require('fs');
const path = require('path');

/**
 * 清理临时文件
 */

function cleanupTempFiles() {
    console.log('=== 清理临时文件 ===');
    
    const filesToClean = [
        'temp_ppt.zip',
        'temp_extracted'
    ];
    
    filesToClean.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                const stats = fs.statSync(file);
                if (stats.isDirectory()) {
                    // 递归删除目录
                    fs.rmSync(file, { recursive: true, force: true });
                    console.log(`✓ 已删除目录: ${file}`);
                } else {
                    // 删除文件
                    fs.unlinkSync(file);
                    console.log(`✓ 已删除文件: ${file}`);
                }
            } else {
                console.log(`- 文件不存在: ${file}`);
            }
        } catch (error) {
            console.error(`✗ 删除失败 ${file}:`, error.message);
        }
    });
    
    console.log('\n=== 清理完成 ===');
}

function showImageSummary() {
    console.log('\n=== 图片集成总结 ===');
    
    const categories = ['products', 'factory', 'certificates', 'logos', 'others'];
    let totalImages = 0;
    
    categories.forEach(category => {
        const categoryDir = `public/images/${category}`;
        if (fs.existsSync(categoryDir)) {
            const files = fs.readdirSync(categoryDir);
            const imageFiles = files.filter(f => 
                ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.wdp'].includes(path.extname(f).toLowerCase())
            );
            console.log(`${category}: ${imageFiles.length} 张图片`);
            totalImages += imageFiles.length;
        } else {
            console.log(`${category}: 0 张图片 (目录不存在)`);
        }
    });
    
    console.log(`\n总计: ${totalImages} 张图片已成功集成到网站`);
    
    console.log('\n已更新的页面:');
    console.log('- 首页 (page.tsx): Hero背景图 + 产品预览图');
    console.log('- 关于页面 (about/page.tsx): 企业形象图 + 工厂设施图 + 证书展示');
    console.log('- 产品页面 (products/page.tsx): 各类产品图片');
    console.log('- 布局 (layout.tsx): 头部Logo');
    
    console.log('\n网站地址: http://localhost:3001');
    console.log('请在浏览器中查看更新后的效果！');
}

function main() {
    cleanupTempFiles();
    showImageSummary();
}

if (require.main === module) {
    main();
}

module.exports = { cleanupTempFiles, showImageSummary };
