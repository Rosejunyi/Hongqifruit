const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * PPT图片提取与分类工具 (Node.js版本)
 * 从PowerPoint文件中提取所有图片并按类别保存
 */

function createDirectories() {
    const baseDir = 'public/images';
    const categories = [
        'products',      // 产品图片
        'factory',       // 工厂设备
        'certificates',  // 证书资质
        'team',          // 团队照片
        'logos',         // Logo标识
        'others'         // 其他图片
    ];

    // 创建基础目录
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
    }
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }

    // 创建分类目录
    categories.forEach(category => {
        const categoryPath = path.join(baseDir, category);
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
        }
    });

    return { baseDir, categories };
}

function classifyImage(filename, fileSize) {
    const filenameLower = filename.toLowerCase();
    
    // 产品相关关键词
    const productKeywords = ['产品', 'product', '蔬菜', '水果', '净菜', '包装', '食品', 'food'];
    
    // 工厂设备关键词
    const factoryKeywords = ['工厂', 'factory', '设备', '生产线', '车间', '机器', '清洗', '切割', 'equipment'];
    
    // 证书资质关键词
    const certKeywords = ['证书', 'certificate', '认证', 'haccp', '资质', '许可证', 'cert'];
    
    // 团队照片关键词
    const teamKeywords = ['团队', 'team', '员工', '人员', '合影', '会议', 'staff'];
    
    // Logo标识关键词
    const logoKeywords = ['logo', '标识', '商标', 'brand', '红琪', 'hongqi'];

    // 检查关键词匹配
    for (const keyword of productKeywords) {
        if (filenameLower.includes(keyword)) return 'products';
    }
    
    for (const keyword of factoryKeywords) {
        if (filenameLower.includes(keyword)) return 'factory';
    }
    
    for (const keyword of certKeywords) {
        if (filenameLower.includes(keyword)) return 'certificates';
    }
    
    for (const keyword of teamKeywords) {
        if (filenameLower.includes(keyword)) return 'team';
    }
    
    for (const keyword of logoKeywords) {
        if (filenameLower.includes(keyword)) return 'logos';
    }

    // 根据文件大小进行推测
    if (fileSize < 50 * 1024) {  // 小于50KB，可能是Logo
        return 'logos';
    } else if (fileSize > 500 * 1024) {  // 大于500KB，可能是高质量产品图
        return 'products';
    } else {
        return 'others';
    }
}

function extractImagesWithPowerShell(pptPath, outputDir) {
    console.log('=== 使用PowerShell提取PPT图片 ===');
    
    try {
        // PowerShell脚本来提取PPTX中的图片
        const psScript = `
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $pptPath = "${pptPath.replace(/\\/g, '\\\\')}"
        $outputPath = "${outputDir.replace(/\\/g, '\\\\')}"
        
        if (Test-Path $pptPath) {
            $zip = [System.IO.Compression.ZipFile]::OpenRead($pptPath)
            $mediaEntries = $zip.Entries | Where-Object { $_.FullName -like "ppt/media/*" }
            
            Write-Host "找到 $($mediaEntries.Count) 个媒体文件"
            
            $extractedFiles = @()
            foreach ($entry in $mediaEntries) {
                $fileName = Split-Path $entry.FullName -Leaf
                $extension = [System.IO.Path]::GetExtension($fileName).ToLower()
                
                if ($extension -in @('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')) {
                    $outputFile = Join-Path $outputPath $fileName
                    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $outputFile, $true)
                    
                    $fileInfo = @{
                        filename = $fileName
                        size = $entry.Length
                        path = $outputFile
                    }
                    $extractedFiles += $fileInfo
                    
                    Write-Host "提取: $fileName ($($entry.Length) bytes)"
                }
            }
            
            $zip.Dispose()
            
            # 输出JSON结果
            $result = @{
                total = $extractedFiles.Count
                files = $extractedFiles
            }
            $result | ConvertTo-Json -Depth 3
        } else {
            Write-Error "文件不存在: $pptPath"
        }
        `;
        
        // 执行PowerShell脚本
        const result = execSync(`powershell -Command "${psScript}"`, { 
            encoding: 'utf8',
            maxBuffer: 1024 * 1024 * 10 // 10MB buffer
        });
        
        console.log('PowerShell执行结果:');
        console.log(result);
        
        try {
            const jsonResult = JSON.parse(result);
            return jsonResult;
        } catch (e) {
            console.log('解析JSON失败，使用原始输出');
            return { total: 0, files: [], raw: result };
        }
        
    } catch (error) {
        console.error('PowerShell执行失败:', error.message);
        return null;
    }
}

