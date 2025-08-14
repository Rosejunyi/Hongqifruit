import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">关于红琪</h1>
        <p className="mt-3 text-[#475569] max-w-2xl mx-auto">
          上海红琪果蔬园艺有限公司，致力于成为科技驱动的净菜解决方案提供商。
        </p>
      </div>

      {/* 公司简介 */}
      <section className="mt-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hongqi-green)]">企业愿景</h2>
          <p className="mt-4 text-[#475569] leading-relaxed">
            红琪智造，鲜享未来。我们通过科技赋能，为餐饮行业提供安心、高效的净菜产品与服务。
            坚持"从田间到餐桌"的全链路质量控制，以HACCP体系为基础，智能制造为手段，
            为客户创造降本增效的价值。
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { k: "成立时间", v: "2020年（占位）" },
              { k: "注册资本", v: "1000万元（占位）" },
              { k: "员工数量", v: "50+人（占位）" },
              { k: "服务客户", v: "100+家（占位）" },
            ].map((item) => (
              <div key={item.k} className="text-center p-4 rounded-xl bg-[var(--bg-muted)]">
                <div className="text-sm text-[#64748B]">{item.k}</div>
                <div className="text-lg font-semibold text-[var(--hongqi-green)]">{item.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] relative">
          <Image
            src="/images/factory/image32.png"
            alt="红琪企业形象"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 发展历程 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--hongqi-green)]">发展历程</h2>
        <div className="mt-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E2E8F0]"></div>
          {[
            { year: "2020", event: "公司成立，专注净菜加工" },
            { year: "2021", event: "获得HACCP体系认证" },
            { year: "2022", event: "智能工厂投产，自动化产线上线" },
            { year: "2023", event: "冷链物流体系完善，服务范围扩大" },
            { year: "2024", event: "区块链溯源系统研发启动" },
          ].map((milestone, idx) => (
            <div key={idx} className="relative pl-12 pb-8">
              <div className="absolute left-2 w-4 h-4 bg-[var(--hongqi-green)] rounded-full"></div>
              <div className="text-sm text-[#64748B]">{milestone.year}</div>
              <div className="font-medium">{milestone.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 现代化工厂 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--hongqi-green)]">现代化工厂</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { name: "自动化清洗车间", desc: "高压喷淋、超声波清洗", img: "image43.png" },
            { name: "无菌包装车间", desc: "MAP气调、真空包装", img: "image44.png" },
            { name: "质检实验室", desc: "理化微生物检测", img: "image45.png" },
          ].map((facility) => (
            <div key={facility.name} className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[var(--shadow-card)] overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={`/images/factory/${facility.img}`}
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="font-medium">{facility.name}</div>
                <div className="mt-1 text-sm text-[#64748B]">{facility.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="btn-primary">VR工厂漫游（占位）</button>
          <div className="mt-2 text-xs text-[#94A3B8]">未来将支持360°全景或VR体验</div>
        </div>
      </section>

      {/* 荣誉资质 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--hongqi-green)]">荣誉与资质</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            { name: "HACCP体系认证", img: "image61.png" },
            { name: "ISO22000认证", img: "image62.png" },
            { name: "食品生产许可证", img: "image63.png" },
            { name: "高新技术企业", img: "image64.png" },
          ].map((cert) => (
            <div key={cert.name} className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-center shadow-[var(--shadow-card)]">
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                <Image
                  src={`/images/certificates/${cert.img}`}
                  alt={cert.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-sm font-medium">{cert.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
