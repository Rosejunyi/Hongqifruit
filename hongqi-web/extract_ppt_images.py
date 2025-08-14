#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PPT图片提取与分类工具
从PowerPoint文件中提取所有图片并按类别保存
"""

import os
import sys
import json
import shutil
from pathlib import Path
from zipfile import ZipFile
import re

def extract_images_from_pptx(ppt_path, output_dir="public/images"):
    """
    从PPTX文件中提取所有图片
    PPTX本质上是一个ZIP文件，包含媒体文件夹
    """
    try:
        print(f"=== PPT图片提取工具 ===")
        print(f"正在处理文件: {ppt_path}")
        
        if not os.path.exists(ppt_path):
            print(f"错误：找不到文件 {ppt_path}")
            return None
            
        # 创建输出目录
        os.makedirs(output_dir, exist_ok=True)
        
        # 创建分类目录
        categories = {
            'products': f"{output_dir}/products",      # 产品图片
            'factory': f"{output_dir}/factory",        # 工厂设备
            'certificates': f"{output_dir}/certificates", # 证书资质
            'team': f"{output_dir}/team",              # 团队照片
            'logos': f"{output_dir}/logos",            # Logo标识
            'others': f"{output_dir}/others"           # 其他图片
        }
        
        for category_dir in categories.values():
            os.makedirs(category_dir, exist_ok=True)
            
        extracted_images = []
        
        # 使用zipfile读取PPTX
        with ZipFile(ppt_path, 'r') as zip_file:
            # 列出所有文件
            file_list = zip_file.namelist()
            print(f"PPTX文件包含 {len(file_list)} 个内部文件")
            
            # 查找媒体文件
            media_files = [f for f in file_list if f.startswith('ppt/media/')]
            print(f"找到 {len(media_files)} 个媒体文件")
            
            for media_file in media_files:
                try:
                    # 获取文件扩展名
                    file_ext = os.path.splitext(media_file)[1].lower()
                    
                    # 只处理图片文件
                    if file_ext in ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']:
                        # 读取图片数据
                        image_data = zip_file.read(media_file)
                        
                        # 生成新文件名
                        original_name = os.path.basename(media_file)
                        
                        # 根据文件名或大小进行分类
                        category = classify_image(original_name, len(image_data))
                        
                        # 保存图片
                        output_path = os.path.join(categories[category], original_name)
                        with open(output_path, 'wb') as img_file:
                            img_file.write(image_data)
                            
                        extracted_images.append({
                            'original_path': media_file,
                            'saved_path': output_path,
                            'category': category,
                            'filename': original_name,
                            'size_bytes': len(image_data),
                            'extension': file_ext
                        })
                        
                        print(f"提取图片: {original_name} -> {category}/")
                        
                except Exception as e:
                    print(f"处理图片 {media_file} 时出错: {e}")
                    
        print(f"\n=== 提取完成 ===")
        print(f"总共提取 {len(extracted_images)} 张图片")
        
        # 按类别统计
        category_counts = {}
        for img in extracted_images:
            cat = img['category']
            category_counts[cat] = category_counts.get(cat, 0) + 1
            
        print("\n分类统计:")
        for category, count in category_counts.items():
            print(f"  {category}: {count} 张")
            
        # 保存提取信息
        result = {
            'source_file': ppt_path,
            'extraction_time': str(Path().cwd()),
            'total_images': len(extracted_images),
            'categories': category_counts,
            'images': extracted_images
        }
        
        info_file = os.path.join(output_dir, 'extraction_info.json')
        with open(info_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
            
        print(f"\n提取信息已保存到: {info_file}")
        
        return result
        
    except Exception as e:
        print(f"提取过程中发生错误: {e}")
        return None

def classify_image(filename, file_size):
    """
    根据文件名和大小对图片进行分类
    """
    filename_lower = filename.lower()
    
    # 产品相关关键词
    product_keywords = ['产品', 'product', '蔬菜', '水果', '净菜', '包装', '食品']
    
    # 工厂设备关键词
    factory_keywords = ['工厂', 'factory', '设备', '生产线', '车间', '机器', '清洗', '切割']
    
    # 证书资质关键词
    cert_keywords = ['证书', 'certificate', '认证', 'haccp', '资质', '许可证']
    
    # 团队照片关键词
    team_keywords = ['团队', 'team', '员工', '人员', '合影', '会议']
    
    # Logo标识关键词
    logo_keywords = ['logo', '标识', '商标', 'brand', '红琪']
    
    # 检查关键词匹配
    for keyword in product_keywords:
        if keyword in filename_lower:
            return 'products'
            
    for keyword in factory_keywords:
        if keyword in filename_lower:
            return 'factory'
            
    for keyword in cert_keywords:
        if keyword in filename_lower:
            return 'certificates'
            
    for keyword in team_keywords:
        if keyword in filename_lower:
            return 'team'
            
    for keyword in logo_keywords:
        if keyword in filename_lower:
            return 'logos'
    
    # 根据文件大小进行推测
    if file_size < 50 * 1024:  # 小于50KB，可能是Logo
        return 'logos'
    elif file_size > 500 * 1024:  # 大于500KB，可能是高质量产品图
        return 'products'
    else:
        return 'others'

def update_website_placeholders(extraction_result):
    """
    更新网站中的图片占位符
    """
    if not extraction_result:
        print("没有提取结果，跳过占位符更新")
        return
        
    print("\n=== 更新网站占位符 ===")
    
    # 图片映射规则
    image_mappings = {
        'products': [
            'src/app/page.tsx',  # 首页产品预览
            'src/app/products/page.tsx'  # 产品中心
        ],
        'factory': [
            'src/app/about/page.tsx',  # 关于页面工厂展示
            'src/app/tech-quality/page.tsx'  # 科技品质页面
        ],
        'certificates': [
            'src/app/about/page.tsx'  # 关于页面资质展示
        ],
        'logos': [
            'src/app/layout.tsx'  # 头部Logo
        ]
    }
    
    # 为每个类别创建图片引用
    for category, images in extraction_result.get('categories', {}).items():
        if images > 0:
            print(f"类别 '{category}' 有 {images} 张图片可用于替换占位符")
            
    print("建议的占位符替换:")
    print("1. 首页Hero区域视频占位 -> factory/生产线图片")
    print("2. 产品卡片占位图 -> products/产品图片")
    print("3. 工厂展示占位 -> factory/设备图片")
    print("4. 证书展示占位 -> certificates/证书图片")
    print("5. 企业Logo占位 -> logos/标识图片")

def main():
    """主函数"""
    ppt_path = "../红琪食品公司简介20240305.pptx"
    output_dir = "public/images"
    
    # 提取图片
    result = extract_images_from_pptx(ppt_path, output_dir)
    
    if result:
        # 更新占位符建议
        update_website_placeholders(result)
        
        print(f"\n=== 完成 ===")
        print(f"所有图片已保存到: {output_dir}")
        print("接下来可以手动或自动替换网站中的占位符")
    else:
        print("图片提取失败")

if __name__ == "__main__":
    main()
