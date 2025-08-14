const fs = require('fs');
const path = require('path');

/**
 * 从PPT二进制文件中提取可读文本
 */
function extractTextFromPPT(filePath) {
    try {
        console.log('=== PPT内容提取工具 (Node.js版本) ===');
        console.log(`正在处理文件: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            console.error(`错误：找不到文件 ${filePath}`);
            return null;
        }
        
        const stats = fs.statSync(filePath);
        console.log(`文件大小: ${(stats.size / 1024).toFixed(1)} KB`);
        
        // 读取文件内容
        const buffer = fs.readFileSync(filePath);
        const content = buffer.toString('utf8', 0, buffer.length);
        
        console.log('\n--- 开始文本提取 ---');
        
        // 提取中文文本
        const chineseRegex = /[\u4e00-\u9fff]+/g;
        const chineseTexts = content.match(chineseRegex) || [];
        const uniqueChineseTexts = [...new Set(chineseTexts.filter(text => text.length >= 2))];
        
        console.log(`\n找到中文文本片段: ${uniqueChineseTexts.length}个`);
        console.log('中文内容示例:');
        uniqueChineseTexts.slice(0, 15).forEach(text => {
            if (text.length >= 3) {
                console.log(`  - ${text}`);
            }
        });
        
        // 提取英文文本
        const englishRegex = /[A-Za-z][A-Za-z\s]{3,50}/g;
        const englishTexts = content.match(englishRegex) || [];
        const uniqueEnglishTexts = [...new Set(englishTexts.map(text => text.trim()).filter(text => text.length >= 4))];
        
        console.log(`\n找到英文文本片段: ${uniqueEnglishTexts.length}个`);
        console.log('英文内容示例:');
        uniqueEnglishTexts.slice(0, 10).forEach(text => {
            console.log(`  - ${text}`);
        });
        
        // 提取数字和日期
        const numberRegex = /\d{4}[-年]\d{1,2}[-月]\d{1,2}[日]?|\d{4}年|\d+%|\d+万|\d+千|\d+元|\d+人|\d+家/g;
        const numbers = content.match(numberRegex) || [];
        const uniqueNumbers = [...new Set(numbers)];
        
        if (uniqueNumbers.length > 0) {
            console.log(`\n找到数字/日期: ${uniqueNumbers.length}个`);
            uniqueNumbers.slice(0, 10).forEach(num => {
                console.log(`  - ${num}`);
            });
        }
        
        // 提取可能的联系方式
        const contactRegex = /1[3-9]\d{9}|[\w\.-]+@[\w\.-]+\.\w+|www\.[\w\.-]+|http[s]?:\/\/[\w\.-]+/g;
        const contacts = content.match(contactRegex) || [];
        const uniqueContacts = [...new Set(contacts)];
        
        if (uniqueContacts.length > 0) {
            console.log(`\n找到联系方式: ${uniqueContacts.length}个`);
            uniqueContacts.forEach(contact => {
                console.log(`  - ${contact}`);
            });
        }
        
        // 查找公司相关关键词
        const companyKeywords = [
            '上海红琪', '红琪', '果蔬', '园艺', '有限公司', 'HACCP', '净菜', '食品安全',
            '冷链', '物流', '加工', '配送', '餐饮', '供应链', '质量', '认证'
        ];
        
        console.log('\n--- 公司相关信息 ---');
        companyKeywords.forEach(keyword => {
            const regex = new RegExp(`[^\\u4e00-\\u9fff]*${keyword}[^\\u4e00-\\u9fff]*`, 'g');
            const matches = content.match(regex) || [];
            if (matches.length > 0) {
                console.log(`关键词"${keyword}"出现 ${matches.length} 次`);
                // 显示包含关键词的上下文
                matches.slice(0, 3).forEach(match => {
                    const cleanMatch = match.replace(/[^\u4e00-\u9fff\w\s]/g, '').trim();
                    if (cleanMatch.length > keyword.length) {
                        console.log(`  - ${cleanMatch}`);
                    }
                });
            }
        });
        
        // 保存结果
        const result = {
            file_info: {
                path: filePath,
                size_kb: (stats.size / 1024).toFixed(1),
                extraction_time: new Date().toISOString()
            },
            extracted_content: {
                chinese_texts: uniqueChineseTexts,
                english_texts: uniqueEnglishTexts,
                numbers_dates: uniqueNumbers,
                contacts: uniqueContacts
            },
            summary: {
                chinese_count: uniqueChineseTexts.length,
                english_count: uniqueEnglishTexts.length,
                numbers_count: uniqueNumbers.length,
                contacts_count: uniqueContacts.length
            }
        };
        
        const outputFile = 'ppt_extracted_content.json';
        fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
        console.log(`\n结果已保存到: ${outputFile}`);
        
        return result;
        
    } catch (error) {
        console.error('提取过程中发生错误:', error.message);
        return null;
    }
}

// 主程序
function main() {
    const pptPath = '../红琪食品公司简介20240305.pptx';
    extractTextFromPPT(pptPath);
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = { extractTextFromPPT };
