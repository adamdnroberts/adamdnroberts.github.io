/*
 * Source for /postdoc-math/ — compiled to assets/html/bridge-earnings-model.html.
 *
 * Jekyll ignores top-level _ directories, so this file is never published.
 * React, ReactDOM, PropTypes and Recharts arrive as globals from CDN <script>
 * tags in the HTML shell; there is no bundler and no npm install.
 *
 * To rebuild after editing:
 *   npx esbuild _src/bridge-earnings-model.jsx --loader:.jsx=jsx \
 *     --format=iife --target=es2018 --outfile=/tmp/app.js
 *   then splice /tmp/app.js into the <script> block at the bottom of
 *   assets/html/bridge-earnings-model.html.
 *
 * The expected-value view (odds of landing TT, weighted against a non-academic
 * fallback) is commented out throughout rather than deleted — search for
 * "expected-value" to bring it back.
 */

const { useState, useMemo } = React;
const {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} = Recharts;


// ---- palette (three well-separated data colors) ----
const C = {
  straight: "#2dd4bf", // teal
  postdoc: "#fbbf24",  // amber
  phdOnly: "#fb7185",  // rose
  ink: "#f1f4f7",
  muted: "#98a1ab",
  hair: "#3b4148",
  canvas: "#1c1c1d",
};

const money = (x) =>
  "$" + Math.round(x).toLocaleString("en-US");
const moneyK = (x) =>
  Math.abs(x) >= 1000 ? "$" + Math.round(x / 1000) + "k" : "$" + Math.round(x);

