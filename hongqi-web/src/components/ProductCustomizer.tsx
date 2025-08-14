"use client";
import { useState } from "react";

type CustomConfig = {
  category: string;
  vegetable: string;
  cutType: string;
  packaging: string;
  quantity: string;
  delivery: string;
};

export default function ProductCustomizer() {
  const [config, setConfig] = useState<CustomConfig>({
    category: "",
    vegetable: "",
    cutType: "",
    packaging: "",
    quantity: "",
    delivery: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = {
    "叶菜类": ["菠菜", "小白菜", "生菜", "油菜"],
    "根茎类": ["土豆", "萝卜", "胡萝卜", "洋葱"],
    "菌菇类": ["金针菇", "杏鲍菇", "香菇", "平菇"],
    "瓜果类": ["冬瓜", "丝瓜", "茄子", "青椒"],
  };

  const cutTypes = ["丝（3mm）", "块（1cm）", "片（2mm）", "段（5cm）", "整根"];
  const packagings = ["MAP气调包装", "真空包装", "普通包装", "分装小包"];

  const updateConfig = (key: keyof CustomConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    if (key === "category") {
      setConfig((prev) => ({ ...prev, vegetable: "" })); // 重置蔬菜选择
    }
  };

  const onSubmit = () => {
    setSubmitted(true);
    // 这里可以对接后端API或发送邮件
    console.log("定制配置:", config);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[var(--shadow-card)] text-center">
        <div className="text-[var(--hongqi-green)] text-2xl mb-4">✓</div>
        <h3 className="text-lg font-semibold">定制需求已提交</h3>
        <p className="mt-2 text-[#475569]">我们将在24小时内联系您，提供详细报价与样品。</p>
        <div className="mt-6 p-4 bg-[var(--bg-muted)] rounded-xl text-left">
          <div className="text-sm font-medium mb-2">您的配置摘要：</div>
          <div className="text-sm text-[#475569] space-y-1">
            <div>品类：{config.category} - {config.vegetable}</div>
            <div>切型：{config.cutType}</div>
            <div>包装：{config.packaging}</div>
            <div>需求量：{config.quantity}</div>
            <div>交付地：{config.delivery}</div>
          </div>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-[var(--hongqi-blue)] hover:underline"
        >
          重新配置
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-lg font-semibold mb-6">在线产品定制器</h3>
      
      <div className="space-y-6">
        {/* 品类选择 */}
        <div>
          <label className="text-sm font-medium text-[#475569]">选择品类</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => updateConfig("category", cat)}
                className={`p-3 rounded-lg border text-sm transition-colors ${
                  config.category === cat
                    ? "border-[var(--hongqi-green)] bg-[var(--hongqi-green)]/10 text-[var(--hongqi-green)]"
                    : "border-[#CBD5E1] hover:border-[var(--hongqi-green)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 具体蔬菜 */}
        {config.category && (
          <div>
            <label className="text-sm font-medium text-[#475569]">选择蔬菜</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories[config.category as keyof typeof categories].map((veg) => (
                <button
                  key={veg}
                  onClick={() => updateConfig("vegetable", veg)}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    config.vegetable === veg
                      ? "border-[var(--hongqi-green)] bg-[var(--hongqi-green)]/10 text-[var(--hongqi-green)]"
                      : "border-[#CBD5E1] hover:border-[var(--hongqi-green)]"
                  }`}
                >
                  {veg}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 切割方式 */}
        <div>
          <label className="text-sm font-medium text-[#475569]">切割方式</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-2">
            {cutTypes.map((cut) => (
              <button
                key={cut}
                onClick={() => updateConfig("cutType", cut)}
                className={`p-3 rounded-lg border text-sm transition-colors ${
                  config.cutType === cut
                    ? "border-[var(--hongqi-green)] bg-[var(--hongqi-green)]/10 text-[var(--hongqi-green)]"
                    : "border-[#CBD5E1] hover:border-[var(--hongqi-green)]"
                }`}
              >
                {cut}
              </button>
            ))}
          </div>
        </div>

        {/* 包装方式 */}
        <div>
          <label className="text-sm font-medium text-[#475569]">包装方式</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {packagings.map((pkg) => (
              <button
                key={pkg}
                onClick={() => updateConfig("packaging", pkg)}
                className={`p-3 rounded-lg border text-sm transition-colors ${
                  config.packaging === pkg
                    ? "border-[var(--hongqi-green)] bg-[var(--hongqi-green)]/10 text-[var(--hongqi-green)]"
                    : "border-[#CBD5E1] hover:border-[var(--hongqi-green)]"
                }`}
              >
                {pkg}
              </button>
            ))}
          </div>
        </div>

        {/* 需求量和交付地 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#475569]">预计月需求量</label>
            <input
              value={config.quantity}
              onChange={(e) => updateConfig("quantity", e.target.value)}
              placeholder="例如：500kg/月"
              className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--hongqi-green)]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#475569]">交付地点</label>
            <input
              value={config.delivery}
              onChange={(e) => updateConfig("delivery", e.target.value)}
              placeholder="例如：上海市浦东新区"
              className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--hongqi-green)]"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="pt-4">
          <button
            onClick={onSubmit}
            disabled={!config.category || !config.vegetable || !config.cutType || !config.packaging}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交定制需求
          </button>
          <div className="mt-2 text-xs text-[#94A3B8] text-center">
            提交后我们将为您生成配置摘要与预估报价区间
          </div>
        </div>
      </div>
    </div>
  );
}
