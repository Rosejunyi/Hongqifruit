import Image from "next/image";

export default function ProductsPage() {
  const categories = [
    {
      name: "即用净菜",
      items: [
        { name: "精选叶菜", desc: "菠菜、小白菜、生菜等，3mm丝/5mm段可选", img: "image14.jpeg" },
        { name: "根茎类", desc: "土豆丝、萝卜块、胡萝卜片等", img: "image15.jpeg" },
        { name: "菌菇类", desc: "金针菇、杏鲍菇、香菇片等", img: "image16.jpeg" },
        { name: "瓜果类", desc: "冬瓜块、丝瓜段、茄子条等", img: "image17.jpeg" },
      ],
    },
    {
      name: "即食水果",
      items: [
        { name: "单品水果", desc: "苹果块、橙子瓣、草莓等", img: "image18.jpeg" },
        { name: "混合拼盘", desc: "时令水果组合，营养搭配", img: "image19.jpeg" },
      ],
    },
    {
      name: "特殊定制",
      items: [
        { name: "定制切型", desc: "按客户需求定制切割规格", img: "image20.jpeg" },
        { name: "特殊包装", desc: "真空、充氮、分装等", img: "image21.jpeg" },
      ],
    },
  ];

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">产品中心</h1>
        <p className="mt-3 text-[#475569] max-w-2xl mx-auto">
          开袋即用，减少损耗，品质稳定。为餐饮企业提供标准化净菜与即食解决方案。
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {categories.map((cat) => (
          <section key={cat.name}>
            <h2 className="text-2xl font-semibold text-[var(--hongqi-green)]">{cat.name}</h2>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[var(--shadow-card)] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={`/images/products/${item.img}`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="font-medium">{item.name}</div>
                    <div className="mt-1 text-sm text-[#64748B]">{item.desc}</div>
                    <div className="mt-4 flex gap-2">
                      <button className="btn-primary text-xs px-3 py-1">获取报价</button>
                      <button className="text-xs px-3 py-1 border border-[#CBD5E1] rounded-lg hover:bg-[var(--bg-muted)]">
                        申请样品
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 产品优势 */}
      <section className="mt-16 rounded-2xl bg-[var(--bg-muted)] p-8">
        <h3 className="text-xl font-semibold">产品优势</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { title: "开袋即用", desc: "无需二次清洗，直接下锅烹饪" },
            { title: "减少损耗", desc: "标准化处理，损耗率降低15%" },
            { title: "品质稳定", desc: "HACCP体系，批次间品质一致" },
          ].map((adv) => (
            <div key={adv.title} className="text-center">
              <div className="text-[var(--hongqi-green)] font-semibold">{adv.title}</div>
              <div className="mt-1 text-sm text-[#475569]">{adv.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 定制服务入口 */}
      <section className="mt-16 text-center">
        <h3 className="text-xl font-semibold">需要定制服务？</h3>
        <p className="mt-2 text-[#475569]">我们可以根据您的具体需求，提供个性化的净菜解决方案。</p>
        <div className="mt-6">
          <a href="/customizer" className="btn-accent">在线定制器</a>
        </div>
      </section>
    </div>
  );
}
