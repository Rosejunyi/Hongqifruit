export default function ContactPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">联系我们</h1>
      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <form className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#64748B]">公司名称</label>
              <input className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-[#64748B]">联系人</label>
              <input className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-[#64748B]">需求类型</label>
              <select className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2">
                <option>即用净菜</option>
                <option>即食水果</option>
                <option>定制服务</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#64748B]">预计用量（月）</label>
              <input className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2" />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-[#64748B]">需求描述</label>
              <textarea className="mt-1 w-full rounded-lg border border-[#CBD5E1] px-3 py-2" rows={5} />
            </div>
          </div>
          <button type="button" className="btn-primary mt-6">提交（占位）</button>
          <div className="mt-2 text-xs text-[#94A3B8]">提交后当前仅展示占位提示，后续可对接邮箱/企业微信/腾讯云函数。</div>
        </form>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="text-sm font-medium">联系方式</div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[var(--hongqi-green)]">📞</span>
              <div>
                <div className="text-sm font-medium">业务咨询</div>
                <div className="text-sm text-[#64748B]">169-4605-6068</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--hongqi-green)]">📞</span>
              <div>
                <div className="text-sm font-medium">客服热线</div>
                <div className="text-sm text-[#64748B]">187-1008-3331</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--hongqi-green)]">📧</span>
              <div>
                <div className="text-sm font-medium">邮箱</div>
                <div className="text-sm text-[#64748B]">info@hongqi-garden.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--hongqi-green)]">📍</span>
              <div>
                <div className="text-sm font-medium">地址</div>
                <div className="text-sm text-[#64748B]">上海市嘉定区（具体地址待补充）</div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm font-medium">备案信息</div>
          <div className="mt-2 text-xs text-[#94A3B8]">沪ICP备XXXXXX号-1（占位）｜沪公网安备 XXXXXXXXXXXXX 号（占位）</div>
          <div className="mt-6">
            <div className="aspect-video bg-[var(--bg-muted)] grid place-items-center rounded-xl">地图占位（高德/百度）</div>
          </div>
        </div>
      </div>
    </div>
  );
}

