import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';

export default function StatCard({
  title,
  value,
  growth,
  subtitle,
  icon: Icon,
  type = 'sparkline',
  sparklineColor = '#E7B84D',
  percentage = 67,
  subMeta = '',
}) {
  return (
    <div className="admin-stat-card">
      <div className="stat-card-left">
        <div className="stat-icon-wrapper">
          <Icon size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-title">{title}</span>
          <span className="stat-value">{value}</span>
          {growth && (
            <div className="stat-trend">
              <ArrowUpRight size={14} />
              <span>{growth}</span>
              <span className="stat-trend-sub">vs last month</span>
            </div>
          )}
          {subMeta && <div className="stat-trend neutral">{subMeta}</div>}
          {subtitle && <div className="stat-trend neutral">{subtitle}</div>}
        </div>
      </div>

      <div className="stat-card-graphic">
        {type === 'sparkline' && (
          <svg width="65" height="32" viewBox="0 0 65 32" fill="none">
            <path
              d="M2 28C10 24 16 14 26 20C36 26 44 8 63 4"
              stroke={sparklineColor}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}

        {type === 'circular' && (
          <div className="circular-progress-wrap">
            <svg width="46" height="46" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeDasharray={`${percentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="circular-progress-text">{percentage}%</span>
          </div>
        )}

        {type === 'stars' && (
          <div className="stat-stars-row">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} fill="#eab308" stroke="#eab308" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