// A single labeled slider
function Control({ label, hint, value, set, min, max, step, fmt }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[13px] text-slate-700">{label}</span>
        <span className="text-[13px] tabular-nums font-medium text-slate-900">
          {fmt ? fmt(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        className="w-full mt-1 accent-slate-700 cursor-pointer"
      />
      {hint && <div className="text-[11px] text-slate-400 mt-0.5">{hint}</div>}
    </label>
  );
}

function Toggle({ options, value, set }) {
  return (
    <div className="inline-flex rounded-md border border-slate-200 p-0.5 bg-white">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => set(o.v)}
          className={
            "px-3 py-1 text-[12px] rounded transition-colors " +
            (value === o.v
              ? "bg-slate-800 text-white"
              : "text-slate-600 hover:text-slate-900")
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function GroupHeader({ children }) {
  return (
    <div className="text-[12px] font-semibold text-slate-500 tracking-tight pt-1">
      {children}
    </div>
  );
}

function App() {
  // timing
  const [extraPhD, setExtraPhD] = useState(1);
  const [postdocYears, setPostdocYears] = useState(2);
  // salaries
  const [stipend, setStipend] = useState(32000);
  const [postdocSalary, setPostdocSalary] = useState(58000);
  const [ttBase, setTtBase] = useState(92000);
  const [premium, setPremium] = useState(15000);
  const [phdPremium, setPhdPremium] = useState(8000);
  // raises & inflation
  const [raise, setRaise] = useState(2);       // % annual nominal
  const [tenureBump, setTenureBump] = useState(10); // % at tenure
  const [tenureYear, setTenureYear] = useState(6);  // TT-year index of bump
  const [inflation, setInflation] = useState(3);
  // retirement
  const [match, setMatch] = useState(10);      // % employer contribution
  const [retReturn, setRetReturn] = useState(6); // % nominal growth of pot
  // odds & fallback — only the expected-value view used these (disabled below)
  // const [pStraight, setPStraight] = useState(35);
  // const [pPostdoc, setPPostdoc] = useState(55);
  // const [altBase, setAltBase] = useState(115000);
  // const [altRaise, setAltRaise] = useState(4);
  // view
  const [horizonMode, setHorizonMode] = useState("ten"); // ten | ret
  const [retYears, setRetYears] = useState(33);
  const [dollars, setDollars] = useState("real"); // real | nom
  // const [view, setView] = useState("land"); // land | ev

  const H = horizonMode === "ten" ? 10 : retYears;
  const r = raise / 100, i = inflation / 100, ret = retReturn / 100;
  const bump = tenureBump / 100, m = match / 100;

  const model = useMemo(() => {
    // bridge = ordered [{sal, yrs}] before TT
    const bridges = {
      straight: [],
      postdoc: postdocYears > 0 ? [{ sal: postdocSalary, yrs: postdocYears, contrib: true }] : [],
      // Path 3: stay in the PhD longer, then go straight to TT — no postdoc,
      // so it earns the extra-PhD premium but not the postdoc placement premium.
      phdOnly: extraPhD > 0 ? [{ sal: stipend, yrs: extraPhD, contrib: false }] : [],
    };

    // yearly nominal salary + whether it earns a retirement match, for a path
    const yearlySalary = (bridge, ttStart, alt) => {
      const bridgeLen = bridge.reduce((a, b) => a + b.yrs, 0);
      const sal = [], contribFlag = [];
      for (let t = 0; t < H; t++) {
        if (t < bridgeLen) {
          // find bridge stage
          let acc = 0, chosen = bridge[0];
          for (const st of bridge) { if (t < acc + st.yrs) { chosen = st; break; } acc += st.yrs; }
          sal.push(chosen.sal);
          contribFlag.push(chosen.contrib);
        } else {
          const k = t - bridgeLen;
          // Expected-value view (disabled): the non-academic fallback path.
          // if (alt) {
          //   sal.push(altBase * Math.pow(1 + altRaise / 100, k));
          //   contribFlag.push(true);
          // } else {
          const s = ttStart * Math.pow(1 + r, k) * (k >= tenureYear ? (1 + bump) : 1);
          sal.push(s);
          contribFlag.push(true);
          // }
        }
      }
      return { sal, contribFlag, bridgeLen };
    };

    const compute = (bridge, ttStart /*, p */) => {
      const tt = yearlySalary(bridge, ttStart, false);
      // const alt = yearlySalary(bridge, ttStart, true);
      let grossNom = 0, grossReal = 0, potNom = 0;
      const cumReal = [], cumNom = [];
      // const cumEVReal = [], cumEVNom = [];
      let aR = 0, aN = 0;
      // let eR = 0, eN = 0;
      for (let t = 0; t < H; t++) {
        const disc = Math.pow(1 + i, t);
        const ttReal = tt.sal[t] / disc, ttNom = tt.sal[t];
        // const altReal = alt.sal[t] / disc, altNom = alt.sal[t];
        grossNom += ttNom; grossReal += ttReal;
        if (tt.contribFlag[t]) potNom += m * ttNom * Math.pow(1 + ret, H - 1 - t);
        aR += ttReal; aN += ttNom;
        // eR += p * ttReal + (1 - p) * altReal;
        // eN += p * ttNom + (1 - p) * altNom;
        cumReal.push({ t: t + 1, v: aR });
        cumNom.push({ t: t + 1, v: aN });
        // cumEVReal.push({ t: t + 1, v: eR });
        // cumEVNom.push({ t: t + 1, v: eN });
      }
      const potReal = potNom / Math.pow(1 + i, H - 1);
      return {
        grossNom, grossReal, potNom, potReal,
        // evReal: eR, evNom: eN,
        cumReal, cumNom,
        // cumEVReal, cumEVNom,
      };
    };

    const A = compute(bridges.straight, ttBase);
    const B = compute(bridges.postdoc, ttBase + premium);
    const D = compute(bridges.phdOnly, ttBase + phdPremium * extraPhD);

    // break-even premium for postdoc vs straight (conditional, current $ mode)
    const grossOf = (o) => (dollars === "real" ? o.grossReal : o.grossNom);
    const b0 = compute(bridges.postdoc, ttBase + 0);
    const b1 = compute(bridges.postdoc, ttBase + 1000);
    const slope = (grossOf(b1) - grossOf(b0)) / 1000; // per $1 premium
    const breakEven = slope > 1e-9 ? (grossOf(A) - grossOf(b0)) / slope : null;

    return { A, B, D, breakEven };
  }, [
    extraPhD, postdocYears, stipend, postdocSalary, ttBase, premium, phdPremium,
    raise, tenureBump, tenureYear, inflation, match, retReturn,
    H, dollars, r, i, ret, bump, m,
  ]);

  const { A, B, D, breakEven } = model;

  const pick = (o) => {
    // if (view === "ev") return dollars === "real" ? o.evReal : o.evNom;
    return dollars === "real" ? o.grossReal : o.grossNom;
  };
  const withRet = (o) => pick(o) + (dollars === "real" ? o.potReal : o.potNom);

  const paths = [
    { key: "straight", name: "Straight to TT", color: C.straight, o: A },
    { key: "postdoc", name: `Postdoc (${postdocYears}y)`, color: C.postdoc, o: B },
    { key: "phdOnly", name: `+${extraPhD}y PhD, no postdoc`, color: C.phdOnly, o: D },
  ];

  // chart data merge
  const seriesKey = dollars === "real" ? "cumReal" : "cumNom";
  const chartData = [];
  for (let t = 0; t < H; t++) {
    chartData.push({
      t: t + 1,
      straight: A[seriesKey][t].v,
      postdoc: B[seriesKey][t].v,
      phdOnly: D[seriesKey][t].v,
    });
  }

  // leader for hero
  const scored = paths.map((p) => ({ ...p, val: pick(p.o) })).sort((a, b) => b.val - a.val);
  const leader = scored[0], runner = scored[1];
  const margin = leader.val - runner.val;

  const dollarLabel = dollars === "real" ? "today's dollars" : "nominal dollars";
  const horizonLabel = horizonMode === "ten" ? "over 10 years" : `over ${retYears} years`;

  return (
    <div style={{ background: C.canvas }} className="min-h-screen w-full text-slate-900">
      <div className="max-w-6xl mx-auto px-5 py-7">
        {/* header */}
        <header className="mb-6">
          <h1 className="text-[26px] leading-tight font-semibold text-slate-900">
            The cost of the bridge
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 max-w-[70ch]">
            How a postdoc — or an extra year of the PhD first — reshapes your
            earnings, once you account for the peak years a delay pushes off the
            end. Every figure is a placeholder. Move the sliders.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* CONTROLS */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-4">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <span className="text-[12px] text-slate-500">Horizon</span>
                <Toggle
                  value={horizonMode} set={setHorizonMode}
                  options={[{ v: "ten", label: "10 years" }, { v: "ret", label: "To retirement" }]}
                />
              </div>
              {horizonMode === "ret" && (
                <Control label="Years until retirement" value={retYears} set={setRetYears}
                  min={15} max={40} step={1} />
              )}
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <span className="text-[12px] text-slate-500">Dollars</span>
                <Toggle
                  value={dollars} set={setDollars}
                  options={[{ v: "real", label: "Real" }, { v: "nom", label: "Nominal" }]}
                />
              </div>
              {/* Expected-value view, disabled for now:
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <span className="text-[12px] text-slate-500">Compare</span>
                <Toggle
                  value={view} set={setView}
                  options={[{ v: "land", label: "If you land TT" }, { v: "ev", label: "Expected value" }]}
                />
              </div>
              */}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
              <GroupHeader>Timing</GroupHeader>
              <Control label="Extra PhD years (path 3)" value={extraPhD} set={setExtraPhD}
                min={0} max={3} step={1} />
              <Control label="Postdoc years" value={postdocYears} set={setPostdocYears}
                min={0} max={4} step={1} />

              <GroupHeader>Salaries</GroupHeader>
              <Control label="Grad stipend" value={stipend} set={setStipend}
                min={20000} max={50000} step={1000} fmt={money} />
              <Control label="Postdoc salary" value={postdocSalary} set={setPostdocSalary}
                min={40000} max={85000} step={1000} fmt={money} />
              <Control label="TT base (straight out)" value={ttBase} set={setTtBase}
                min={70000} max={160000} step={1000} fmt={money}
                hint="9-month; summer money is separate" />
              <Control label="Postdoc placement premium" value={premium} set={setPremium}
                min={0} max={60000} step={1000} fmt={money}
                hint="extra TT base a postdoc buys you" />
              <Control label="Extra PhD year premium" value={phdPremium} set={setPhdPremium}
                min={0} max={40000} step={1000} fmt={money}
                hint="extra TT base per additional dissertation year (path 3)" />

              <GroupHeader>Raises &amp; inflation</GroupHeader>
              <Control label="Annual raise" value={raise} set={setRaise}
                min={0} max={5} step={0.5} fmt={(v) => v + "%"} />
              <Control label="Tenure bump" value={tenureBump} set={setTenureBump}
                min={0} max={20} step={1} fmt={(v) => "+" + v + "%"} />
              <Control label="Bump in TT year" value={tenureYear} set={setTenureYear}
                min={4} max={9} step={1} />
              <Control label="Inflation" value={inflation} set={setInflation}
                min={0} max={6} step={0.5} fmt={(v) => v + "%"} />

              <GroupHeader>Retirement (employer)</GroupHeader>
              <Control label="Employer contribution" value={match} set={setMatch}
                min={0} max={15} step={1} fmt={(v) => v + "%"} />
              <Control label="Pot growth rate" value={retReturn} set={setRetReturn}
                min={0} max={9} step={0.5} fmt={(v) => v + "%"} />

              {/* Inputs for the expected-value view, disabled for now:
              <GroupHeader>Odds &amp; fallback</GroupHeader>
              <Control label="P(land TT) going straight" value={pStraight} set={setPStraight}
                min={5} max={95} step={5} fmt={(v) => v + "%"} />
              <Control label="P(land TT) after postdoc" value={pPostdoc} set={setPPostdoc}
                min={5} max={95} step={5} fmt={(v) => v + "%"} />
              <Control label="Non-academic base (fallback)" value={altBase} set={setAltBase}
                min={70000} max={220000} step={5000} fmt={money} />
              <Control label="Non-academic raise" value={altRaise} set={setAltRaise}
                min={0} max={8} step={0.5} fmt={(v) => v + "%"} />
              */}
            </div>
          </aside>

          {/* RESULTS */}
          <main className="space-y-5">
            {/* hero verdict */}
            <div
              className="rounded-xl border bg-white p-5"
              style={{ borderColor: C.hair, boxShadow: "0 1px 2px rgba(0,0,0,.35)" }}
            >
              <div className="text-[12px] text-slate-500 mb-1">
                {"If you land the job"} · {horizonLabel} · {dollarLabel}
              </div>
              <div className="text-[22px] leading-snug font-semibold">
                <span style={{ color: leader.color }}>{leader.name}</span> leads
                {margin < 1 ? " — it's a tie" : (
                  <> by <span className="tabular-nums">{money(margin)}</span></>
                )}
                <span className="text-slate-400 font-normal"> vs {runner.name}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[14px] text-slate-600">
                {breakEven == null ? (
                  "A postdoc can't pay for itself here — it adds no TT years in this window."
                ) : (
                  <>
                    Break-even: a postdoc pays for itself once its placement
                    premium clears{" "}
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {money(Math.max(0, breakEven))}
                    </span>
                    . You've set it to{" "}
                    <span className="font-semibold tabular-nums">{money(premium)}</span>
                    {premium >= breakEven ? " — above the line." : " — below the line."}
                  </>
                )}
              </div>
            </div>

            {/* chart */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-[13px] font-medium text-slate-700 mb-2">
                Cumulative earnings ({dollarLabel})
              </div>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData} margin={{ top: 8, right: 12, left: 8, bottom: 4 }}>
                    <CartesianGrid stroke="#2f353b" vertical={false} />
                    <XAxis
                      dataKey="t" tick={{ fontSize: 11, fill: C.muted }}
                      label={{ value: "years from now", position: "insideBottom", offset: -2, fontSize: 11, fill: C.muted }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: C.muted }}
                      tickFormatter={(v) => "$" + Math.round(v / 1000) + "k"}
                      width={52}
                    />
                    <Tooltip
                      formatter={(v, n) => [money(v), n]}
                      labelFormatter={(l) => `year ${l}`}
                      contentStyle={{ fontSize: 12, borderRadius: 8, background: "#212529", border: "1px solid " + C.hair }}
                      labelStyle={{ color: C.muted }}
                      itemStyle={{ color: C.ink }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    {horizonMode === "ret" && (
                      <ReferenceLine x={10} stroke="#4b535c" strokeDasharray="3 3"
                        label={{ value: "10-yr mark", fontSize: 10, fill: C.muted, position: "top" }} />
                    )}
                    <Line type="monotone" dataKey="straight" name="Straight to TT"
                      stroke={C.straight} strokeWidth={2.2} dot={false} />
                    <Line type="monotone" dataKey="postdoc" name={`Postdoc (${postdocYears}y)`}
                      stroke={C.postdoc} strokeWidth={2.2} dot={false} />
                    <Line type="monotone" dataKey="phdOnly" name={`+${extraPhD}y PhD, no postdoc`}
                      stroke={C.phdOnly} strokeWidth={2.2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* table */}
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-200 bg-slate-50/60">
                    <th className="text-left font-medium px-4 py-2.5">Path</th>
                    <th className="text-right font-medium px-4 py-2.5">Gross earnings</th>
                    <th className="text-right font-medium px-4 py-2.5">+ employer retirement</th>
                    <th className="text-right font-medium px-4 py-2.5">vs leader</th>
                  </tr>
                </thead>
                <tbody>
                  {paths.map((p) => {
                    const v = pick(p.o);
                    const diff = v - leader.val;
                    return (
                      <tr key={p.key} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-2.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-sm mr-2 align-middle"
                            style={{ background: p.color }} />
                          {p.name}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{money(v)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-slate-500">
                          {money(withRet(p.o))}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums"
                          style={{ color: diff === 0 ? C.ink : diff < 0 ? "#f87171" : "#4ade80" }}>
                          {diff === 0 ? "—" : (diff > 0 ? "+" : "") + money(diff)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* reading */}
            <div className="text-[13px] text-slate-600 leading-relaxed px-1">
              <p>
                These are the numbers <em>if the TT job lands</em>. Switch the
                horizon: the delayed paths tend to trail at 10 years (you're
                still on the bridge) and catch up — or overtake — by retirement,
                because a placement premium compounds over every remaining TT
                year while the stipend years it costs you are paid for only
                once. Path 3 buys that premium with dissertation time instead
                of a postdoc, on a stipend rather than a postdoc salary — so it
                is the cheaper delay only if an extra year of writing moves your
                placement about as much as a postdoc would.
              </p>
              {/* Expected-value view, disabled for now:
                <p>
                  This weights each path by its odds of landing TT, with the
                  non-academic fallback filling the rest. If your fallback pays
                  more than a TT line, raising P(TT) can <em>lower</em> expected
                  earnings — the postdoc's real value here is insurance (a higher
                  chance of the outcome you want), not the dollars.
                </p>
              */}
            </div>
          </main>
        </div>

        <footer className="text-[11px] text-slate-400 mt-8 max-w-[80ch]">
          A planning sketch, not financial advice. It ignores taxes, cost-of-living
          and currency differences between institutions, non-salary benefits beyond
          the employer retirement contribution, and outside-offer raises — the last
          being the biggest real driver of academic pay growth.
        </footer>
      </div>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
