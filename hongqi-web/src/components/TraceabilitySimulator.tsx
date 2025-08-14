"use client";
import { useState } from "react";

type Event = {
  stage: string;
  time: string;
  by?: string;
  vehicle?: string;
  avgTemp?: number;
  tempRange?: string;
  line?: string;
  turbidity?: string;
  blade?: string;
  size?: string;
  lab?: string;
  pesticide?: string;
  tech?: string;
  shelfLife?: string;
};

type TraceData = {
  batchId: string;
  product: string;
  origin: { farm: string; geo: [number, number]; planting: string };
  events: Event[];
};

const MOCK: TraceData = {
  batchId: "HQFV20230815001",
  product: "嫩菠菜",
  origin: { farm: "嘉善基地A1", geo: [120.93, 30.84], planting: "2025-05-12" },
  events: [
    { stage: "采摘", time: "2025-08-10 06:20", by: "张强", avgTemp: 22.1 },
    { stage: "运输", time: "2025-08-10 08:50", vehicle: "沪A·12345", avgTemp: 4.2 },
    { stage: "清洗", time: "2025-08-10 10:10", line: "WASH-L2", turbidity: "0.3 NTU" },
    { stage: "切割", time: "2025-08-10 10:35", blade: "CUT-12", size: "3mm丝" },
    { stage: "质检", time: "2025-08-10 11:00", lab: "理化微生物A", pesticide: "未检出" },
    { stage: "包装", time: "2025-08-10 11:20", tech: "MAP气调", shelfLife: "7天" },
    { stage: "冷链", time: "2025-08-10 13:00", tempRange: "2–4℃" },
  ],
};

export default function TraceabilitySimulator() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<TraceData | null>(MOCK);
  const [loading, setLoading] = useState(false);

  const onQuery = async () => {
    setLoading(true);
    // 模拟查询延时与结果（未来可接后端/链）
    await new Promise((r) => setTimeout(r, 600));
    if (!input || input === MOCK.batchId) {
      setData(MOCK);
    } else {
      setData({ ...MOCK, batchId: input });
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="flex flex-col md:flex-row md:items-end gap-3">
        <div className="flex-1">
          <label className="text-sm text-[#64748B]">溯源批次号</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如：HQFV20230815001"
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--hongqi-green)]"
          />
        </div>
        <button onClick={onQuery} className="btn-primary min-w-28">
          {loading ? "查询中…" : "查询"}
        </button>
      </div>

      {data && (
        <div className="mt-6">
          <div className="text-sm text-[#475569]">
            批次：<span className="font-mono">{data.batchId}</span> ｜ 品类：
            {data.product} ｜ 产地：{data.origin.farm}
          </div>

          {/* 时间轴 */}
          <ol className="mt-6 relative border-s border-[#E2E8F0]">
            {data.events.map((ev, idx) => (
              <li key={idx} className="ms-6 py-4">
                <span className="absolute -start-2 mt-2 h-3 w-3 rounded-full bg-[var(--hongqi-green)]"></span>
                <div className="text-sm text-[#64748B]">{ev.time}</div>
                <div className="text-base font-medium">{ev.stage}</div>
                <div className="mt-1 text-sm text-[#475569] grid md:grid-cols-3 gap-x-6 gap-y-1">
                  {ev.by && <div>负责人：{ev.by}</div>}
                  {ev.vehicle && <div>车辆：{ev.vehicle}</div>}
                  {typeof ev.avgTemp === "number" && <div>平均温度：{ev.avgTemp}℃</div>}
                  {ev.tempRange && <div>温度区间：{ev.tempRange}</div>}
                  {ev.line && <div>产线：{ev.line}</div>}
                  {ev.turbidity && <div>浊度：{ev.turbidity}</div>}
                  {ev.blade && <div>刀组：{ev.blade}</div>}
                  {ev.size && <div>规格：{ev.size}</div>}
                  {ev.lab && <div>实验室：{ev.lab}</div>}
                  {ev.pesticide && <div>农残：{ev.pesticide}</div>}
                  {ev.tech && <div>包装：{ev.tech}</div>}
                  {ev.shelfLife && <div>保质期：{ev.shelfLife}</div>}
                </div>
              </li>
            ))}
          </ol>

          {/* 未来扩展提示 */}
          <div className="mt-6 rounded-xl bg-[var(--bg-muted)] p-4 text-sm text-[#475569]">
            说明：本模块为区块链溯源系统的产品级交互原型，当前使用示例数据。未来将对接联盟链/私有链，并呈现温湿度曲线、地图轨迹与证书附件。
          </div>
        </div>
      )}
    </div>
  );
}

