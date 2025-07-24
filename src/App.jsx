import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- ICONS (Inline SVG for Portability) ---
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

const ICONS = {
  home: "M10 2.5a1.5 1.5 0 0 1 3 0v.518l4.484 3.363a1.5 1.5 0 0 1 .516 1.074v9.545a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.999a1.5 1.5 0 0 1 .516-1.074L7.999 3.018V2.5a1.5 1.5 0 0 1 2.001 0zM12 4.531l-5.999 4.5V19.5h12V9.03l-6-4.5z",
  orders: "M6.5 2A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 17.5 2h-11zM7 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v17a.5.5 0 0 1-.5-.5h-9a.5.5 0 0 1-.5-.5v-17zM9 7a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1z",
  products: "M20 6.5a2.5 2.5 0 0 0-2.5-2.5H15V3a1 1 0 1 0-2 0v1H9V3a1 1 0 1 0-2 0v1H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-11zM6 6.5A1.5 1.5 0 0 1 7.5 5h1.086a1 1 0 1 0 0-2H7.5A3.5 3.5 0 0 0 4 6.5v.586a1 1 0 1 0 2 0V6.5zm8-3.5a1 1 0 1 0-2 0v1.5a1 1 0 1 0 2 0V3zM7.5 21a1.5 1.5 0 0 1-1.5-1.5v-11a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5-1.5h-9z",
  marketing: "M19.5 9.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1zM4 18.5a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1zM17.707 5.293a1 1 0 0 0-1.414 0L11 10.586 8.707 8.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414z",
  data: "M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z",
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  tag: "M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z",
  chevronDown: "M12 15.5a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L12 13.086l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 12 15.5z",
  search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  lightbulb: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19c-3.86 0-7 3.14-7 7 0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z",
  upload: "M9 16h6v-6h4l-8-8-8 8h4v6zm-4 2h14v2H5v-2z",
  close: "M6.414 5L12 10.586 17.586 5 19 6.414 13.414 12 19 17.586 17.586 19 12 13.414 6.414 19 5 17.586 10.586 12 5 6.414z",
  trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  discount: "M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.38-.38.59-.88.59-1.42s-.21-1.04-.59-1.42zM13 20.01L4 11V4h7v.01l9 9-7 7.01zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5 7.33 8 6.5 8z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  arrowLeft: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
  info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  trendingUp: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z",
  trendingDown: "M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z",
  calendar: "M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2zm3 18H5V8h14v12z",
  arrowRight: "M10 17l5-5-5-5v10z",
  checkCircle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  shipping: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zM18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
};

// --- UTILITY FUNCTIONS ---
const formatYAxisLabel = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)} Jt`; // Jt for Juta (Million)
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)} Rb`; // Rb for Ribu (Thousand)
  }
  return value.toString();
};

const getCurrentTimestamp = () => new Date().toISOString();

// --- DATA UTILITIES ---
const generateChartData = (days) => {
    const endDate = new Date('2025-07-24');
    const data = [];
    let numPoints, interval, unit;

    // Determine the granularity of data points based on the total duration
    if (days <= 31) { // Daily for a month or less
        numPoints = days;
        interval = 1;
        unit = 'day';
    } else if (days <= 180) { // Weekly for up to 6 months
        numPoints = Math.ceil(days / 7);
        interval = 7;
        unit = 'day';
    } else if (days <= 365 * 2) { // Monthly for up to 2 years
        numPoints = Math.ceil(days / 30);
        interval = 1;
        unit = 'month';
    } else { // Yearly for > 2 years
        numPoints = Math.ceil(days / 365);
        interval = 1;
        unit = 'year';
    }

    for (let i = 0; i < numPoints; i++) {
        const date = new Date(endDate);
        if (unit === 'day') {
            date.setDate(endDate.getDate() - (numPoints - 1 - i) * interval);
        } else if (unit === 'month') {
            date.setMonth(endDate.getMonth() - (numPoints - 1 - i) * interval);
        } else if (unit === 'year') {
            date.setFullYear(endDate.getFullYear() - (numPoints - 1 - i) * interval);
        }

        let dayLabel;
        if (unit === 'year') {
            dayLabel = date.getFullYear().toString();
        } else if (unit === 'month') {
            dayLabel = date.toLocaleString('default', { month: 'short', year: '2-digit' });
        } else { // day or week
            dayLabel = `${date.getMonth() + 1}/${date.getDate()}`;
        }
        
        data.push({
            day: dayLabel,
            sales: Math.floor(Math.random() * 85000000) + 25000000,
            visitors: Math.floor(Math.random() * 200) + 100,
            orders: Math.floor(Math.random() * 40) + 10,
            pageViews: Math.floor(Math.random() * 400) + 200,
            sessions: Math.floor(Math.random() * 250) + 150,
        });
    }
    return {
        overviewChart: data.map(d => ({ day: d.day, sales: d.sales, visitors: d.visitors, orders: d.orders })),
        trafficChart: data.map(d => ({ day: d.day, pageViews: d.pageViews, visitors: d.visitors, sessions: d.sessions })),
    };
};


const initialData7Days = generateChartData(7);

// --- MOCK DATA FOR DYNAMIC KPIS ---
const kpiDataByRange = {
    'Last 7 Days': [
        { name: "Revenue (GMV)", value: "Rp 58.750.000", change: "+5.2%", isPositive: true },
        { name: "Orders", value: "320", change: "+8.1%", isPositive: true },
        { name: "Conversion Rate", value: "3.5%", change: "-0.5%", isPositive: false },
        { name: "Visitors", value: "4.250", change: "+12.0%", isPositive: true },
    ],
    'Last 14 Days': [
        { name: "Revenue (GMV)", value: "Rp 112.300.000", change: "+3.1%", isPositive: true },
        { name: "Orders", value: "610", change: "+4.5%", isPositive: true },
        { name: "Conversion Rate", value: "3.8%", change: "+0.3%", isPositive: true },
        { name: "Visitors", value: "8.100", change: "+9.2%", isPositive: true },
    ],
    'Last 30 Days': [
        { name: "Revenue (GMV)", value: "Rp 245.800.000", change: "+1.8%", isPositive: true },
        { name: "Orders", value: "1.350", change: "+2.2%", isPositive: true },
        { name: "Conversion Rate", value: "4.1%", change: "+0.6%", isPositive: true },
        { name: "Visitors", value: "17.500", change: "+5.8%", isPositive: true },
    ],
    '3 Months': [
        { name: "Revenue (GMV)", value: "Rp 750.1M", change: "+1.5%", isPositive: true },
        { name: "Orders", value: "4.150", change: "+1.9%", isPositive: true },
        { name: "Conversion Rate", value: "4.2%", change: "+0.7%", isPositive: true },
        { name: "Visitors", value: "53.000", change: "+4.5%", isPositive: true },
    ],
    '6 Months': [
        { name: "Revenue (GMV)", value: "Rp 1.5B", change: "+1.2%", isPositive: true },
        { name: "Orders", value: "8.500", change: "+1.5%", isPositive: true },
        { name: "Conversion Rate", value: "4.3%", change: "+0.8%", isPositive: true },
        { name: "Visitors", value: "110.000", change: "+4.1%", isPositive: true },
    ],
    '1 Year': [
        { name: "Revenue (GMV)", value: "Rp 3.1B", change: "+0.9%", isPositive: true },
        { name: "Orders", value: "17.200", change: "+1.1%", isPositive: true },
        { name: "Conversion Rate", value: "4.4%", change: "+0.9%", isPositive: true },
        { name: "Visitors", value: "230.000", change: "+3.8%", isPositive: true },
    ],
    '2 Years': [
        { name: "Revenue (GMV)", value: "Rp 6.5B", change: "+0.7%", isPositive: true },
        { name: "Orders", value: "35.000", change: "+0.9%", isPositive: true },
        { name: "Conversion Rate", value: "4.5%", change: "+1.0%", isPositive: true },
        { name: "Visitors", value: "480.000", change: "+3.5%", isPositive: true },
    ],
    '3 Years': [
        { name: "Revenue (GMV)", value: "Rp 10.2B", change: "+0.6%", isPositive: true },
        { name: "Orders", value: "54.000", change: "+0.8%", isPositive: true },
        { name: "Conversion Rate", value: "4.6%", change: "+1.1%", isPositive: true },
        { name: "Visitors", value: "750.000", change: "+3.2%", isPositive: true },
    ],
    '4 Years': [
        { name: "Revenue (GMV)", value: "Rp 14.1B", change: "+0.5%", isPositive: true },
        { name: "Orders", value: "75.000", change: "+0.7%", isPositive: true },
        { name: "Conversion Rate", value: "4.7%", change: "+1.2%", isPositive: true },
        { name: "Visitors", value: "1.1M", change: "+2.9%", isPositive: true },
    ],
    '5 Years': [
        { name: "Revenue (GMV)", value: "Rp 18.5B", change: "+0.4%", isPositive: true },
        { name: "Orders", value: "98.000", change: "+0.6%", isPositive: true },
        { name: "Conversion Rate", value: "4.8%", change: "+1.3%", isPositive: true },
        { name: "Visitors", value: "1.5M", change: "+2.6%", isPositive: true },
    ],
};

// --- [NEW] MOCK DATA FOR DYNAMIC MARKETING IMPACT ---
const marketingImpactDataByRange = {
    'Last 7 Days': { withMarketing: { revenue: "Rp 7.275.000", orders: 45, conversion: "4.8%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 5.950.000", orders: 38, conversion: "3.9%", note: "Estimated performance without discounts." } },
    'Last 14 Days': { withMarketing: { revenue: "Rp 15.100.000", orders: 92, conversion: "5.1%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 12.500.000", orders: 75, conversion: "4.1%", note: "Estimated performance without discounts." } },
    'Last 30 Days': { withMarketing: { revenue: "Rp 32.800.000", orders: 205, conversion: "5.5%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 28.150.000", orders: 160, conversion: "4.5%", note: "Estimated performance without discounts." } },
    '3 Months': { withMarketing: { revenue: "Rp 98.4M", orders: 615, conversion: "5.6%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 84.4M", orders: 480, conversion: "4.6%", note: "Estimated performance without discounts." } },
    '6 Months': { withMarketing: { revenue: "Rp 195M", orders: 1200, conversion: "5.7%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 165M", orders: 950, conversion: "4.7%", note: "Estimated performance without discounts." } },
    '1 Year': { withMarketing: { revenue: "Rp 400M", orders: 2500, conversion: "5.8%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 330M", orders: 1900, conversion: "4.8%", note: "Estimated performance without discounts." } },
    '2 Years': { withMarketing: { revenue: "Rp 850M", orders: 5200, conversion: "5.9%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 680M", orders: 4000, conversion: "4.9%", note: "Estimated performance without discounts." } },
    '3 Years': { withMarketing: { revenue: "Rp 1.3B", orders: 8000, conversion: "6.0%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 1.0B", orders: 6200, conversion: "5.0%", note: "Estimated performance without discounts." } },
    '4 Years': { withMarketing: { revenue: "Rp 1.8B", orders: 11000, conversion: "6.1%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 1.4B", orders: 8500, conversion: "5.1%", note: "Estimated performance without discounts." } },
    '5 Years': { withMarketing: { revenue: "Rp 2.4B", orders: 14500, conversion: "6.2%", note: "Includes sales from ongoing promotions." }, withoutMarketing: { revenue: "Rp 1.9B", orders: 11000, conversion: "5.2%", note: "Estimated performance without discounts." } },
};


