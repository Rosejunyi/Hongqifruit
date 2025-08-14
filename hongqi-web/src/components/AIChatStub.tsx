"use client";
import { useState } from "react";

export default function AIChatStub() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* 浮窗入口 */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-6 right-6 rounded-full bg-[var(--hongqi-blue)] text-white shadow-[var(--shadow-card)] px-4 py-3"
      >
        AI顾问
      </button>

      {/* 面板占位 */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-w-[calc(100vw-32px)] rounded-2xl border border-[#E2E8F0] bg-white shadow-[var(--shadow-card)]">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="font-medium">红琪智能顾问（占位）</div>
            <button onClick={() => setOpen(false)} className="text-[#64748B]">×</button>
          </div>
          <div className="p-4 text-sm text-[#475569] space-y-2">
            <p>当前为占位版本，支持 FAQ 检索与页面引导的后续接入。</p>
            <ul className="list-disc ms-5">
              <li>起订量、交付周期、配送范围</li>
              <li>产品规格、定制流程、资质证书</li>
              <li>无法解答时转人工/提交线索</li>
            </ul>
          </div>
          <div className="p-3 border-t border-[#E2E8F0] flex gap-2">
            <input placeholder="请描述您的问题…" className="flex-1 rounded-lg border border-[#CBD5E1] px-3 py-2" />
            <button className="btn-primary">发送</button>
          </div>
        </div>
      )}
    </>
  );
}

