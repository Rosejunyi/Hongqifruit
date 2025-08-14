import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "上海红琪果蔬园艺有限公司 | 红琪智造，鲜享未来",
  description:
    "科技赋能的安心净菜专家——HACCP认证、智能工厂、冷链物流、质量追溯，B2B净菜与即食解决方案。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-[#E2E8F0]">
          <div className="container h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/logos/image1.jpeg"
                  alt="红琪Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--hongqi-green)] font-semibold text-sm">红琪</span>
                <span className="text-[#475569] text-xs hidden sm:inline">Hongqi Garden Fresh</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#475569]">
              <Link href="/#advantages" className="hover:text-[var(--hongqi-green)]">优势</Link>
              <Link href="/products" className="hover:text-[var(--hongqi-green)]">产品</Link>
              <Link href="/about" className="hover:text-[var(--hongqi-green)]">关于</Link>
              <Link href="/tech-quality" className="hover:text-[var(--hongqi-green)]">科技品质</Link>
              <Link href="/customizer" className="hover:text-[var(--hongqi-green)]">定制</Link>
              <Link href="/contact" className="hover:text-[var(--hongqi-green)]">联系</Link>
            </nav>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/" hrefLang="zh" className="px-2 py-1 rounded hover:bg-[var(--bg-muted)]">中文</Link>
              <Link href="/en" hrefLang="en" className="px-2 py-1 rounded hover:bg-[var(--bg-muted)]">EN</Link>
            </div>
          </div>
        </header>
        {children}
        {/* AI 顾问浮窗 - 动态导入避免SSR问题 */}
        <div suppressHydrationWarning>
          {typeof window !== 'undefined' && (
            <div id="ai-chat-container">
              {/* AI聊天组件将在客户端渲染 */}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
