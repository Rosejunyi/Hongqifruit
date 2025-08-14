import Image from "next/image";
import Link from "next/link";
import AIChatStub from "@/components/AIChatStub";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with tech feel */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E8F5E9] via-white to-white">
        <div className="container py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#0F172A]">
                红琪智造，鲜享未来
              </h1>
              <p className="mt-5 text-[#475569] text-lg leading-relaxed">
                科技赋能的安心净菜专家——HACCP认证、智能工厂、冷链物流、质量追溯。为连锁餐饮、酒店与中央厨房提供标准、稳定与高效的净菜解决方案。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#products" className="btn-primary">了解产品</Link>
                <Link href="#factory" className="btn-accent">参观工厂</Link>
                <Link href="#contact" className="btn-primary !bg-[var(--hongqi-blue)]">洽谈合作</Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                {[
                  { k: "HACCP", v: "体系认证" },
                  { k: "24h", v: "冷链配送" },
                  { k: "99.9%", v: "可追溯数据" },
                ].map((i) => (
                  <div key={i.k} className="rounded-xl bg-[var(--bg-muted)] p-4 shadow-sm">
                    <div className="text-2xl font-semibold text-[var(--hongqi-green)]">{i.k}</div>
                    <div className="text-sm text-[#64748B]">{i.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] relative">
                <Image
                  src="/images/factory/image31.png"
                  alt="智能工厂生产线"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-[var(--shadow-card)] border border-[#E2E8F0]">
                <div className="text-xs text-[#64748B]">实时温度</div>
                <div className="text-2xl font-semibold text-[var(--hongqi-blue)]">2–4℃</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="container py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">为什么选择红琪</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            { t: "HACCP认证", d: "从田间到餐桌的全链路质量控制" },
            { t: "智能工厂", d: "自动化清洗、精准切割、MAP气调包装" },
            { t: "定制服务", d: "品类/切型/包装规格按需定制" },
            { t: "高效冷链", d: "24小时城市圈冷链配送" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl p-6 bg-white border border-[#E2E8F0] shadow-[var(--shadow-card)]">
              <div className="text-[var(--hongqi-green)] font-semibold">{c.t}</div>
              <div className="mt-2 text-sm text-[#475569]">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product teaser */}
      <section id="products" className="bg-[var(--bg-muted)] py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-semibold">产品亮点</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { img: "image11.jpeg", name: "精选叶菜", desc: "菠菜、小白菜、生菜等" },
              { img: "image12.jpeg", name: "根茎蔬菜", desc: "土豆丝、萝卜块、胡萝卜片" },
              { img: "image13.jpeg", name: "时令果蔬", desc: "当季新鲜，营养丰富" }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-[#E2E8F0] shadow-[var(--shadow-card)] overflow-hidden">
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
                  <div className="mt-1 text-sm text-[#64748B]">{item.desc} · 开袋即用 · 品质稳定</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with ICP placeholder */}
      <footer id="contact" className="bg-white border-t border-[#E2E8F0]">
        <div className="container py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-semibold">上海红琪果蔬园艺有限公司</div>
            <div className="mt-2 text-sm text-[#64748B]">红琪智造，鲜享未来</div>
          </div>
          <div>
            <div className="text-sm font-medium">联系方式</div>
            <div className="mt-2 text-sm text-[#64748B]">电话/邮箱/地址（占位）</div>
          </div>
          <div>
            <div className="text-sm font-medium">备案信息</div>
            <div className="mt-2 text-xs text-[#94A3B8]">沪ICP备XXXXXX号-1（占位）｜沪公网安备 XXXXXXXXXXXXX 号（占位）</div>
          </div>
        </div>
      </footer>

      {/* AI 聊天助手 */}
      <AIChatStub />
    </div>
  );
}