// --- INITIAL MOCK DATA (with updated order structure) ---
const initialMockData = {
  summary: { totalSales: 7275000, productsListed: 12, remainingStock: 23, dailyChart: initialData7Days.overviewChart, },
  expiringProducts: [ { id: 1, name: "Chocolate Croissant", stock: 5, timeLeft: "02:15:30" }, { id: 2, name: "Whole Wheat Bread", stock: 8, timeLeft: "03:40:15" }, { id: 3, name: "Sugar Donut", stock: 10, timeLeft: "04:05:00" }, ],
  allOrders: [
      { id: 'ORD-765', customer: 'John Doe', items: 1, total: 112500, status: 'Needs Confirmation', date: '2025-07-24', address: '1 Merdeka St, Jakarta', phone: '081234567890', products: [{name: 'Chocolate Croissant', qty: 1, price: 112500}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T10:00:00Z' }] },
      { id: 'ORD-766', customer: 'Siti Aminah', items: 1, total: 180000, status: 'Preparing', date: '2025-07-24', address: 'Jl. Kebon Sirih No. 10, Jakarta', phone: '081234567895', products: [{name: 'Whole Wheat Bread', qty: 1, price: 180000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T09:30:00Z' }, { status: 'Preparing', timestamp: '2025-07-24T09:35:00Z' }] },
      { id: 'ORD-767', customer: 'Budi Hartono', items: 2, total: 150000, status: 'Awaiting Pickup', date: '2025-07-24', address: 'Jl. MH Thamrin Kav. 5, Jakarta', phone: '081234567896', products: [{name: 'Sugar Donut', qty: 2, price: 75000}], courier: 'GoSend', trackingNumber: 'GK-123456789', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T08:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-24T08:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-24T08:20:00Z' }] },
      { id: 'ORD-761', customer: 'Eko Prasetyo', items: 2, total: 420000, status: 'In Transit', date: '2025-07-22', address: '5 Asia Afrika St, Jakarta', phone: '081234567894', products: [{name: 'Whole Wheat Bread', qty: 2, price: 210000}], courier: 'GrabExpress', trackingNumber: 'GE-987654321', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-22T11:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-22T11:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-22T11:30:00Z' }, { status: 'In Transit', timestamp: '2025-07-22T12:00:00Z' }] },
      { id: 'ORD-764', customer: 'Jane Smith', items: 2, total: 375000, status: 'Completed', date: '2025-07-24', address: '2 Sudirman St, Jakarta', phone: '081234567891', products: [{name: 'Sugar Donut', qty: 2, price: 75000}, {name: 'Pandan Cake', qty: 1, price: 225000}], courier: 'Maxim', trackingNumber: 'MX-555444333', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-23T14:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-23T14:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-23T14:30:00Z' }, { status: 'In Transit', timestamp: '2025-07-23T15:00:00Z' }, { status: 'Completed', timestamp: '2025-07-24T10:00:00Z' }] },
      { id: 'ORD-762', customer: 'Dewi Anggraini', items: 3, total: 675000, status: 'Cancelled', date: '2025-07-23', reason: 'Cancelled by buyer', address: '4 Thamrin St, Jakarta', phone: '081234567893', products: [{name: 'Chicken Pastel', qty: 3, price: 225000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-23T09:00:00Z' }, { status: 'Cancelled', timestamp: '2025-07-23T09:05:00Z' }] },
      { id: 'ORD-768', customer: 'Rina Wulandari', items: 1, total: 45000, status: 'Completed', date: '2025-07-21', address: 'Jl. Gatot Subroto No. 12, Jakarta', phone: '081234567888', products: [{name: 'Chicken Pastel', qty: 1, price: 45000}], courier: 'GoSend', trackingNumber: 'GK-112233445', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-21T10:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-21T10:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-21T10:20:00Z' }, { status: 'In Transit', timestamp: '2025-07-21T10:45:00Z' }, { status: 'Completed', timestamp: '2025-07-21T11:30:00Z' }] },
      { id: 'ORD-769', customer: 'Ahmad Yusuf', items: 3, total: 337500, status: 'In Transit', date: '2025-07-23', address: 'Jl. Rasuna Said Kuningan, Jakarta', phone: '081234567887', products: [{name: 'Chocolate Croissant', qty: 3, price: 112500}], courier: 'GrabExpress', trackingNumber: 'GE-554433221', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-23T13:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-23T13:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-23T13:25:00Z' }, { status: 'In Transit', timestamp: '2025-07-23T14:00:00Z' }] },
      { id: 'ORD-770', customer: 'Lia Kartika', items: 1, total: 375000, status: 'Preparing', date: '2025-07-24', address: 'Jl. Cikini Raya No. 7, Jakarta', phone: '081234567886', products: [{name: 'Pandan Cake', qty: 1, price: 375000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T11:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-24T11:02:00Z' }] },
      { id: 'ORD-771', customer: 'Agus Santoso', items: 5, total: 375000, status: 'Needs Confirmation', date: '2025-07-24', address: 'Jl. Menteng No. 15, Jakarta', phone: '081234567885', products: [{name: 'Sugar Donut', qty: 5, price: 75000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T12:30:00Z' }] },
      { id: 'ORD-772', customer: 'Maya Sari', items: 2, total: 300000, status: 'Completed', date: '2025-07-20', address: 'Jl. Senopati No. 50, Jakarta', phone: '081234567884', products: [{name: 'Whole Wheat Bread', qty: 1, price: 150000}, {name: 'Pandan Cake', qty: 1, price: 150000}], courier: 'Maxim', trackingNumber: 'MX-987651234', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-20T09:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-20T09:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-20T09:20:00Z' }, { status: 'In Transit', timestamp: '2025-07-20T09:45:00Z' }, { status: 'Completed', timestamp: '2025-07-20T10:30:00Z' }] },
      { id: 'ORD-773', customer: 'Dian Permata', items: 2, total: 90000, status: 'Cancelled', date: '2025-07-22', reason: 'Customer changed mind', address: 'Jl. Panglima Polim No. 2, Jakarta', phone: '081234567883', products: [{name: 'Chicken Pastel', qty: 2, price: 45000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-22T15:00:00Z' }, { status: 'Cancelled', timestamp: '2025-07-22T15:01:00Z' }] },
      { id: 'ORD-774', customer: 'Fajar Nugraha', items: 1, total: 112500, status: 'Awaiting Pickup', date: '2025-07-24', address: 'Jl. Kemang Raya No. 88, Jakarta', phone: '081234567882', products: [{name: 'Chocolate Croissant', qty: 1, price: 112500}], courier: 'GoSend', trackingNumber: 'GK-778899001', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T10:10:00Z' }, { status: 'Preparing', timestamp: '2025-07-24T10:15:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-24T10:30:00Z' }] },
      { id: 'ORD-775', customer: 'Indah Lestari', items: 4, total: 720000, status: 'Completed', date: '2025-07-19', address: 'Jl. Radio Dalam No. 1, Jakarta', phone: '081234567881', products: [{name: 'Whole Wheat Bread', qty: 4, price: 180000}], courier: 'GrabExpress', trackingNumber: 'GE-123123123', statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-19T11:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-19T11:05:00Z' }, { status: 'Awaiting Pickup', timestamp: '2025-07-19T11:20:00Z' }, { status: 'In Transit', timestamp: '2025-07-19T11:45:00Z' }, { status: 'Completed', timestamp: '2025-07-19T12:30:00Z' }] },
      { id: 'ORD-776', customer: 'Rizky Maulana', items: 2, total: 750000, status: 'Preparing', date: '2025-07-24', address: 'Jl. Barito No. 2, Jakarta', phone: '081234567880', products: [{name: 'Pandan Cake', qty: 2, price: 375000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: '2025-07-24T13:00:00Z' }, { status: 'Preparing', timestamp: '2025-07-24T13:02:00Z' }] },
  ],
  allProducts: [
    { id: 1, name: "Chocolate Croissant", images: ['https://placehold.co/600x600/EFE3C2/123524?text=Bread%201'], price: 112500, discountPrice: null, stock: 5, sales: 15, status: 'Live', desc: 'Crispy croissant with a premium melted chocolate filling.', views: 350, conversion: 0.042 },
    { id: 2, name: "Whole Wheat Bread", images: ['https://placehold.co/600x600/EFE3C2/123524?text=Bread'], price: 180000, discountPrice: 150000, stock: 8, sales: 22, status: 'Live', desc: 'Healthy whole wheat bread, great for breakfast.', views: 510, conversion: 0.043 },
    { id: 3, name: "Sugar Donut", images: ['https://placehold.co/600x600/EFE3C2/123524?text=Cake'], price: 75000, discountPrice: null, stock: 10, sales: 30, status: 'Live', desc: 'Soft donut with a sweet powdered sugar topping.', views: 820, conversion: 0.036 },
    { id: 4, name: "Pandan Cake", images: ['https://placehold.co/600x600/EFE3C2/123524?text=Cake'], price: 375000, discountPrice: null, stock: 0, sales: 5, status: 'Out of Stock', desc: 'Fragrant pandan cake with a soft texture.', views: 150, conversion: 0.033 },
    { id: 5, name: "Chicken Pastel", images: [], price: 45000, discountPrice: null, stock: 15, sales: 0, status: 'In Review', desc: 'Savory pastel with a chicken and vegetable filling.', views: 45, conversion: 0 },
  ],
  promotions: [ { id: 1, name: "Flash Bread Discount", type: "Product Discount", status: "Ongoing", startDate: "2025-07-24T00:00:00", endDate: "2025-07-25T23:59:59", desc: "Get a 20% discount on all bread products. Perfect for breakfast or an afternoon snack!", discountedProducts: [{productId: 2, discountPercentage: 20}], performance: { products_sold: 150, revenue: 18750000 } }, { id: 2, name: "Cake Price Cut", type: "Product Discount", status: "Upcoming", startDate: "2025-07-26T00:00:00", endDate: "2025-07-28T23:59:59", desc: "Special discount for our delicious cakes.", discountedProducts: [{productId: 4, discountPercentage: 10}], performance: null }, { id: 3, name: "Payday Promo", type: "Product Discount", status: "Finished", startDate: "2025-06-25T00:00:00", endDate: "2025-06-26T23:59:59", desc: "Enjoy special prices on our best-selling products during the payday period.", discountedProducts: [{productId: 1, discountPercentage: 15}, {productId: 3, discountPercentage: 15}], performance: { products_sold: 320, revenue: 67500000 } }, ],
  dataCompass: {
    kpi: kpiDataByRange,
    marketingImpact: marketingImpactDataByRange,
    sources: [ { name: "Organic Search", value: "65%", change: "+15.2%", isPositive: true }, { name: "Social Media", value: "20%", change: "+8.1%", isPositive: true }, { name: "Direct", value: "10%", change: "-2.5%", isPositive: false }, { name: "Referral", value: "5%", change: "+3.0%", isPositive: true }, ]
  }
};

// --- Reusable Components ---
const Card = ({ children, className = '' }) => (<div className={`bg-white rounded-xl shadow-sm ${className}`}>{children}</div>);
const TabButton = ({ label, isActive, onClick }) => (<button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${isActive ? 'bg-[#EFE3C2] text-[#123524] shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>{label}</button>);
const StatusBadge = ({ status }) => {
  const styles = { 'Live': 'bg-green-100 text-green-800', 'Ongoing': 'bg-green-100 text-green-800', 'In Review': 'bg-yellow-100 text-yellow-800', 'Upcoming': 'bg-yellow-100 text-yellow-800', 'Out of Stock': 'bg-red-100 text-red-800', 'Finished': 'bg-gray-200 text-gray-800', 'Needs Confirmation': 'bg-rose-100 text-rose-800', 'Preparing': 'bg-amber-100 text-amber-800', 'Awaiting Pickup': 'bg-sky-100 text-sky-800', 'In Transit': 'bg-blue-100 text-blue-800', 'Cancelled': 'bg-gray-200 text-gray-800', 'Completed': 'bg-teal-100 text-teal-800' };
  return <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100'}`}>{status}</span>;
};
const Modal = ({ children, isOpen, onClose, size = 'max-w-2xl' }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full ${size} max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
                <div className="relative">{children}</div>
            </div>
        </div>
    );
};
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => (
    <Modal isOpen={isOpen} onClose={onClose} size="max-w-md">
        <div className="p-6 text-center">
            <Icon path={ICONS.trash} className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium text-[#123524] mt-4">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
        <div className="mt-6 p-6 flex justify-center gap-4 bg-gray-50 rounded-b-2xl">
            <button onClick={onClose} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Cancel</button>
            <button onClick={onConfirm} className="px-6 py-2 rounded-md font-semibold text-red-700 bg-red-100 hover:bg-red-200 transition-colors">Delete</button>
        </div>
    </Modal>
);
const DiscountModal = ({ isOpen, onClose, onApply, product }) => {
    const [discount, setDiscount] = useState(product?.discountPrice || '');
    const handleApply = () => {
        onApply(product.id, discount ? Number(discount) : null);
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="max-w-md">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-[#123524]">Set Discount</h2>
                <p className="text-gray-600 mb-4">For product: <span className="font-semibold">{product?.name}</span></p>
                <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700 font-semibold">Original Price</span>
                            <input type="text" value={`Rp ${product?.price.toLocaleString('id-ID')}`} disabled className="mt-1 block w-full rounded-md bg-gray-200 border-gray-300 shadow-sm text-gray-500" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 font-semibold">Discount Price</span>
                            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="Contoh: 120000" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                        </label>
                </div>
            </div>
            <div className="flex justify-end gap-4 p-6 mt-4 bg-gray-50 rounded-b-2xl">
                <button onClick={onClose} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Cancel</button>
                <button onClick={handleApply} className="px-6 py-2 rounded-md font-semibold text-[#123524] bg-[#85A947] hover:bg-[#a0c45e] transition-colors shadow-sm hover:shadow-lg">Apply Discount</button>
            </div>
        </Modal>
    );
};

// --- [MODIFIED] DateRangePicker as Dropdown ---
const DateRangePicker = ({ selectedRange, onRangeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ranges = ['Last 7 Days', 'Last 14 Days', 'Last 30 Days', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years'];
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleSelect = (range) => {
        onRangeChange(range);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-48 bg-white border rounded-lg p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E7B27]"
            >
                <span>{selectedRange}</span>
                <Icon path={ICONS.chevronDown} className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border">
                    <ul className="py-1">
                        {ranges.map(range => (
                            <li key={range}>
                                <button
                                    onClick={() => handleSelect(range)}
                                    className={`w-full text-left px-4 py-2 text-sm ${selectedRange === range ? 'bg-[#EFE3C2] text-[#123524] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {range}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


// --- CHART COMPONENTS (Updated with Y-Axis) ---
const LineChart = ({ data, color, dataKey, labelKey }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    if (maxValue === 0 || data.length < 2) {
        return <div className="w-full h-48 flex items-center justify-center text-gray-500">Not enough data to display chart</div>;
    }
    const svgWidth = 500;
    const svgHeight = 100;

    const pathD = "M " + data.map((point, i) => {
        const x = (i / (data.length - 1)) * svgWidth;
        const y = svgHeight - (point[dataKey] / maxValue) * (svgHeight - 5); // -5 for top padding
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' L ');

    return (
        <div className="w-full h-48 flex items-start gap-2">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-right text-xs font-medium text-gray-400 h-[calc(100%-2rem)] pt-1 pr-1 w-12">
                <span>{formatYAxisLabel(maxValue)}</span>
                <span>{formatYAxisLabel(maxValue / 2)}</span>
                <span>0</span>
            </div>
            
            {/* Chart and X-Axis */}
            <div className="flex-1 h-full flex flex-col">
                <div className="flex-grow w-full relative">
                        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full" preserveAspectRatio="none">
                            <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                    {data.map(item => (
                        <span key={item[labelKey]} className="text-xs font-medium text-gray-500 text-center flex-1">{item[labelKey]}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MultiLineChart = ({ chartData, metrics, colors }) => {
    const svgWidth = 500;
    const svgHeight = 100;

    const maxValues = metrics.map(metric => Math.max(...chartData.map(d => d[metric.key])));

    if (chartData.length < 2) {
        return <div className="w-full h-64 flex items-center justify-center text-gray-500">Not enough data to display chart</div>;
    }
    
    // Use the max value of the first metric for the Y-Axis labels
    const primaryMaxValue = maxValues[0] || 0;

    // This hook calculates which labels to show on the X-axis to prevent clutter.
    const xAxisLabels = useMemo(() => {
        const labels = [];
        if (chartData.length < 2) return labels;

        const maxLabels = 7; // Set a maximum number of labels to avoid clutter

        if (chartData.length <= maxLabels) {
            // If the number of data points is small enough, show all labels.
            return chartData.map(d => ({ ...d, visible: true }));
        }

        // Calculate a step to pick labels evenly across the data range.
        const step = Math.ceil((chartData.length - 1) / (maxLabels - 1));
        
        // Create the label array, marking which ones should be visible.
        for (let i = 0; i < chartData.length; i++) {
            labels.push({
                ...chartData[i],
                // A label is visible if it's at a step interval or if it's the very last one.
                visible: i % step === 0 || i === chartData.length - 1
            });
        }
        return labels;
    }, [chartData]);

    return (
        <div className="w-full h-64 flex items-start gap-2">
            {/* Y-Axis Labels for the first metric */}
            <div className="flex flex-col justify-between text-right text-xs font-medium text-gray-400 h-[calc(100%-2rem)] pt-1 pr-1 w-12">
                <span>{formatYAxisLabel(primaryMaxValue)}</span>
                <span>{formatYAxisLabel(primaryMaxValue / 2)}</span>
                <span>0</span>
            </div>

            {/* Chart and X-Axis */}
            <div className="flex-1 h-full relative">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="absolute top-0 left-0 w-full h-[calc(100%-1.5rem)]" preserveAspectRatio="none">
                    {metrics.map((metric, metricIndex) => {
                        if(maxValues[metricIndex] === 0) return null;
                        const pathD = "M " + chartData.map((point, i) => {
                            const x = (i / (chartData.length - 1)) * svgWidth;
                            const y = svgHeight - (point[metric.key] / maxValues[metricIndex]) * (svgHeight - 10); // leave some padding
                            return `${x.toFixed(2)},${y.toFixed(2)}`;
                        }).join(' L ');
                        return <path key={metric.key} d={pathD} fill="none" stroke={colors[metricIndex]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
                    })}
                </svg>
                <div className="absolute bottom-0 w-full flex justify-between">
                    {xAxisLabels.map((item, index) => (
                        <span 
                            key={index} 
                            className={`text-xs text-gray-400 flex-1 text-center ${item.visible ? 'visible' : 'invisible'}`}
                        >
                            {item.day}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Page Views ---
const HomepageView = ({ data, onAddProductClick, onAddPromotionClick }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTimeLeft = (timeLeft) => {
        const parts = timeLeft.split(':').map(Number);
        let totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        totalSeconds -= 1; // Decrement every second
        if (totalSeconds < 0) totalSeconds = 0;
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };
    
    const salesAnalysisMetrics = [
        { key: 'sales', name: 'Sales' },
        { key: 'visitors', name: 'Visitors' },
        { key: 'orders', name: 'Orders' }
    ];
    const salesAnalysisColors = ['#123524', '#85A947', '#D6C49A'];

    return (
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-6">
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl bg-white text-[#123524] p-6 flex flex-col shadow-lg border border-gray-200">
                <h2 className="text-xl font-bold">Store Summary</h2>
                <p className="text-sm text-gray-500 mb-6">Today's sales performance.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                    <div className="bg-green-50 rounded-lg p-4 flex flex-col justify-between"><h3 className="font-semibold text-green-800">Total Sales (Today)</h3><p className="text-3xl font-bold text-[#123524]">Rp {data.summary.totalSales.toLocaleString('id-ID')}</p></div>
                    <div className="bg-green-50 rounded-lg p-4"><h3 className="font-semibold text-green-800">Listed Products</h3><p className="text-3xl font-bold text-[#123524]">{data.allProducts.length}</p></div>
                    <div className="bg-green-50 rounded-lg p-4 sm:col-span-2"><h3 className="font-semibold text-green-800">Total Stock Remaining</h3><p className="text-3xl font-bold text-[#123524]">{data.allProducts.reduce((sum, p) => sum + p.stock, 0)} pcs</p></div>
                </div>
            </div>
            <div className="lg:col-span-2 rounded-2xl bg-[#EFE3C2] p-6 flex flex-col shadow-lg">
                <h2 className="text-xl font-bold text-[#123524]">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4 mt-4 flex-grow">
                    <button onClick={onAddProductClick} className="bg-[#85A947] text-[#123524] font-bold p-4 rounded-lg flex flex-col items-center justify-center hover:bg-[#a0c45e] transition-all duration-300 transform hover:-translate-y-1"><Icon path={ICONS.plus} className="w-8 h-8 mb-2"/><span className="font-semibold text-sm text-center">Add Product</span></button>
                    <button onClick={onAddPromotionClick} className="bg-[#85A947] text-[#123524] font-bold p-4 rounded-lg flex flex-col items-center justify-center hover:bg-[#a0c45e] transition-all duration-300 transform hover:-translate-y-1"><Icon path={ICONS.tag} className="w-8 h-8 mb-2"/><span className="font-semibold text-sm text-center">Create Promotion</span></button>
                </div>
            </div>
            <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-[#85A947] p-6 text-[#123524] shadow-lg">
                <h2 className="text-xl font-bold">Expiring Soon!</h2>
                <p className="text-sm text-[#123524]/80 mb-4">These products must be sold today.</p>
                <div className="space-y-3">
                    {data.expiringProducts.map(product => (
                        <div key={product.id} className="bg-[#EFE3C2]/60 p-3 rounded-lg flex justify-between items-center">
                            <div><p className="font-bold">{product.name}</p><p className="text-xs">Stock left: {product.stock}</p></div>
                            <div className="text-right"><p className="font-mono font-semibold text-red-800">{formatTimeLeft(product.timeLeft)}</p><p className="text-xs">before expiry</p></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-2 lg:col-span-4 rounded-2xl bg-white p-6 shadow-lg">
                 <h2 className="text-xl font-bold text-[#123524]">Sales & Engagement Analysis</h2>
                 <p className="text-sm text-gray-500 mb-4">Performance trends for the last 7 days. Note: Metrics are scaled independently to show trends.</p>
                 <MultiLineChart
                   chartData={data.summary.dailyChart}
                   metrics={salesAnalysisMetrics}
                   colors={salesAnalysisColors}
                 />
                 <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t">
                       {salesAnalysisMetrics.map((metric, i) => (
                           <span key={metric.key} className="flex items-center text-sm text-gray-600">
                               <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: salesAnalysisColors[i]}}></span>
                               {metric.name}
                           </span>
                       ))}
                 </div>
            </div>
        </div>
    );
}

const ManageOrdersView = ({ data, onDetailClick, onUpdateStatus }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const tabs = ['All', 'Needs Confirmation', 'Preparing', 'Awaiting Pickup', 'In Transit', 'Completed', 'Cancelled'];
    
    const filteredOrders = useMemo(() => {
        return data.allOrders
            .filter(order => activeTab === 'All' || order.status === activeTab)
            .filter(order => {
                if (searchQuery.trim() === '') {
                    return true; // If search is empty, show all orders in the current tab
                }
                const lowercasedQuery = searchQuery.toLowerCase();
                
                // Check if any product name in the order matches the search query
                const productMatch = order.products.some(p => 
                    p.name.toLowerCase().includes(lowercasedQuery)
                );
                
                // Check other order fields
                return (
                    order.id.toLowerCase().includes(lowercasedQuery) ||
                    order.customer.toLowerCase().includes(lowercasedQuery) ||
                    (order.trackingNumber && order.trackingNumber.toLowerCase().includes(lowercasedQuery)) ||
                    productMatch
                );
            });
    }, [data.allOrders, activeTab, searchQuery]);

    const ActionButton = ({ order }) => {
        switch (order.status) {
            case 'Needs Confirmation':
                return <button onClick={() => onUpdateStatus(order, 'Accept')} className="font-semibold text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors">Accept Order</button>;
            case 'Preparing':
                return <button onClick={() => onUpdateStatus(order, 'Generate Label')} className="font-semibold text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">Generate Label</button>;
            case 'Awaiting Pickup':
                return <button onClick={() => onUpdateStatus(order, 'Ship')} className="font-semibold text-sm bg-sky-600 text-white px-3 py-1.5 rounded-md hover:bg-sky-700 transition-colors">Mark as Shipped</button>;
            case 'In Transit':
                 return <button onClick={() => onUpdateStatus(order, 'Complete')} className="font-semibold text-sm bg-teal-600 text-white px-3 py-1.5 rounded-md hover:bg-teal-700 transition-colors">Mark as Completed</button>;
            default:
                return <button onClick={() => onDetailClick(order)} className="font-medium text-[#3E7B27] hover:underline">Details</button>;
        }
    };

    return (
        <div className="p-6"><h1 className="text-2xl font-bold text-gray-800 mb-4">Order Management</h1><Card className="p-0">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">{tabs.map(tab => (<TabButton key={tab} label={`${tab} (${data.allOrders.filter(o => tab === 'All' || o.status === tab).length})`} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />))}</div>
                <div className="relative w-full sm:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search by ID, Customer, Product..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#85A947] text-gray-900" 
                    />
                    <Icon path={ICONS.search} className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            <div className="overflow-x-auto"><table className="w-full text-sm text-left text-gray-500"><thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Order ID</th><th scope="col" className="px-6 py-3">Customer</th><th scope="col" className="px-6 py-3">Shipping Info</th><th scope="col" className="px-6 py-3">Status</th><th scope="col" className="px-6 py-3">Date</th><th scope="col" className="px-6 py-3 text-center">Action</th></tr></thead>
                <tbody>{filteredOrders.map(order => (<tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">
                        {order.courier ? (
                            <div>
                                <p className="font-semibold text-gray-700">{order.courier}</p>
                                <p className="text-xs text-gray-500 font-mono">{order.trackingNumber}</p>
                            </div>
                        ) : (
                            <span className="text-gray-400">—</span>
                        )}
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4 text-center"><ActionButton order={order} /></td>
                </tr>))}</tbody>
            </table></div></Card></div>
    );
}

const ManageProductsView = ({ data, onAddProductClick, onEditProductClick, onDeleteProductClick, onDiscountProductClick }) => {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Live', 'Discounted', 'In Review', 'Out of Stock'];
    const filteredProducts = data.allProducts.filter(product => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Discounted') return !!product.discountPrice;
        return product.status === activeTab;
    });

    const getProductCount = (tab) => {
        if (tab === 'All') return data.allProducts.length;
        if (tab === 'Discounted') return data.allProducts.filter(p => !!p.discountPrice).length;
        return data.allProducts.filter(p => p.status === tab).length;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                <button onClick={onAddProductClick} className="bg-[#85A947] text-[#123524] font-bold px-4 py-2 rounded-md hover:bg-[#a0c45e] transition-colors flex items-center gap-2 shadow-sm hover:shadow-lg">
                    <Icon path={ICONS.plus} className="w-5 h-5" />Add Product
                </button>
            </div>
            <Card className="p-0">
                <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex space-x-2 overflow-x-auto pb-2">{tabs.map(tab => (<TabButton key={tab} label={`${tab} (${getProductCount(tab)})`} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />))}</div>
                </div>
                <div className="space-y-px bg-gray-100">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                        <div className="col-span-4">Product</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-1 text-center">Stock</div>
                        <div className="col-span-1 text-center">Sales</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-2 text-center">Actions</div>
                    </div>
                    {filteredProducts.map(product => (
                         <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 bg-white items-center hover:bg-gray-50 transition-colors">
                             <div className="col-span-4 font-medium text-gray-900 flex items-center gap-3">
                                 <img src={product.images[0] || 'https://placehold.co/80x80/f0f0f0/cccccc?text=...'} onError={(e) => e.target.src='https://placehold.co/80x80/f0f0f0/cccccc?text=Error'} alt={product.name} className="w-12 h-12 rounded-lg object-cover"/>
                                 <span className="truncate">{product.name}</span>
                             </div>
                             <div className="col-span-2 text-gray-800">
                                 {product.discountPrice ? (<div><span className="line-through text-gray-500">Rp {product.price.toLocaleString('id-ID')}</span><br/><span className="font-bold text-red-600">Rp {product.discountPrice.toLocaleString('id-ID')}</span></div>) : `Rp ${product.price.toLocaleString('id-ID')}`}
                             </div>
                             <div className="col-span-1 text-center text-gray-800">{product.stock}</div>
                             <div className="col-span-1 text-center text-gray-800">{product.sales}</div>
                             <div className="col-span-2 flex justify-center"><StatusBadge status={product.status} /></div>
                             <div className="col-span-2">
                                 <div className="flex items-center justify-center gap-3">
                                     <button onClick={() => onEditProductClick(product)} title="Edit Product" className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"><Icon path={ICONS.edit} className="w-5 h-5" /></button>
                                     <button onClick={() => onDiscountProductClick(product)} title="Set Discount" className="p-2 rounded-full text-orange-500 hover:bg-orange-100 transition-colors"><Icon path={ICONS.discount} className="w-5 h-5" /></button>
                                     <button onClick={() => onDeleteProductClick(product)} title="Delete Product" className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"><Icon path={ICONS.trash} className="w-5 h-5" /></button>
                                 </div>
                             </div>
                         </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

const MarketingView = ({ data, onDetailClick, onAddPromotionClick, onEditPromotionClick }) => {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Ongoing', 'Upcoming', 'Finished'];
    const filteredPromotions = data.promotions.filter(promo => activeTab === 'All' || promo.status === activeTab);

    const PromotionInfoCard = ({ promo }) => {
        const getProductDetails = (productId) => data.allProducts.find(p => p.id === productId);

        return (
            <Card className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-gray-800">{promo.name}</h2>
                            <StatusBadge status={promo.status} />
                        </div>
                        <p className="text-sm text-gray-500">{promo.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => onDetailClick(promo)} className="px-4 py-1.5 rounded-md text-sm font-semibold text-[#3E7B27] bg-white border border-gray-300 hover:bg-gray-100 transition-colors">View Details</button>
                        <button onClick={() => onEditPromotionClick(promo)} className="px-4 py-1.5 rounded-md text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors">Edit</button>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Promotion Period */}
                    <div className="md:col-span-1">
                        <h4 className="font-semibold text-gray-600 mb-2">Promotion Period</h4>
                        <div className="text-sm space-y-1 text-gray-800">
                            <p><span className="font-medium">Start:</span> {new Date(promo.startDate).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                            <p><span className="font-medium">End:</span> {new Date(promo.endDate).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                    </div>

                    {/* Discounted Products */}
                    <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-600 mb-2">Discounted Products ({promo.discountedProducts.length})</h4>
                        <div className="space-y-3">
                            {promo.discountedProducts.map(dp => {
                                const product = getProductDetails(dp.productId);
                                if (!product) return <div key={dp.productId} className="text-sm text-red-500">Product not found.</div>;
                                const discountedPrice = Math.round(product.price * (1 - dp.discountPercentage / 100));
                                return (
                                    <div key={dp.productId} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                        <img src={product.images[0] || 'https://placehold.co/80x80/f0f0f0/cccccc?text=...'} alt={product.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold text-gray-800">{product.name}</p>
                                            <p className="text-xs text-gray-500">
                                                <span className="line-through">Rp {product.price.toLocaleString('id-ID')}</span>
                                                <Icon path={ICONS.arrowRight} className="w-3 h-3 inline-block mx-1" />
                                                <span className="font-bold text-red-600">Rp {discountedPrice.toLocaleString('id-ID')}</span>
                                            </p>
                                        </div>
                                        <div className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full flex-shrink-0">
                                            {dp.discountPercentage}% OFF
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Performance */}
                {promo.performance && (
                     <div className="mt-4 pt-4 border-t">
                         <h4 className="font-semibold text-gray-600 mb-2">Performance Summary</h4>
                         <div className="grid grid-cols-2 gap-4 text-center">
                             <div>
                                 <p className="text-sm text-gray-500">Products Sold</p>
                                 <p className="text-2xl font-bold text-[#123524]">{promo.performance.products_sold.toLocaleString('id-ID')}</p>
                             </div>
                             <div>
                                 <p className="text-sm text-gray-500">Revenue Generated</p>
                                 <p className="text-2xl font-bold text-[#123524]">Rp {promo.performance.revenue.toLocaleString('id-ID')}</p>
                             </div>
                         </div>
                     </div>
                )}
            </Card>
        );
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Marketing Center</h1>
                <button onClick={onAddPromotionClick} className="bg-[#85A947] text-[#123524] font-bold px-4 py-2 rounded-md hover:bg-[#a0c45e] transition-colors flex items-center gap-2">
                    <Icon path={ICONS.plus} className="w-5 h-5" />Create Promotion
                </button>
            </div>
            <Card className="p-0">
                <div className="p-6 flex space-x-2 mb-4 border-b">{tabs.map(tab => (<TabButton key={tab} label={`${tab} (${data.promotions.filter(p => tab === 'All' || p.status === tab).length})`} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />))}</div>
                <div className="p-6 bg-gray-50 space-y-4">
                    {filteredPromotions.length > 0 ? (
                        filteredPromotions.map(promo => (
                            <PromotionInfoCard key={promo.id} promo={promo} />
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="font-semibold">No promotions in this category.</p>
                            <p className="text-sm">Try selecting another tab or creating a new promotion.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

const getDaysFromRange = (range) => {
    const parts = range.split(' ');
    let value;
    let unit;

    if (parts.length === 3) { // "Last X Days"
        value = parseInt(parts[1], 10);
        unit = parts[2].toLowerCase();
    } else if (parts.length === 2) { // "X Months/Year/Years"
        value = parseInt(parts[0], 10);
        unit = parts[1].toLowerCase();
    } else {
        return 7; // Default fallback
    }

    if (unit.startsWith('day')) {
        return value;
    } else if (unit.startsWith('month')) {
        return value * 30;
    } else if (unit.startsWith('year')) {
        return value * 365;
    }
    return 7;
};


const DataCompassView = ({ data, allProducts }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [dateRange, setDateRange] = useState('Last 7 Days');
    const [compassData, setCompassData] = useState({
        overviewChart: initialData7Days.overviewChart,
        trafficChart: initialData7Days.trafficChart,
    });
    const [productPerformanceData, setProductPerformanceData] = useState(allProducts);
    
    const displayedKpis = data.dataCompass.kpi[dateRange] || data.dataCompass.kpi['Last 7 Days'];
    const currentMarketingImpact = data.dataCompass.marketingImpact[dateRange] || data.dataCompass.marketingImpact['Last 7 Days'];

    useEffect(() => {
        const days = getDaysFromRange(dateRange);
        const newChartData = generateChartData(days);
        setCompassData({
            overviewChart: newChartData.overviewChart,
            trafficChart: newChartData.trafficChart,
        });

        // Simulate updating product performance data when date range changes
        const updatedProductData = allProducts.map(p => ({
            ...p,
            sales: Math.floor(Math.random() * (p.sales || 10) * (days / 7)) + Math.floor((p.sales || 10)),
            views: Math.floor(Math.random() * (p.views || 50) * (days / 7)) + Math.floor((p.views || 50)),
        }));
        setProductPerformanceData(updatedProductData);

    }, [dateRange, allProducts]);
    
    const KPICard = ({ item, className = '' }) => (
        <Card className={`p-4 flex flex-col h-full ${className}`}>
            <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
            <div className="mt-2 flex items-end space-x-2 flex-grow">
                <p className="text-3xl lg:text-4xl font-bold text-gray-800">{item.value}</p>
                <span className={`flex items-center text-sm font-semibold ${item.isPositive ? 'text-green-600' : 'text-red-600'} pb-1`}>
                    <Icon path={item.isPositive ? ICONS.trendingUp : ICONS.trendingDown} className="w-4 h-4 mr-1"/>
                    {item.change}
                </span>
            </div>
        </Card>
    );

    const renderContent = () => {
        switch(activeTab) {
            case 'Traffic':
                const trafficMetrics = [
                    { key: 'pageViews', name: 'Page Views' },
                    { key: 'visitors', name: 'Visitors' },
                    { key: 'sessions', name: 'Sessions' }
                ];
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 p-6">
                            <h3 className="text-lg font-bold text-gray-800">Traffic Trends</h3>
                            <p className="text-sm text-gray-500 mb-4">{dateRange}</p>
                            <MultiLineChart chartData={compassData.trafficChart} metrics={trafficMetrics} colors={['#3E7B27', '#85A947', '#D6C49A']} />
                                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t">
                                    {trafficMetrics.map((metric, i) => (
                                        <span key={metric.key} className="flex items-center text-sm text-gray-600"><span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: ['#3E7B27', '#85A947', '#D6C49A'][i]}}></span>{metric.name}</span>
                                    ))}
                                </div>
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Traffic Sources</h3>
                            <ul className="space-y-4">
                                {data.dataCompass.sources.map(source => (
                                    <li key={source.name}>
                                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                                            <span>{source.name}</span>
                                            <span className={`${source.isPositive ? 'text-green-600' : 'text-red-600'}`}>{source.change}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-[#3E7B27] h-2.5 rounded-full" style={{width: source.value}}></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                );
            case 'Product Performance':
                const sortedBySales = [...productPerformanceData].sort((a,b) => b.sales - a.sales);
                const sortedByViews = [...productPerformanceData].sort((a,b) => b.views - a.views);
                return (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800">Product Rankings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="p-6">
                                   <h3 className="font-semibold text-gray-800 mb-4">Best Sellers (by Units Sold)</h3>
                                   <ul className="space-y-4">
                                      {sortedBySales.slice(0, 5).map((p, i) => (
                                          <li key={p.id} className="flex items-center gap-4 text-sm">
                                              <span className="font-bold text-gray-400 w-4">{i+1}</span>
                                              <img src={p.images[0] || 'https://placehold.co/80x80/f0f0f0/cccccc?text=...'} alt={p.name} className="w-10 h-10 rounded-md object-cover"/>
                                              <span className="flex-grow font-medium text-gray-800 truncate">{p.name}</span>
                                              <span className="font-semibold text-gray-600">{p.sales} sold</span>
                                          </li>
                                      ))}
                                   </ul>
                                </Card>
                                 <Card className="p-6">
                                   <h3 className="font-semibold text-gray-800 mb-4">Most Viewed</h3>
                                   <ul className="space-y-4">
                                      {sortedByViews.slice(0, 5).map((p, i) => (
                                          <li key={p.id} className="flex items-center gap-4 text-sm">
                                              <span className="font-bold text-gray-400 w-4">{i+1}</span>
                                              <img src={p.images[0] || 'https://placehold.co/80x80/f0f0f0/cccccc?text=...'} alt={p.name} className="w-10 h-10 rounded-md object-cover"/>
                                              <span className="flex-grow font-medium text-gray-800 truncate">{p.name}</span>
                                              <span className="font-semibold text-gray-600">{p.views} views</span>
                                          </li>
                                      ))}
                                   </ul>
                                </Card>
                            </div>
                        </div>
                );
            case 'Overview':
            default:
                const overviewMetrics = [
                    { key: 'sales', name: 'Sales' },
                    { key: 'visitors', name: 'Visitors' },
                    { key: 'orders', name: 'Orders' }
                ];
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-3 p-6">
                            <h3 className="text-lg font-bold text-gray-800">Sales & Visitor Trends</h3>
                            <p className="text-sm text-gray-500 mb-4">{dateRange}</p>
                            <MultiLineChart chartData={compassData.overviewChart} metrics={overviewMetrics} colors={['#123524', '#85A947', '#D6C49A']} />
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t">
                                {overviewMetrics.map((metric, i) => (
                                    <span key={metric.key} className="flex items-center text-sm text-gray-600"><span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: ['#123524', '#85A947', '#D6C49A'][i]}}></span>{metric.name}</span>
                                ))}
                            </div>
                        </Card>
                    </div>
                );
        }
    }

    return (
        <div className="p-6 space-y-6 bg-white min-h-full">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Data Compass</h1>
                <DateRangePicker selectedRange={dateRange} onRangeChange={setDateRange} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayedKpis.map(item => (
                    <KPICard
                        key={item.name}
                        item={item}
                        className={item.name.includes("Revenue") ? "md:col-span-3" : ""}
                    />
                ))}
            </div>

            {/* [MODIFIED] Marketing Impact Section */}
            <div className="space-y-4 pt-6">
                 <h2 className="text-xl font-bold text-gray-800">Marketing Impact Analysis ({dateRange})</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6 bg-green-50 border border-green-200">
                         <h3 className="font-bold text-lg text-green-800 mb-2">With Marketing</h3>
                         <div className="space-y-2">
                             <div>
                                 <p className="text-sm text-gray-500">Revenue (GMV)</p>
                                 <p className="text-2xl font-bold text-green-900">{currentMarketingImpact.withMarketing.revenue}</p>
                             </div>
                              <div>
                                 <p className="text-sm text-gray-500">Orders</p>
                                 <p className="text-2xl font-bold text-green-900">{currentMarketingImpact.withMarketing.orders}</p>
                             </div>
                              <div>
                                 <p className="text-sm text-gray-500">Conversion Rate</p>
                                 <p className="text-2xl font-bold text-green-900">{currentMarketingImpact.withMarketing.conversion}</p>
                             </div>
                         </div>
                         <p className="text-xs text-gray-500 mt-4">{currentMarketingImpact.withMarketing.note}</p>
                      </Card>
                       <Card className="p-6 bg-gray-50 border">
                         <h3 className="font-bold text-lg text-gray-700 mb-2">Without Marketing (Est.)</h3>
                          <div className="space-y-2">
                             <div>
                                 <p className="text-sm text-gray-500">Revenue (GMV)</p>
                                 <p className="text-2xl font-bold text-gray-800">{currentMarketingImpact.withoutMarketing.revenue}</p>
                             </div>
                              <div>
                                 <p className="text-sm text-gray-500">Orders</p>
                                 <p className="text-2xl font-bold text-gray-800">{currentMarketingImpact.withoutMarketing.orders}</p>
                             </div>
                              <div>
                                 <p className="text-sm text-gray-500">Conversion Rate</p>
                                 <p className="text-2xl font-bold text-gray-800">{currentMarketingImpact.withoutMarketing.conversion}</p>
                             </div>
                         </div>
                         <p className="text-xs text-gray-500 mt-4">{currentMarketingImpact.withoutMarketing.note}</p>
                      </Card>
                 </div>
            </div>
            
            <div className="border-b border-gray-200 pt-6">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('Overview')} className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'Overview' ? 'border-[#123524] text-[#123524]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Overview</button>
                    <button onClick={() => setActiveTab('Traffic')} className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'Traffic' ? 'border-[#123524] text-[#123524]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Traffic</button>
                    <button onClick={() => setActiveTab('Product Performance')} className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'Product Performance' ? 'border-[#123524] text-[#123524]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Product Performance</button>
                </nav>
            </div>
            
            {renderContent()}

        </div>
    );
}


const AddEditProductPage = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState(product?.name || '');
    const [desc, setDesc] = useState(product?.desc || '');
    const [price, setPrice] = useState(product?.price || '');
    const [stock, setStock] = useState(product?.stock ?? '');
    const [images, setImages] = useState(product?.images || []);
    const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || null);
    const [isFormValid, setIsFormValid] = useState(false);

    // State for drag-and-drop functionality
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [draggedOverItemIndex, setDraggedOverItemIndex] = useState(null);

    const MIN_IMAGES = 1;
    const MAX_IMAGES = 9;

    useEffect(() => {
        const isValid = name.trim() !== '' && desc.trim() !== '' && Number(price) > 0 && stock !== '' && Number(stock) >= 0 && images.length >= MIN_IMAGES;
        setIsFormValid(isValid);
    }, [name, desc, price, stock, images]);

    useEffect(() => {
        if (images.length > 0 && !images.includes(selectedImage)) {
            setSelectedImage(images[0]);
        }
        if (images.length === 0) {
            setSelectedImage(null);
        }
    }, [images, selectedImage]);

    const handleImageUpload = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const remainingSlots = MAX_IMAGES - images.length;
            const filesToUpload = filesArray.slice(0, remainingSlots);
            const newImageUrls = filesToUpload.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...newImageUrls]);
        }
    };
    
    const handleRemoveImage = (imageUrlToRemove) => {
        setImages(prevImages => prevImages.filter(img => img !== imageUrlToRemove));
    };

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        setDraggedOverItemIndex(index);
    };

    const handleDrop = (e, targetIndex) => {
        // Prevent drop on itself
        if (draggedItemIndex === targetIndex) return;

        // Reorder the images array
        const newImages = [...images];
        const draggedItem = newImages.splice(draggedItemIndex, 1)[0];
        newImages.splice(targetIndex, 0, draggedItem);
        setImages(newImages);
    };

    const handleDragEnd = () => {
        setDraggedItemIndex(null);
        setDraggedOverItemIndex(null);
    };
    // --- End of Drag and Drop Handlers ---


    const handleSave = (status) => {
        const productData = {
            id: product?.id || Date.now(),
            name, desc, price: Number(price), stock: Number(stock), status,
            images,
            sales: product?.sales || 0,
            discountPrice: product?.discountPrice || null,
            views: product?.views || 0,
            conversion: product?.conversion || 0,
        };
        onSave(productData);
    };

    return (
        <div className="bg-gray-100 min-h-full">
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={onCancel} className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <Icon path={ICONS.arrowLeft} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Product Name</label>
                                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Example: Chocolate Chip Cookies" className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Description</label>
                                        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows="6" placeholder="Describe the uniqueness of your product..." className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900"></textarea>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price & Stock</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Price (Rp)</label>
                                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="150000" className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Stock</label>
                                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="20" className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                </div>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-2">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Product Gallery</h3>
                                <p className="text-sm text-gray-500 mb-4">Upload a minimum of {MIN_IMAGES} photo. Drag to reorder.</p>
                                <div className="space-y-4">
                                    {images.length === 0 ? (
                                        <label htmlFor="file-upload-main" className="w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <div className="text-center text-gray-500">
                                                <Icon path={ICONS.upload} className="w-12 h-12 mx-auto"/>
                                                <p className="mt-2 font-semibold">Upload Product Photos</p>
                                                <p className="text-xs">You can upload up to {MAX_IMAGES} photos</p>
                                            </div>
                                            <input id="file-upload-main" name="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
                                        </label>
                                    ) : (
                                        <>
                                            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                                <img src={selectedImage} onError={(e) => e.target.src='https://placehold.co/600x600/f0f0f0/cccccc?text=Error'} alt="Selected" className="w-full h-full object-cover"/>
                                            </div>
                                            <div
                                                className="flex gap-2 overflow-x-auto pb-2"
                                                onDrop={handleDrop}
                                                onDragOver={(e) => e.preventDefault()}
                                            >
                                                {images.map((img, index) => (
                                                    <div
                                                        key={img + index} // Use a more stable key if possible
                                                        className={`relative aspect-square h-20 w-20 flex-shrink-0 group transition-all duration-300 ${draggedItemIndex === index ? 'opacity-50 scale-105' : 'opacity-100 scale-100'}`}
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, index)}
                                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                                        onDragEnd={handleDragEnd}
                                                        onDrop={(e) => handleDrop(e, index)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    >
                                                        <img src={img} onClick={() => setSelectedImage(img)} className={`w-full h-full object-cover rounded-md cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-[#3E7B27]' : 'border-transparent hover:border-gray-400'}`} alt={`thumbnail ${index+1}`} />
                                                        <button onClick={() => handleRemoveImage(img)} className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                            <Icon path={ICONS.close} className="w-3 h-3"/>
                                                        </button>
                                                        {/* Visual indicator for drop position */}
                                                        {draggedOverItemIndex === index && draggedItemIndex !== index && (
                                                            <div className="absolute inset-0 bg-green-500/30 border-2 border-dashed border-green-700 rounded-lg pointer-events-none"></div>
                                                        )}
                                                    </div>
                                                ))}
                                                {images.length < MAX_IMAGES && (
                                                    <label htmlFor="file-upload-thumb" className="aspect-square h-20 w-20 flex-shrink-0 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                                        <Icon path={ICONS.plus} className="w-6 h-6 text-gray-400"/>
                                                        <input id="file-upload-thumb" name="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
                                                    </label>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="max-w-7xl mx-auto p-4 flex justify-end items-center gap-4">
                    {!isFormValid && (
                        <p className="text-sm text-red-600 mr-4">
                            Please complete all fields and upload at least {MIN_IMAGES} photo.
                        </p>
                    )}
                    <button onClick={() => handleSave('In Review')} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Save as Draft</button>
                    <button onClick={() => handleSave('Live')} disabled={!isFormValid} className="px-6 py-2 rounded-md font-semibold text-white bg-[#3E7B27] hover:bg-[#123524] transition-colors shadow-sm hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
                        Save & Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrderDetailView = ({ order, onClose }) => {
    const StatusTimeline = ({ history }) => (
        <ol className="relative border-l border-gray-200 ml-3">
            {history.map((item, index) => (
                <li key={index} className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                        <Icon path={ICONS.checkCircle} className="w-4 h-4 text-blue-600"/>
                    </span>
                    <h3 className="flex items-center mb-1 text-md font-semibold text-gray-900">{item.status}</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{new Date(item.timestamp).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</time>
                </li>
            ))}
        </ol>
    );

    return (
        <Modal isOpen={!!order} onClose={onClose} size="max-w-3xl">
            {order && <>
                <div className="p-6 flex justify-between items-start bg-gray-100 text-gray-800 rounded-t-2xl border-b">
                    <div>
                        <h2 className="text-2xl font-bold">Order Details</h2>
                        <p className="text-sm text-gray-500">{order.id}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><Icon path={ICONS.close} /></button>
                </div>
                <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-800 mb-2">Customer Info</h3>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-sm text-gray-600">{order.phone}</p>
                                <p className="text-sm text-gray-600 mt-1">{order.address}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-800 mb-2">Shipping Details</h3>
                                {order.courier ? (
                                    <>
                                        <p className="font-medium">{order.courier}</p>
                                        <p className="text-sm text-gray-600 font-mono">{order.trackingNumber}</p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-500">Shipping label has not been generated.</p>
                                )}
                            </div>
                             <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Product Summary ({order.items} item)</h3>
                                <div className="flow-root bg-white border rounded-lg p-4">
                                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                                        {order.products.map((p, i) => (
                                            <li key={i} className="flex items-center py-4">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img src={`https://placehold.co/64x64/EFE3C2/123524?text=${p.name.substring(0,1)}`} alt={p.name} className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>{p.name}</h3>
                                                            <p className="ml-4">Rp {(p.qty * p.price).toLocaleString('id-ID')}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{p.qty} x Rp {p.price.toLocaleString('id-ID')}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="bg-white p-4 rounded-lg border">
                             <h3 className="font-semibold text-gray-800 mb-4">Order History</h3>
                             <StatusTimeline history={order.statusHistory} />
                        </div>
                    </div>
                </div>
                <div className="p-6 flex justify-end items-center bg-gray-100 rounded-b-2xl">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Total Payment</p>
                        <p className="text-2xl font-bold text-gray-800">Rp {order.total.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </>}
        </Modal>
    );
}

const PromotionDetailView = ({ promo, onClose }) => (
    <Modal isOpen={!!promo} onClose={onClose} size="max-w-2xl">
        {promo && <>
            <div className="p-6 flex justify-between items-start bg-gray-100 text-gray-800 rounded-t-2xl border-b">
                <div>
                    <h2 className="text-2xl font-bold">Promotion Details</h2>
                    <p className="text-sm text-gray-500">{promo.name}</p>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><Icon path={ICONS.close} /></button>
            </div>
            <div className="p-6 bg-gray-50 space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-gray-500 text-sm">Period</h3>
                            <p className="font-medium text-gray-800">{new Date(promo.startDate).toLocaleString()} - {new Date(promo.endDate).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-500 text-sm text-right">Status</h3>
                            <div className="flex justify-end"><StatusBadge status={promo.status} /></div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <h3 className="font-semibold text-gray-500 text-sm">Description</h3>
                        <p className="text-gray-800">{promo.desc}</p>
                    </div>
                </div>
                
                {promo.performance ? (
                    <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-800 mb-2">Promotion Performance</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Products Sold</p>
                                <p className="text-2xl font-bold">{promo.performance.products_sold}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <p className="text-2xl font-bold">Rp {promo.performance.revenue.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200 text-center">
                        Promotion has not started. Performance data will be available once the promotion begins.
                    </div>
                )}
            </div>
            <div className="p-4 flex justify-end items-center bg-gray-100 rounded-b-2xl">
                <button onClick={onClose} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Close</button>
            </div>
        </>}
    </Modal>
);

// --- New Order Management Modals ---
const GenerateShippingModal = ({ isOpen, onClose, onConfirm, order }) => {
    const [courier, setCourier] = useState('');
    const couriers = ['GoSend', 'GrabExpress', 'Maxim'];

    const handleConfirm = () => {
        if (!courier) {
            // In a real app, you'd show a more elegant error message.
            // For this environment, we'll avoid window.alert().
            console.error("Please select a courier."); 
            return;
        }
        onConfirm(order.id, courier);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="max-w-md">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <Icon path={ICONS.shipping} className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-bold text-gray-900">Generate Shipping Label</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Select a courier to generate a tracking number and schedule a pickup for order <span className="font-semibold">{order?.id}</span>.</p>
                        </div>
                    </div>
                </div>
                 <div className="mt-6">
                    <label htmlFor="courier" className="block text-sm font-medium text-gray-700">Courier</label>
                    <select id="courier" name="courier" value={courier} onChange={(e) => setCourier(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] sm:text-sm rounded-md text-gray-900">
                        <option value="">Select a courier...</option>
                        {couriers.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-2xl">
                <button type="button" onClick={handleConfirm} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3E7B27] text-base font-medium text-white hover:bg-[#123524] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#85A947] sm:ml-3 sm:w-auto sm:text-sm">
                    Schedule Pickup
                </button>
                <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

const UpdateStatusConfirmationModal = ({ isOpen, onClose, onConfirm, order, newStatus }) => {
    const messages = {
        'Accept': { title: 'Accept Order?', message: `Are you sure you want to accept order ${order?.id}?`, icon: ICONS.checkCircle, color: 'green' },
        'Ship': { title: 'Mark as Shipped?', message: `Confirm that courier has picked up order ${order?.id}.`, icon: ICONS.shipping, color: 'sky' },
        'Complete': { title: 'Mark as Completed?', message: `Confirm that order ${order?.id} has been delivered to the customer.`, icon: ICONS.checkCircle, color: 'teal' },
    };
    const info = messages[newStatus] || {};

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="max-w-md">
            <div className="p-6 text-center">
                <Icon path={info.icon} className={`mx-auto h-12 w-12 text-${info.color}-500`} />
                <h3 className="text-lg font-medium text-[#123524] mt-4">{info.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{info.message}</p>
            </div>
            <div className="mt-6 p-6 flex justify-center gap-4 bg-gray-50 rounded-b-2xl">
                <button onClick={onClose} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Cancel</button>
                <button onClick={() => onConfirm(order.id)} className={`px-6 py-2 rounded-md font-semibold text-${info.color}-700 bg-${info.color}-100 hover:bg-${info.color}-200 transition-colors`}>Confirm</button>
            </div>
        </Modal>
    );
};


// --- Layout Components ---
const Sidebar = ({ activeMenu, setActiveMenu, setView }) => {
    const menuItems = [
        { id: 'Homepage', label: 'Homepage', icon: ICONS.home },
        { id: 'Orders', label: 'Orders', icon: ICONS.orders },
        { id: 'Products', label: 'Products', icon: ICONS.products },
        { id: 'Marketing', label: 'Marketing', icon: ICONS.marketing },
        { id: 'Data', label: 'Data Compass', icon: ICONS.data },
    ];

    const handleMenuClick = (menu) => {
        setActiveMenu(menu.id);
    };

    return (
        <div className="w-20 lg:w-64 bg-[#123524] text-white flex flex-col transition-all duration-300 shadow-lg flex-shrink-0">
            <div className="flex items-center justify-center lg:justify-start lg:pl-6 h-20 border-b border-white/10"><Icon path={ICONS.home} className="h-8 w-8 text-[#85A947]" /><span className="hidden lg:block ml-3 text-xl font-bold text-white">FoodSave</span></div>
            <nav className="flex-1 px-2 lg:px-4 py-4 space-y-1">
                {menuItems.map(item => (
                    <div key={item.id}>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick(item); }} className={`flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors ${activeMenu === item.id ? 'bg-[#85A947] text-[#123524] font-bold' : 'hover:bg-white/10 text-white'}`}>
                            <div className="flex items-center relative">
                                <Icon path={item.icon} className="h-6 w-6" />
                                <span className="hidden lg:block ml-4 font-semibold">{item.label}</span>
                            </div>
                        </a>
                    </div>
                ))}
            </nav>
            <div className="px-2 lg:px-4 py-4 border-t border-white/10">
                <a href="#" className="flex items-center justify-center lg:justify-start p-3 rounded-lg hover:bg-white/10"><Icon path={ICONS.user} className="h-6 w-6 text-white" /><span className="hidden lg:block ml-4 font-semibold text-white">Tasty Bakery</span></a>
                <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }} className="flex items-center justify-center lg:justify-start p-3 rounded-lg hover:bg-red-500/50"><Icon path={ICONS.logout} className="h-6 w-6 text-white" /><span className="hidden lg:block ml-4 font-semibold text-white">Logout</span></a>
            </div>
        </div>
    );
};

const DashboardLayout = ({ data, setData, setView, setEditingProduct, setEditingPromotion }) => {
    const [activeMenu, setActiveMenu] = useState('Data'); // Default to Data Compass
    const [hasNewOrder, setHasNewOrder] = useState(false);
    
    // State for modals
    const [orderToDetail, setOrderToDetail] = useState(null);
    const [promoToDetail, setPromoToDetail] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToDiscount, setProductToDiscount] = useState(null);
    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [updateAction, setUpdateAction] = useState(null); // 'Accept', 'Generate Label', 'Ship', 'Complete'

    useEffect(() => {
        const newOrderTimer = setTimeout(() => {
            setHasNewOrder(true);
            const newOrder = { id: `ORD-${Math.floor(Math.random() * 100) + 800}`, customer: 'New Customer', items: 1, total: 270000, status: 'Needs Confirmation', date: '2025-07-24', address: '1 New St, Jakarta', phone: '081200001111', products: [{name: 'Sugar Donut', qty: 1, price: 270000}], courier: null, trackingNumber: null, statusHistory: [{ status: 'Needs Confirmation', timestamp: getCurrentTimestamp() }] };
            setData(prevData => ({ ...prevData, allOrders: [newOrder, ...prevData.allOrders] }));
        }, 15000);
        return () => clearTimeout(newOrderTimer);
    }, [setData]);
    
    const handleDeleteProduct = () => {
        setData(prevData => ({
            ...prevData,
            allProducts: prevData.allProducts.filter(p => p.id !== productToDelete.id)
        }));
        setProductToDelete(null);
    };

    const handleApplyDiscount = (productId, discountPrice) => {
        setData(prevData => ({
            ...prevData,
            allProducts: prevData.allProducts.map(p => 
                p.id === productId ? { ...p, discountPrice: discountPrice } : p
            )
        }));
    };

    const handleAddPromotionClick = () => {
        setEditingPromotion(null);
        setView('addPromotion');
    };

    const handleEditPromotionClick = (promo) => {
        setEditingPromotion(promo);
        setView('editPromotion');
    };

    const handleOrderStatusUpdate = (order, action) => {
        setOrderToUpdate(order);
        setUpdateAction(action);
    };

    const confirmOrderStatusUpdate = (orderId, details) => {
        setData(prevData => {
            const newOrders = [...prevData.allOrders];
            const orderIndex = newOrders.findIndex(o => o.id === orderId);
            if (orderIndex === -1) return prevData;

            const order = newOrders[orderIndex];
            let newStatus = '';

            switch (updateAction) {
                case 'Accept': newStatus = 'Preparing'; break;
                case 'Generate Label': 
                    newStatus = 'Awaiting Pickup';
                    order.courier = details.courier;
                    order.trackingNumber = `${details.courier.substring(0,2).toUpperCase()}-${Math.floor(100000000 + Math.random() * 900000000)}`;
                    break;
                case 'Ship': newStatus = 'In Transit'; break;
                case 'Complete': newStatus = 'Completed'; break;
                default: return prevData;
            }
            
            order.status = newStatus;
            order.statusHistory.push({ status: newStatus, timestamp: getCurrentTimestamp() });
            
            return { ...prevData, allOrders: newOrders };
        });
        setOrderToUpdate(null);
        setUpdateAction(null);
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'Homepage': return <HomepageView data={data} onAddProductClick={() => { setEditingProduct(null); setView('addProduct'); }} onAddPromotionClick={handleAddPromotionClick} />;
            case 'Orders': return <ManageOrdersView data={data} onDetailClick={setOrderToDetail} onUpdateStatus={handleOrderStatusUpdate} />;
            case 'Products': return <ManageProductsView 
                data={data} 
                onAddProductClick={() => { setEditingProduct(null); setView('addProduct'); }} 
                onEditProductClick={(product) => { setEditingProduct(product); setView('editProduct'); }}
                onDeleteProductClick={setProductToDelete}
                onDiscountProductClick={setProductToDiscount}
            />;
            case 'Marketing': return <MarketingView data={data} onDetailClick={setPromoToDetail} onAddPromotionClick={handleAddPromotionClick} onEditPromotionClick={handleEditPromotionClick}/>;
            case 'Data': return <DataCompassView 
                data={data} 
                allProducts={data.allProducts}
            />;
            default: return <div className="p-6 text-2xl font-bold text-gray-800">Page {activeMenu}</div>;
        }
    };

    return (
        <div className="flex h-full w-full bg-[#f7f7f7]">
            <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} setView={setView} />
            <main className="flex-1 overflow-y-auto">{renderContent()}</main>
            
            <OrderDetailView order={orderToDetail} onClose={() => setOrderToDetail(null)} />
            <PromotionDetailView promo={promoToDetail} onClose={() => setPromoToDetail(null)} />
            <ConfirmationModal 
                isOpen={!!productToDelete} 
                onClose={() => setProductToDelete(null)}
                onConfirm={handleDeleteProduct}
                title="Delete Product?"
                message={`Are you sure you want to delete the product "${productToDelete?.name}"? This action cannot be undone.`}
            />
            <DiscountModal
                isOpen={!!productToDiscount}
                onClose={() => setProductToDiscount(null)}
                onApply={handleApplyDiscount}
                product={productToDiscount}
            />
            {/* Order Status Modals */}
            <GenerateShippingModal 
                isOpen={updateAction === 'Generate Label'}
                onClose={() => setUpdateAction(null)}
                onConfirm={(orderId, courier) => confirmOrderStatusUpdate(orderId, { courier })}
                order={orderToUpdate}
            />
            <UpdateStatusConfirmationModal
                isOpen={['Accept', 'Ship', 'Complete'].includes(updateAction)}
                onClose={() => setUpdateAction(null)}
                onConfirm={(orderId) => confirmOrderStatusUpdate(orderId)}
                order={orderToUpdate}
                newStatus={updateAction}
            />
        </div>
    );
};

// --- Auth Pages ---
const AuthLayout = ({ children }) => (<div className="min-h-screen w-full flex items-center justify-center bg-[#EFE3C2] p-4"><div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg"><div className="text-center"><h1 className="text-3xl font-bold text-[#123524]">Welcome to FoodSave</h1><p className="mt-2 text-gray-600">Sell surplus food, save the planet.</p></div>{children}</div></div>);
const LoginPage = ({ setView }) => (<AuthLayout><form className="mt-8 space-y-6"><div className="rounded-md shadow-sm -space-y-px"><div><input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:z-10 sm:text-sm" placeholder="Username" /></div><div><input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:z-10 sm:text-sm" placeholder="Password" /></div></div><div><button type="button" onClick={() => setView('dashboard')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3E7B27] hover:bg-[#123524] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#85A947]">Sign In</button></div></form><p className="mt-2 text-center text-sm text-gray-600">Don't have an account?{' '}<a href="#" onClick={(e) => { e.preventDefault(); setView('register'); }} className="font-medium text-[#3E7B27] hover:text-[#123524]">Register now</a></p></AuthLayout>);
const RegisterPage = ({ setView }) => (<AuthLayout><form className="mt-8 space-y-4"><input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] text-gray-900" /><input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] text-gray-900" /><input type="text" placeholder="Store Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] text-gray-900" /><input type="text" placeholder="Full Store Location" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] text-gray-900" /><select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3E7B27] focus:border-[#3E7B27] text-gray-500"><option>Select Product Type</option><option>Cakes & Bread</option><option>Heavy Meals</option><option>Beverages</option><option>Other</option></select><div><button type="button" onClick={() => setView('dashboard')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3E7B27] hover:bg-[#123524] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#85A947]">Register</button></div></form><p className="mt-2 text-center text-sm text-gray-600">Already have an account?{' '}<a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }} className="font-medium text-[#3E7B27] hover:text-[#123524]">Sign in here</a></p></AuthLayout>);

const AddEditPromotionPage = ({ promo, allProducts, onSave, onCancel }) => {
    const [name, setName] = useState(promo?.name || '');
    const [desc, setDesc] = useState(promo?.desc || '');
    
    const [startDate, setStartDate] = useState(promo ? new Date(promo.startDate).toISOString().split('T')[0] : '');
    const [startTime, setStartTime] = useState(promo ? new Date(promo.startDate).toTimeString().substring(0,5) : '00:00');
    const [endDate, setEndDate] = useState(promo ? new Date(promo.endDate).toISOString().split('T')[0] : '');
    const [endTime, setEndTime] = useState(promo ? new Date(promo.endDate).toTimeString().substring(0,5) : '23:59');

    const [discountedProducts, setDiscountedProducts] = useState(promo?.discountedProducts || []);
    const [dateError, setDateError] = useState(null);

    // Filter products that are available for promotion ('Live' status)
    const promotableProducts = allProducts.filter(p => p.status === 'Live');
    // Filter products that are not available
    const nonPromotableProducts = allProducts.filter(p => p.status !== 'Live');

    const isFormValid = useMemo(() => {
        return name.trim() !== '' && desc.trim() !== '' && startDate && endDate && discountedProducts.length > 0 && !dateError;
    }, [name, desc, startDate, endDate, discountedProducts, dateError]);

    useEffect(() => {
        // This function validates all date-related rules.
        const validateDates = () => {
            if (!startDate || !startTime || !endDate || !endTime) {
                setDateError(null); // Not enough info to validate yet
                return;
            }

            // Simulate current time in WIB (UTC+7)
            const nowWIB = new Date('2025-07-25T00:31:00.000+07:00');
            const startDateTime = new Date(`${startDate}T${startTime}`);
            const endDateTime = new Date(`${endDate}T${endTime}`);

            // Rule 1: Start time cannot be in the past.
            if (startDateTime < nowWIB) {
                setDateError("Waktu mulai promosi tidak boleh sudah lewat.");
                return;
            }
            
            // Ensure end date is after start date
            if (endDateTime <= startDateTime) {
                setDateError("Waktu selesai harus setelah waktu mulai.");
                return;
            }

            // Rule 2: Minimum duration is 3 days.
            const minDuration = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
            if (endDateTime.getTime() - startDateTime.getTime() < minDuration) {
                setDateError("Durasi promosi minimal 3 hari.");
                return;
            }

            // Rule 3: Maximum duration is 3 months.
            const maxEndDateTime = new Date(startDateTime);
            maxEndDateTime.setMonth(maxEndDateTime.getMonth() + 3);
            if (endDateTime > maxEndDateTime) {
                setDateError("Durasi promosi maksimal 3 bulan.");
                return;
            }

            // If all checks pass:
            setDateError(null);
        };

        validateDates();
    }, [startDate, startTime, endDate, endTime]);

    const handleProductDiscountChange = (productId, discount) => {
        const existing = discountedProducts.find(p => p.productId === productId);
        if (existing) {
            setDiscountedProducts(discountedProducts.map(p => p.productId === productId ? { ...p, discountPercentage: parseInt(discount, 10) || 0 } : p));
        }
    };

    const toggleProductInPromo = (productId) => {
        const isIncluded = discountedProducts.some(p => p.productId === productId);
        if (isIncluded) {
            setDiscountedProducts(discountedProducts.filter(p => p.productId !== productId));
        } else {
            setDiscountedProducts([...discountedProducts, { productId, discountPercentage: 20 }]); // Default discount 20%
        }
    };

    const handleSave = () => {
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const now = new Date();
        
        const promoData = {
            id: promo?.id || Date.now(),
            name,
            desc,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            status: startDateTime > now ? 'Upcoming' : 'Ongoing',
            type: 'Product Discount',
            discountedProducts: discountedProducts.filter(p => p.discountPercentage > 0),
            performance: promo?.performance || null,
        };
        onSave(promoData);
    };

    return (
        <div className="bg-gray-100 min-h-full">
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={onCancel} className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <Icon path={ICONS.arrowLeft} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">{promo ? 'Edit Promotion' : 'Create New Promotion'}</h1>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Promosi</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Nama Promosi</label>
                                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Diskon Gajian" className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                                        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows="4" placeholder="Jelaskan promosi Anda..." className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900"></textarea>
                                    </div>
                                </div>
                            </Card>
                             <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Jadwal Promosi</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Waktu Mulai</label>
                                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                    </div>
                                     <div>
                                        <label className="text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Waktu Selesai</label>
                                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#3E7B27] focus:ring focus:ring-[#3E7B27] focus:ring-opacity-50 text-gray-900" />
                                    </div>
                                </div>
                                {dateError && <p className="mt-4 text-center font-semibold text-red-600 bg-red-100 p-2 rounded-md">{dateError}</p>}
                            </Card>
                        </div>
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pilih Produk & Diskon</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {promotableProducts.map(p => {
                                    const isIncluded = discountedProducts.some(dp => dp.productId === p.id);
                                    const discountValue = discountedProducts.find(dp => dp.productId === p.id)?.discountPercentage || 0;
                                    return (
                                        <div key={p.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-50">
                                            <input type="checkbox" checked={isIncluded} onChange={() => toggleProductInPromo(p.id)} className="h-5 w-5 rounded text-[#3E7B27] focus:ring-[#85A947]" />
                                            <img src={p.images[0] || 'https://placehold.co/80x80/f0f0f0/cccccc?text=...'} alt={p.name} className="w-10 h-10 rounded-md object-cover"/>
                                            <div className="flex-grow">
                                                <p className="font-medium text-gray-800 truncate">{p.name}</p>
                                                <p className="text-xs text-gray-500">Rp {p.price.toLocaleString('id-ID')}</p>
                                            </div>
                                            {isIncluded && (
                                                <div className="flex items-center gap-1">
                                                    <input 
                                                        type="number" 
                                                        value={discountValue}
                                                        onChange={(e) => handleProductDiscountChange(p.id, e.target.value)}
                                                        className="w-16 p-1 text-center border-gray-300 rounded-md"
                                                        placeholder="0"
                                                    />
                                                    <span className="font-semibold text-gray-600">%</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {nonPromotableProducts.length > 0 && (
                                    <>
                                        <div className="pt-3 mt-3 border-t">
                                            <h4 className="px-2 text-sm font-semibold text-gray-500">Not available (status not Live)</h4>
                                        </div>
                                        {nonPromotableProducts.map(p => (
                                            <div key={p.id} className="flex items-center gap-4 p-2 rounded-md bg-gray-100 opacity-70 cursor-not-allowed">
                                                <input type="checkbox" disabled className="h-5 w-5 rounded" />
                                                <img src={p.images[0] || 'https://placehold.co/80x80/f0f0f0/cccccc?text=...'} alt={p.name} className="w-10 h-10 rounded-md object-cover"/>
                                                <div className="flex-grow">
                                                    <p className="font-medium text-gray-600 truncate">{p.name}</p>
                                                    <div className="text-xs text-gray-500">
                                                        <StatusBadge status={p.status} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="max-w-4xl mx-auto p-4 flex justify-end items-center gap-4">
                    {!isFormValid && (
                        <p className="text-sm text-red-600 mr-4">Silakan perbaiki error sebelum menyimpan.</p>
                    )}
                    <button onClick={onCancel} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Batal</button>
                    <button onClick={handleSave} disabled={!isFormValid} className="px-6 py-2 rounded-md font-semibold text-white bg-[#3E7B27] hover:bg-[#123524] transition-colors shadow-sm hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
                        Simpan Promosi
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    const [data, setData] = useState(initialMockData);
    const [view, setView] = useState('dashboard'); // Default to dashboard for quick testing
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingPromotion, setEditingPromotion] = useState(null);

    // This effect hook runs periodically to check and update promotion statuses.
    useEffect(() => {
        const promotionTimer = setInterval(() => {
            setData(currentData => {
                const now = new Date();
                let hasChanges = false;

                // Use deep copies to avoid direct state mutation.
                const updatedPromotions = JSON.parse(JSON.stringify(currentData.promotions));
                let updatedProducts = JSON.parse(JSON.stringify(currentData.allProducts));

                updatedPromotions.forEach(promo => {
                    const startDate = new Date(promo.startDate);
                    const endDate = new Date(promo.endDate);

                    // --- Logic to start an 'Upcoming' promotion ---
                    if (promo.status === 'Upcoming' && now >= startDate && now <= endDate) {
                        promo.status = 'Ongoing';
                        hasChanges = true;
                        
                        // Apply discounts to the associated products.
                        promo.discountedProducts.forEach(dp => {
                            const productIndex = updatedProducts.findIndex(p => p.id === dp.productId);
                            if (productIndex !== -1 && dp.discountPercentage > 0) {
                                const product = updatedProducts[productIndex];
                                const discountedPrice = Math.round(product.price * (1 - dp.discountPercentage / 100));
                                product.discountPrice = discountedPrice;
                            }
                        });
                    }

                    // --- Logic to end an 'Ongoing' promotion ---
                    if (promo.status === 'Ongoing' && now > endDate) {
                        promo.status = 'Finished';
                        hasChanges = true;

                        // Revert discounts from the associated products.
                        promo.discountedProducts.forEach(dp => {
                            const productIndex = updatedProducts.findIndex(p => p.id === dp.productId);
                            if (productIndex !== -1) {
                                // This simply removes the discount. A more complex app might
                                // need to check if the product is part of another ongoing promo.
                                updatedProducts[productIndex].discountPrice = null;
                            }
                        });
                    }
                });

                // Only update state if a change actually occurred to prevent unnecessary re-renders.
                if (hasChanges) {
                    return { ...currentData, promotions: updatedPromotions, allProducts: updatedProducts };
                }

                return currentData; // If no changes, return the original state.
            });
        }, 1000); // Check the promotion status every second.

        // Cleanup function to clear the interval when the component unmounts.
        return () => clearInterval(promotionTimer);
    }, [setData]); // Dependency array ensures this effect runs only once on mount.

    const handleSaveProduct = (productToSave) => {
        setData(prevData => {
            const products = [...prevData.allProducts];
            const index = products.findIndex(p => p.id === productToSave.id);
            if (index > -1) {
                products[index] = productToSave; // Update
            } else {
                products.unshift(productToSave); // Add new
            }
            return { ...prevData, allProducts: products };
        });
        setView('dashboard');
    };

    const handleSavePromotion = (promoToSave) => {
        setData(prevData => {
            const promotions = [...prevData.promotions];
            const index = promotions.findIndex(p => p.id === promoToSave.id);
            if (index > -1) {
                promotions[index] = promoToSave; // Update
            } else {
                promotions.unshift(promoToSave); // Add new
            }
            // The main useEffect will handle applying the discount automatically on its next check.
            return { ...prevData, promotions: promotions };
        });
        setView('dashboard');
    };

    const renderCurrentView = () => {
        switch (view) {
            case 'login': return <LoginPage setView={setView} />;
            case 'register': return <RegisterPage setView={setView} />;
            case 'dashboard': return <DashboardLayout data={data} setData={setData} setView={setView} setEditingProduct={setEditingProduct} setEditingPromotion={setEditingPromotion} />;
            case 'addProduct': return <AddEditProductPage product={null} onSave={handleSaveProduct} onCancel={() => setView('dashboard')} />;
            case 'editProduct': return <AddEditProductPage product={editingProduct} onSave={handleSaveProduct} onCancel={() => setView('dashboard')} />;
            case 'addPromotion': return <AddEditPromotionPage promo={null} allProducts={data.allProducts} onSave={handleSavePromotion} onCancel={() => setView('dashboard')} />;
            case 'editPromotion': return <AddEditPromotionPage promo={editingPromotion} allProducts={data.allProducts} onSave={handleSavePromotion} onCancel={() => setView('dashboard')} />;
            default: return <LoginPage setView={setView} />;
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); body { font-family: 'Inter', sans-serif; background-color: #f7f7f7; }`}</style>
            <script src="https://cdn.tailwindcss.com"></script>
            {renderCurrentView()}
        </div>
    );
}
