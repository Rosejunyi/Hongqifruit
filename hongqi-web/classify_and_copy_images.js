const fs = require('fs');
const path = require('path');

/**
 * 自动分类并复制PPT提取的图片到网站目录
 */

function getImageSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.size;
    } catch (error) {
        return 0;
    }
}

function classifyImageBySize(filename, fileSize) {
    const ext = path.extname(filename).toLowerCase();
    
    // 根据文件大小和格式进行智能分类
    if (fileSize < 20 * 1024) {  // 小于20KB，可能是图标或Logo
        return 'logos';
    } else if (fileSize > 500 * 1024) {  // 大于500KB，可能是高质量产品图
        return 'products';
    } else if (ext === '.png' && fileSize < 100 * 1024) {  // PNG小文件，可能是图表或证书
        return 'certificates';
    } else if (ext === '.jpeg' || ext === '.jpg') {  // JPEG通常是照片
        if (fileSize > 200 * 1024) {
            return 'factory';  // 大JPEG可能是工厂照片
        } else {
            return 'products';  // 中等JPEG可能是产品图
        }
    } else {
        return 'others';
    }
}

function copyAndClassifyImages() {
    const sourceDir = 'temp_extracted/ppt/media';
    const targetBaseDir = 'public/images';
    
    console.log('=== 开始分类和复制图片 ===');
    
    if (!fs.existsSync(sourceDir)) {
        console.error('源目录不存在:', sourceDir);
        return;
    }
    
    // 读取所有图片文件
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.wdp'].includes(ext);
    });
    
    console.log(`找到 ${imageFiles.length} 张图片`);
    
    const classificationResults = {
        products: [],
        factory: [],
        certificates: [],
        team: [],
        logos: [],
        others: []
    };
    
    // 分类并复制图片
    imageFiles.forEach((filename, index) => {
        const sourcePath = path.join(sourceDir, filename);
        const fileSize = getImageSize(sourcePath);
        
        // 智能分类
        let category = classifyImageBySize(filename, fileSize);
        
        // 特殊处理：根据图片序号进行更精确的分类
        const imageNum = parseInt(filename.match(/\d+/)[0]);
        
        if (imageNum <= 10) {
            category = 'logos';  // 前10张可能是Logo或标识
        } else if (imageNum <= 30) {
            category = 'products';  // 11-30张可能是产品图
        } else if (imageNum <= 60) {
            category = 'factory';  // 31-60张可能是工厂设备
        } else if (imageNum <= 80) {
            category = 'certificates';  // 61-80张可能是证书
        } else {
            category = 'others';  // 其余的放在others
        }
        
        // 创建目标路径
        const targetDir = path.join(targetBaseDir, category);
        const targetPath = path.join(targetDir, filename);
        
        try {
            // 复制文件
            fs.copyFileSync(sourcePath, targetPath);
            
            classificationResults[category].push({
                filename,
                size: fileSize,
                sizeKB: (fileSize / 1024).toFixed(1)
            });
            
            console.log(`${index + 1}/${imageFiles.length}: ${filename} -> ${category}/ (${(fileSize / 1024).toFixed(1)}KB)`);
            
        } catch (error) {
            console.error(`复制失败 ${filename}:`, error.message);
        }
    });
    
    // 输出分类统计
    console.log('\n=== 分类统计 ===');
    Object.keys(classificationResults).forEach(category => {
        const count = classificationResults[category].length;
        if (count > 0) {
            console.log(`${category}: ${count} 张图片`);
            // 显示前几张图片的信息
            classificationResults[category].slice(0, 3).forEach(img => {
                console.log(`  - ${img.filename} (${img.sizeKB}KB)`);
            });
            if (count > 3) {
                console.log(`  ... 还有 ${count - 3} 张`);
            }
        }
    });
    
    // 保存分类结果
    const resultFile = path.join(targetBaseDir, 'classification_result.json');
    const result = {
        total_images: imageFiles.length,
        classification_time: new Date().toISOString(),
        categories: classificationResults,
        summary: Object.keys(classificationResults).reduce((acc, cat) => {
            acc[cat] = classificationResults[cat].length;
            return acc;
        }, {})
    };
    
    fs.writeFileSync(resultFile, JSON.stringify(result, null, 2), 'utf8');
    console.log(`\n分类结果已保存到: ${resultFile}`);
    
    return result;
}

