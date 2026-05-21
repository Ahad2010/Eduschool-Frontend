export default function StatCard({ title, value, subtitle, icon, iconBg, badge, badgeColor }) {
  return (
    <div className="bg-white dark:bg-[#1a1f37] rounded-2xl p-5 border border-gray-100 dark:border-[#1e2744] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      {subtitle && <p className="text-green-500 text-xs mt-1 font-medium">{subtitle}</p>}
    </div>
  );
}