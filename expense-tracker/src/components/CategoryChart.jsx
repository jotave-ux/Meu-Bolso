import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { CATEGORIES, categoryColor } from '../utils/categories';
import { formatBRL, isCurrentMonth } from '../utils/format';

export default function CategoryChart({ entries }) {
  const data = CATEGORIES.map((cat) => {
    const total = entries
      .filter((e) => e.type === 'saida' && e.category === cat.id && isCurrentMonth(e.date))
      .reduce((sum, e) => sum + e.amount, 0);
    return { id: cat.id, label: cat.label, total };
  }).filter((d) => d.total > 0);

  if (data.length === 0) {
    return null;
  }

  return (
    <section className="chart-card" aria-label="Saídas por categoria no mês">
      <h2>Saídas por categoria</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={110}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4A453B', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => formatBRL(value)}
            contentStyle={{
              background: '#FBF8F1',
              border: '1px solid #D8D2C4',
              borderRadius: 0,
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 12,
            }}
          />
          <Bar dataKey="total" radius={[0, 2, 2, 0]} barSize={16}>
            {data.map((d) => (
              <Cell key={d.id} fill={categoryColor(d.id)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