function updateWebsiteWithImages() {
    console.log('\n=== 更新网站图片占位符建议 ===');
    
    // 检查各类别的图片数量
    const categories = ['products', 'factory', 'certificates', 'logos', 'others'];
    const availableImages = {};
    
    categories.forEach(category => {
        const categoryDir = `public/images/${category}`;
        if (fs.existsSync(categoryDir)) {
            const files = fs.readdirSync(categoryDir);
            availableImages[category] = files.filter(f => 
                ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(path.extname(f).toLowerCase())
            );
        } else {
            availableImages[category] = [];
        }
    });
    
    console.log('可用图片统计:');
    Object.keys(availableImages).forEach(cat => {
        console.log(`  ${cat}: ${availableImages[cat].length} 张`);
    });
    
    // 生成具体的替换建议
    const suggestions = [];
    
    if (availableImages.logos.length > 0) {
        suggestions.push({
            file: 'src/app/layout.tsx',
            location: '头部Logo',
            oldCode: '<span className="text-[var(--hongqi-green)] font-semibold">红琪</span>',
            newCode: `<Image src="/images/logos/${availableImages.logos[0]}" alt="红琪Logo" width={120} height={40} />`,
            image: availableImages.logos[0]
        });
    }
    
    if (availableImages.products.length >= 3) {
        suggestions.push({
            file: 'src/app/page.tsx',
            location: '首页产品预览',
            oldCode: '<span className="text-[#64748B] text-sm">产品图占位 {i}</span>',
            newCode: `<Image src="/images/products/${availableImages.products[0]}" alt="精选产品" fill className="object-cover" />`,
            image: availableImages.products[0]
        });
    }
    
    if (availableImages.factory.length > 0) {
        suggestions.push({
            file: 'src/app/page.tsx',
            location: 'Hero区域背景',
            oldCode: '<span className="text-[#64748B] text-sm">视频占位：自动化清洗/切割/包装</span>',
            newCode: `<Image src="/images/factory/${availableImages.factory[0]}" alt="智能工厂" fill className="object-cover" />`,
            image: availableImages.factory[0]
        });
    }
    
    if (availableImages.certificates.length > 0) {
        suggestions.push({
            file: 'src/app/about/page.tsx',
            location: '证书展示',
            oldCode: '<span className="text-xs text-[#64748B]">证书图</span>',
            newCode: `<Image src="/images/certificates/${availableImages.certificates[0]}" alt="HACCP认证" fill className="object-cover" />`,
            image: availableImages.certificates[0]
        });
    }
    
    console.log('\n具体替换建议:');
    suggestions.forEach((suggestion, index) => {
        console.log(`${index + 1}. ${suggestion.file} - ${suggestion.location}`);
        console.log(`   使用图片: ${suggestion.image}`);
        console.log(`   替换代码: ${suggestion.newCode}`);
        console.log('');
    });
    
    // 保存替换建议
    const suggestionsFile = 'public/images/replacement_suggestions.json';
    fs.writeFileSync(suggestionsFile, JSON.stringify(suggestions, null, 2), 'utf8');
    console.log(`替换建议已保存到: ${suggestionsFile}`);
    
    return suggestions;
}

function main() {
    console.log('=== PPT图片自动分类与网站集成工具 ===');
    
    // 1. 分类并复制图片
    const classificationResult = copyAndClassifyImages();
    
    if (classificationResult) {
        // 2. 生成网站更新建议
        updateWebsiteWithImages();
        
        console.log('\n=== 完成 ===');
        console.log('所有图片已分类并复制到 public/images/ 目录');
        console.log('请查看生成的JSON文件了解详细信息和替换建议');
        console.log('接下来可以根据建议手动更新网站代码中的图片占位符');
    }
}

if (require.main === module) {
    main();
}

module.exports = { copyAndClassifyImages, updateWebsiteWithImages };
