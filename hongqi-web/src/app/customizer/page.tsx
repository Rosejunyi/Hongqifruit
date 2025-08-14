import ProductCustomizer from "@/components/ProductCustomizer";

export default function CustomizerPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">产品定制器</h1>
        <p className="mt-3 text-[#475569] max-w-2xl mx-auto">
          根据您的具体需求，定制专属的净菜产品。我们支持品类、切型、包装等多维度个性化定制。
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <ProductCustomizer />
      </div>

      {/* 定制服务说明 */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-[var(--hongqi-green)]">定制服务流程</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "需求配置", desc: "选择品类、切型、包装等参数" },
            { step: "2", title: "方案确认", desc: "24小时内提供详细报价与样品" },
            { step: "3", title: "样品测试", desc: "免费提供样品供您测试验证" },
            { step: "4", title: "批量生产", desc: "确认后安排生产与配送" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-[var(--hongqi-green)] text-white rounded-full flex items-center justify-center font-semibold mx-auto">
                {item.step}
              </div>
              <div className="mt-3 font-medium">{item.title}</div>
              <div className="mt-1 text-sm text-[#475569]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 定制优势 */}
      <section className="mt-16 max-w-4xl mx-auto rounded-2xl bg-[var(--bg-muted)] p-8">
        <h3 className="text-lg font-semibold text-center">为什么选择红琪定制</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { title: "灵活配置", desc: "支持多种切型、包装、规格组合" },
            { title: "品质保证", desc: "HACCP体系，每批次质量检测" },
            { title: "快速响应", desc: "24小时报价，7天内样品交付" },
          ].map((adv) => (
            <div key={adv.title} className="text-center">
              <div className="text-[var(--hongqi-green)] font-semibold">{adv.title}</div>
              <div className="mt-1 text-sm text-[#475569]">{adv.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 联系方式 */}
      <section className="mt-16 max-w-4xl mx-auto text-center">
        <h3 className="text-lg font-semibold">需要更多帮助？</h3>
        <p className="mt-2 text-[#475569]">我们的专业团队随时为您提供定制咨询服务。</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/contact" className="btn-primary">联系我们</a>
          <a href="tel:400-xxx-xxxx" className="btn-accent">电话咨询</a>
        </div>
      </section>
    </div>
  );
}