function extractImagesManually(pptPath, outputDir) {
    console.log('=== 手动提取方法 ===');
    console.log('由于技术限制，请手动执行以下步骤：');
    console.log('1. 将PPT文件重命名为 .zip 扩展名');
    console.log('2. 解压ZIP文件');
    console.log('3. 在 ppt/media/ 文件夹中找到所有图片');
    console.log('4. 将图片复制到对应的分类文件夹中');
    
    // 创建示例图片映射文件
    const exampleMapping = {
        instructions: "请将提取的图片按以下规则分类保存",
        categories: {
            products: "产品相关图片 - 蔬菜、水果、净菜、包装等",
            factory: "工厂设备图片 - 生产线、机器、车间等",
            certificates: "证书资质图片 - HACCP认证、许可证等",
            team: "团队照片 - 员工、合影、会议等",
            logos: "Logo标识 - 公司标志、品牌标识等",
            others: "其他图片 - 无法分类的图片"
        },
        website_mappings: {
            "首页Hero区域": "factory/生产线图片或产品图片",
            "产品卡片占位": "products/具体产品图片",
            "工厂展示区域": "factory/设备或车间图片",
            "证书展示区域": "certificates/认证证书图片",
            "公司Logo": "logos/红琪标识图片"
        }
    };
    
    const mappingFile = path.join(outputDir, 'image_mapping_guide.json');
    fs.writeFileSync(mappingFile, JSON.stringify(exampleMapping, null, 2), 'utf8');
    console.log(`\n图片分类指南已保存到: ${mappingFile}`);
}

function updateWebsitePlaceholders() {
    console.log('\n=== 网站占位符更新建议 ===');
    
    const placeholderUpdates = [
        {
            file: 'src/app/page.tsx',
            location: 'Hero区域视频占位',
            suggestion: '替换为工厂生产线图片或产品展示图',
            code: '<Image src="/images/factory/production-line.jpg" alt="生产线" />'
        },
        {
            file: 'src/app/page.tsx',
            location: '产品亮点速览',
            suggestion: '替换为真实产品图片',
            code: '<Image src="/images/products/vegetable-1.jpg" alt="精选净菜" />'
        },
        {
            file: 'src/app/products/page.tsx',
            location: '产品卡片图片',
            suggestion: '按产品类别使用对应图片',
            code: '<Image src="/images/products/leafy-vegetables.jpg" alt="叶菜类" />'
        },
        {
            file: 'src/app/about/page.tsx',
            location: '工厂展示',
            suggestion: '使用工厂设备或车间图片',
            code: '<Image src="/images/factory/workshop.jpg" alt="无菌车间" />'
        },
        {
            file: 'src/app/about/page.tsx',
            location: '证书展示',
            suggestion: '使用真实证书图片',
            code: '<Image src="/images/certificates/haccp.jpg" alt="HACCP认证" />'
        }
    ];
    
    placeholderUpdates.forEach((update, index) => {
        console.log(`${index + 1}. ${update.file}`);
        console.log(`   位置: ${update.location}`);
        console.log(`   建议: ${update.suggestion}`);
        console.log(`   代码: ${update.code}`);
        console.log('');
    });
}

function main() {
    console.log('=== PPT图片提取与分类工具 (Node.js版本) ===');
    
    const pptPath = '../红琪食品公司简介20240305.pptx';
    const { baseDir, categories } = createDirectories();
    
    console.log(`PPT文件路径: ${pptPath}`);
    console.log(`输出目录: ${baseDir}`);
    console.log(`分类目录: ${categories.join(', ')}`);
    
    // 检查PPT文件是否存在
    if (!fs.existsSync(pptPath)) {
        console.error(`错误：找不到PPT文件 ${pptPath}`);
        return;
    }
    
    const stats = fs.statSync(pptPath);
    console.log(`PPT文件大小: ${(stats.size / 1024).toFixed(1)} KB`);
    
    // 尝试使用PowerShell提取
    console.log('\n尝试使用PowerShell自动提取...');
    const psResult = extractImagesWithPowerShell(pptPath, baseDir);
    
    if (psResult && psResult.total > 0) {
        console.log(`\n成功提取 ${psResult.total} 张图片`);
        
        // 对提取的图片进行分类
        psResult.files.forEach(file => {
            const category = classifyImage(file.filename, file.size);
            const categoryPath = path.join(baseDir, category);
            const newPath = path.join(categoryPath, file.filename);
            
            try {
                if (fs.existsSync(file.path)) {
                    fs.renameSync(file.path, newPath);
                    console.log(`分类: ${file.filename} -> ${category}/`);
                }
            } catch (error) {
                console.error(`移动文件失败: ${error.message}`);
            }
        });
    } else {
        console.log('\nPowerShell自动提取失败，提供手动提取指南...');
        extractImagesManually(pptPath, baseDir);
    }
    
    // 提供网站更新建议
    updateWebsitePlaceholders();
    
    console.log('\n=== 完成 ===');
    console.log('请检查 public/images/ 目录中的分类图片');
    console.log('然后根据建议更新网站中的占位符');
}

if (require.main === module) {
    main();
}

module.exports = { classifyImage, createDirectories };
