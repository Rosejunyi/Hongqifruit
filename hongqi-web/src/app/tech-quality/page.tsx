import TraceabilitySimulator from "@/components/TraceabilitySimulator";

export default function TechQualityPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">科技与品质</h1>
      <p className="mt-3 text-[#475569]">
        通过 HACCP 体系与智能制造，从田间到餐桌的全链路质量控制。以下为未来区块链溯源系统的交互原型：
      </p>
      <div className="mt-8">
        <TraceabilitySimulator />
      </div>
    </div>
  );
}

